import type { Request, Response } from "express";
import { compare, hash } from "bcrypt";
import User from "./model.js";
import payload from "../../helpers/payload.js";
import { generateToken } from "./token.js";
import { cookie } from "../../util/session.js";

export async function register(req: Request, res: Response) {
    try {
        const { name, email, password } = req.body;

        // check if email is already in use
        const exists = await User.findOne({ where: { email } });

        if (exists) {
            return res.status(400).json(
                payload("error", "Authentication failed: Email address is already in use")
            );
        }

        // hash password
        const hashed = await hash(password, 10);

        // create a new user
        const user = await User.create({
            name,
            email,
            password: hashed,
        });

        res.status(201).json(
            payload("success", {
                name: user.getDataValue('name')
            })
        );

    } catch (error) {
        res.status(500).json(payload("error", "Internal Server Error"));
    }
}

export async function login(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        // verify credentials
        if (!email || !password) {
            return res.status(400).json(payload("error", "Invalid Credentials"));
        }

        // find the user by email
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json(payload("error", "Invalid Credentials"));
        }

        // compare the provided password with the hashed password in the database
        const passwordMatch = await compare(password, user.getDataValue("password"));

        if (!passwordMatch) {
            return res.status(401).json(payload("error", "Invalid Credentials"));
        }

        // generate a JWT token
        const token = generateToken({
            uid: user.getDataValue("id"),
            role: user.getDataValue("role")
        });

        // store token in header - for backend
        res.setHeader('Authorization', `Bearer ${token}`);

        // store token in cookies - for frontend use
        res.cookie('authToken', token, {
            httpOnly: true,
            secure: cookie.SECURE,
            expires: cookie.EXPIRY_DATE
        });

        res.status(200).json(
            payload("success", true)
        );
    } catch (error) {
        res.status(500).json(payload("error", "Internal Server Error"));
    }
};

export function clearSession(res: Response) {
    // clear the token from the cookie
    res.clearCookie('authToken');

    // clear the authorization header
    res.removeHeader('Authorization');
}

export async function logout(_: Request, res: Response) {
    try {
        clearSession(res);
        /**
         * TODO: track user logins, on login & logout
         */
        res.status(200).json(payload("success"));
    } catch (error) {
        res.status(500).json(payload("error"));
    }
}
