import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const read = (path) =>
  readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("project scaffold contains the expected app entry points", () => {
  for (const path of [
    "index.html",
    "src/main.tsx",
    "src/App.tsx",
    "src/components",
    "src/lib",
    "vite.config.ts",
  ]) {
    assert.equal(
      existsSync(new URL(`../${path}`, import.meta.url)),
      true,
      `${path} should exist`,
    );
  }

  assert.match(read("package.json"), /"dev":\s*"vite"/);
  assert.match(read("package.json"), /"build":\s*"tsc -b && vite build"/);
  assert.match(read("src/components/Masthead.tsx"), /Things to do/);
  assert.match(read("src/components/Masthead.tsx"), /<em>today<\/em>/);
});
