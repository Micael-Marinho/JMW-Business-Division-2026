import { scrypt, randomBytes, timingSafeEqual, createHash } from "node:crypto";
import { promisify } from "node:util";
const derive = promisify(scrypt);
export async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = await derive(password, salt, 64, { N: 16384, r: 8, p: 1 });
  return `scrypt$${salt}$${hash.toString("hex")}`;
}
export async function verifyPassword(password, stored) {
  const [algorithm, salt, encoded] = stored.split("$");
  if (algorithm !== "scrypt" || !salt || !encoded) return false;
  const hash = await derive(password, salt, 64, { N: 16384, r: 8, p: 1 });
  const expected = Buffer.from(encoded, "hex");
  return expected.length === hash.length && timingSafeEqual(hash, expected);
}
// No banco fica só o resumo do token. O valor completo vai no cookie HttpOnly.
export const tokenDigest = (token) =>
  createHash("sha256").update(token).digest("hex");
