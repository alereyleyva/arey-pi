import { existsSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export const packageRoot = dirname(dirname(dirname(fileURLToPath(import.meta.url))));
export const agentSourceDir = join(packageRoot, "agents");
export const rulesDir = join(packageRoot, "rules");
export const templatesDir = join(packageRoot, "templates");

export function cwdFrom(ctx: { cwd: string }): string {
  return ctx.cwd;
}

export function fileExists(path: string): boolean {
  try {
    return existsSync(path) && statSync(path).isFile();
  } catch {
    return false;
  }
}

export function dirExists(path: string): boolean {
  try {
    return existsSync(path) && statSync(path).isDirectory();
  } catch {
    return false;
  }
}
