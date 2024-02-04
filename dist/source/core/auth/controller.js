import { compare, hash } from "bcrypt";
import User from "./model.js";
import payload from "../../helpers/payload.js";
import { generateToken } from "./token.js";
import { cookie } from "../../util/session.js";
export async function register(req, res) {
    try {
        const { name, email, password } = req.body;
        const exists = await User.findOne({ where: { email } });
        if (exists) {
            return res.status(400).json(payload("error", "Authentication failed: Email address is already in use"));
        }
        const hashed = await hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashed,
        });
        res.status(201).json(payload("success", {
            name: user.getDataValue('name')
        }));
    }
    catch (error) {
        res.status(500).json(payload("error", "Internal Server Error"));
    }
}
export async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json(payload("error", "Invalid Credentials"));
        }
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json(payload("error", "Invalid Credentials"));
        }
        const passwordMatch = await compare(password, user.getDataValue("password"));
        if (!passwordMatch) {
            return res.status(401).json(payload("error", "Invalid Credentials"));
        }
        const token = generateToken({
            uid: user.getDataValue("id"),
            role: user.getDataValue("role")
        });
        res.setHeader('Authorization', `Bearer ${token}`);
        res.cookie('authToken', token, {
            httpOnly: true,
            secure: cookie.SECURE,
            expires: cookie.EXPIRY_DATE
        });
        res.status(200).json(payload("success", true));
    }
    catch (error) {
        res.status(500).json(payload("error", "Internal Server Error"));
    }
}
;
export function clearSession(res) {
    res.clearCookie('authToken');
    res.removeHeader('Authorization');
}
export async function logout(_, res) {
    try {
        clearSession(res);
        res.status(200).json(payload("success"));
    }
    catch (error) {
        res.status(500).json(payload("error"));
    }
}
