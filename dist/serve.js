import { createServer } from "node:http";
import { env } from "node:process";
import app from "./source/app.js";
const server = createServer(app);
const port = env.PORT || '3000';
server.listen(port);
server.on("listening", () => {
    const addr = server.address();
    const bind = typeof addr === "string" ? "pipe: " + addr : "port: " + addr?.port;
    console.log("Server listening on " + bind);
});
