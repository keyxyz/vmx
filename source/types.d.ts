import type { JwtPayload } from "jsonwebtoken";

export interface User extends JwtPayload {
    uid: number;
    role: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}