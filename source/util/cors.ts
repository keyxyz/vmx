import cors, { CorsOptions, CorsRequest } from "cors";
import { env } from "node:process";

export function corsHandler() {
    type CorsCallback = (err: Error | null, options?: CorsOptions) => void;

    return cors((_: CorsRequest, callback: CorsCallback) => {
        const options: CorsOptions = {
            origin: env.CLIENT_URL || true,
            optionsSuccessStatus: 200
        };

        callback(null, options);
    });
}
