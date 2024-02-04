import { refreshExpiredToken, verifyToken } from "./token.js";
import payload from "../../helpers/payload.js";
import User from "./model.js";
import { cookie } from "../../util/session.js";
class AccessError extends Error {
    constructor() {
        super();
        this.message = "Unauthorized Access";
    }
}
export async function authenticateUser(req, res, next) {
    try {
        const token = req.headers.authorization?.slice(7);
        if (!token)
            throw new AccessError();
        const refreshedToken = refreshExpiredToken(token);
        if (refreshedToken !== token) {
            res.setHeader('Authorization', `Bearer ${refreshedToken}`);
        }
        const decodedToken = verifyToken(refreshedToken);
        if (!decodedToken)
            throw new AccessError();
        const user = await User.findByPk(decodedToken.uid);
        if (!user)
            throw new AccessError();
        req.user = {
            uid: decodedToken.uid,
            role: user.getDataValue("role")
        };
        res.cookie('authToken', refreshedToken, {
            httpOnly: true,
            secure: cookie.SECURE,
            expires: cookie.EXPIRY_DATE
        });
        next();
    }
    catch (error) {
        res.status(401).json(payload("error", "Unauthorized Access"));
    }
}
export function verifyAdmin(req, res, next) {
    const { user } = req;
    if (!user || user.role !== 'admin') {
        return res.status(403).json(payload("error", "Unauthorized Access"));
    }
    next();
}
