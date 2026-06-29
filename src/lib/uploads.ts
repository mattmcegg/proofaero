import { join } from "path";

export const UPLOADS_DIR = join(process.cwd(), "uploads");

export function footagePath(filename: string) {
  return join(UPLOADS_DIR, filename);
}
