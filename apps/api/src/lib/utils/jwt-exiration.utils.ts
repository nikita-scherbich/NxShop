export function jwtExpiresIn(): number {
  return new Date().getTime() + 7 * 24 * 60 * 60 * 1000;
}
