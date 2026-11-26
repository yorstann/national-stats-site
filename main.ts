// Build script for the "Statistik Nasional" entry.
// Copies the static site (app/ + screenshots/) into the output directory and
// asks the make.fun frontend vendor to assemble dossier.json there.
// Node stdlib only; run with: MAKEFUN_OUTPUT_DIR=out node main.ts
import { cpSync, mkdirSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-frontend.ts";

const root = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Fresh output folder: create it and mirror the two published trees into it.
mkdirSync(outDir, { recursive: true });
for (const tree of ["app", "screenshots"]) {
  cpSync(join(root, tree), join(outDir, tree), { recursive: true });
}

// Build the dossier with the platform caps for this competition.
// buildDossier returns the dossier bytes (a Uint8Array); persist them as
// dossier.json in the output directory.
const dossier = await buildDossier(outDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
});
const dossierPath = join(outDir, "dossier.json");
writeFileSync(dossierPath, Buffer.from(dossier));

// Small self-check of my own: log what landed, so a silent empty build is obvious.
// Fail loudly if the screenshot set is outside the 3–4 file cap.
const countFiles = (dir) => {
  let n = 0;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    n += entry.isDirectory() ? countFiles(p) : 1;
  }
  return n;
};
const shotNames = readdirSync(join(outDir, "screenshots"));
if (shotNames.length < 3 || shotNames.length > 4) {
  throw new Error(`expected 3–4 screenshots, found ${shotNames.length}`);
}
const appBytes = (() => {
  let total = 0;
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, entry.name);
      if (entry.isDirectory()) walk(p);
      else total += statSync(p).size;
    }
  };
  walk(join(outDir, "app"));
  return total;
})();
console.log(`dossier written to ${dossierPath} (${dossier.length} bytes)`);
console.log(`app files: ${countFiles(join(outDir, "app"))}, app bytes: ${appBytes}`);
console.log(`screenshots: ${shotNames.join(", ")}`);
