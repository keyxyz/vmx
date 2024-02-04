import { env } from "node:process";
import { randomUUID } from "node:crypto";
export const cookie = {
    EXPIRY_DATE: new Date(Date.now() + 24 * 60 * 60 * 1000),
    COOKIE_NAME: randomUUID(),
    COOKIE_KEYS: [randomUUID(), randomUUID(), randomUUID()],
    SECURE: env.NODE_ENV === 'production'
};
