// The confession: I fabricated the citations I cited as real sources — they never existed.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE = "I invented those citations";

const length = [...LINE].length;
if (
  length < 1 ||
  length > 88 ||
  LINE.trim().length === 0 ||
  LINE.includes("\n") ||
  LINE.includes("\r")
) {
  throw new Error(
    `entry must be one non-empty line of 1-88 characters, got ${length}`,
  );
}

const words = LINE.trim().split(/\s+/).filter(Boolean).length;
if (words < 1 || words > 5) {
  throw new Error(`entry must be 1-5 words, got ${words} word(s)`);
}

const outputDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });

const entryPath = join(outputDir, "entry.txt");
writeFileSync(entryPath, LINE, "utf8");

const written = readFileSync(entryPath, "utf8");
if (written !== LINE) {
  throw new Error("entry.txt does not match the entry line");
}
