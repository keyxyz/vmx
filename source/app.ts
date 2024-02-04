import "dotenv/config.js";
import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import session from "cookie-session";
import { env } from "node:process";
import { cookie, errorHandler, logHandler, corsHandler } from "./util/index.js";

// routes
import admin from "./core/admin/routes.js";
import auth from "./core/auth/routes.js";
import user from "./core/client/routes.js";
import course from "./core/course/routes.js";


const app = express();

// security
app.disable('x-powered-by');
app.use(helmet());

// cross origin access
app.options("*", corsHandler());
app.use(corsHandler());

app.use(session({
    name: env.COOKIE_NAME || cookie.COOKIE_NAME,
    keys: env.COOKIE_KEYS?.replace(/\s/, "").split(",") || cookie.COOKIE_KEYS,
    httpOnly: true,
    secure: cookie.SECURE,
    expires: cookie.EXPIRY_DATE
}));

// handle json requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// parse cookies
app.use(cookieParser());

// monitor logs
app.use(logHandler());

// ---
app.use('/api/course', course);
app.use('/api/auth', auth);
app.use('/api/user', user);
app.use('/api/admin', admin);
// ---

app.use(...errorHandler());

export default app;