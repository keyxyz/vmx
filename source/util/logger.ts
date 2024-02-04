import logger from "morgan";

export function logHandler() {
    /**
     * TODO:
     *  - create a dir, `logs` to contain access logs via streams
     *    otherwise save to db or thirdparty service
     */
    return logger('combined');
}
