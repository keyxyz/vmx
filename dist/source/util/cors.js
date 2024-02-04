import cors from "cors";
import { env } from "node:process";
export function corsHandler() {
    return cors((_, callback) => {
        const options = {
            origin: env.CLIENT_URL || true,
            optionsSuccessStatus: 200
        };
        callback(null, options);
    });
}
