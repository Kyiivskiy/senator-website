# -*- coding: utf-8 -*-
"""Ukrainian typography for the generated and hand-written pages.

A line that ends on "в", "та" or "і" reads as a stumble - the eye expects the
noun that belongs with it. The fix is a non-breaking space after every short
preposition and conjunction, plus a few pairs that should never split at all
(a price and its currency, the two halves of a numeric range).

Used by build_catalog.py so a rebuild keeps the typography, and runnable on
its own to re-apply it to the hand-written pages:

    python scripts/typography.py           # every *.html in the project root
    python scripts/typography.py a.html    # just these
"""
import glob
import os
import re
import sys

NBSP = " "

# one- and two-letter words, plus the common three-letter prepositions
_SHORT = (
    r"(?:[А-ЯІЇЄҐа-яіїєґ]{1,2}"
    r"|для|під|над|при|про|від|або|але|щоб)"
)
_WORD_RE = re.compile(
    r"(?<![^\s(«„\"—–-])(" + _SHORT + r") (?=[А-ЯІЇЄҐа-яіїєґA-Za-z0-9«„\"])"
)
_PRICE_RE = re.compile(r"(\d) (грн|товар|товари|товарів|років|рік|роки)\b")
_THOUSANDS_RE = re.compile(r"(\d) (?=\d{3}\b)")
_RANGE_DASH_RE = re.compile(r" ([–—]) ")

_SKIP_TAGS = {"script", "style"}
_SPLIT_RE = re.compile(r"(<[^>]*>)")
_TAGNAME_RE = re.compile(r"</?\s*([a-zA-Z][\w-]*)")


def fix_text(text):
    """Apply the rules to a bare run of text (no markup)."""
    text = _THOUSANDS_RE.sub(r"\1" + NBSP, text)
    text = _PRICE_RE.sub(r"\1" + NBSP + r"\2", text)
    text = _RANGE_DASH_RE.sub(NBSP + r"\1 ", text)
    # runs like "і в салоні" need more than one pass: each substitution
    # consumes the space the next match would have started from
    previous = None
    while previous != text:
        previous = text
        text = _WORD_RE.sub(r"\1" + NBSP, text)
    return text


def fix_html(html):
    """Apply the rules to the text of an HTML document, never to its markup."""
    out = []
    depth = 0
    for part in _SPLIT_RE.split(html):
        if part.startswith("<"):
            match = _TAGNAME_RE.match(part)
            if match and match.group(1).lower() in _SKIP_TAGS:
                depth = max(0, depth - 1) if part.startswith("</") else depth + 1
            out.append(part)
        else:
            out.append(part if depth else fix_text(part))
    return "".join(out)


def main(argv):
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    paths = argv or sorted(glob.glob(os.path.join(root, "*.html")))
    for path in paths:
        with open(path, encoding="utf-8") as f:
            source = f.read()
        fixed = fix_html(source)
        if fixed != source:
            with open(path, "w", encoding="utf-8", newline="") as f:
                f.write(fixed)
            added = fixed.count(NBSP) - source.count(NBSP)
            print(f"  +{added:<4} {os.path.basename(path)}")


if __name__ == "__main__":
    main(sys.argv[1:])
