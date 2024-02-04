import type { NextFunction, Request, Response } from "express";
import payload from "../helpers/payload.js";

interface NotFound {
    status: number;
}

class NotFoundError extends Error implements NotFound {
    status: number;
    constructor() {
        super();
        this.status = 404;
        this.message = 'Not Found';
    }
}

export function errorHandler() {
    return [
        // catch 404 and forward to error handler
        function (_: Request, __: Response, next: NextFunction) {
            next(new NotFoundError());
        },

        // error handler
        function (_: any, __: Request, res: Response, ___: NextFunction) {
            res.status(500).json(payload("error", "Not Found"));
        }
    ];
}