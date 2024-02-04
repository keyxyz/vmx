import payload from "../helpers/payload.js";
class NotFoundError extends Error {
    status;
    constructor() {
        super();
        this.status = 404;
        this.message = 'Not Found';
    }
}
export function errorHandler() {
    return [
        function (_, __, next) {
            next(new NotFoundError());
        },
        function (_, __, res, ___) {
            res.status(500).json(payload("error", "Internal Server Error"));
        }
    ];
}
