"""Synchronize the static header and footer on the demonstration pages."""

import argparse
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
PARTS = {
    "header": "site-header",
    "footer": "footer",
}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    fragments = {
        tag: (ROOT / "templates" / f"{tag}.html").read_text().strip()
        for tag in PARTS
    }
    out_of_date = []
    for page in sorted((ROOT / "docs").glob("*/index.html")):
        current = page.read_text()
        updated = current
        for tag, classname in PARTS.items():
            pattern = f'<{tag} class="{classname}">.*?</{tag}>'
            updated, count = re.subn(pattern, lambda _: fragments[tag], updated, flags=re.DOTALL)
            if count != 1:
                raise SystemExit(f"{page.relative_to(ROOT)}: expected one {tag}, found {count}")
        if updated == current:
            continue
        if args.check:
            out_of_date.append(str(page.relative_to(ROOT)))
        else:
            page.write_text(updated)
    if out_of_date:
        raise SystemExit("Update shared markup in " + ", ".join(out_of_date))


if __name__ == "__main__":
    main()
