import logger from "morgan";
export function logHandler() {
    return logger('combined');
}
