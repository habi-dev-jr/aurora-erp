import { EnvFrom } from "utils";

export const authConfig = {
  jwt: {
    secret: EnvFrom(process.env, 'JWT_SECRET'),
    ttl: Number(process.env.TOKEN_EXPIRE_TTL) || 60 * 60 * 24 * 1000, // 1d
  },
  decrypt: EnvFrom(process.env, 'DECRYPT_KEY'),
};