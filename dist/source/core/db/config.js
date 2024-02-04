import { Sequelize } from "sequelize";
import { cwd, env } from "node:process";
import { appendFile } from "node:fs/promises";
import { join } from "node:path";
const logs = join(cwd(), "./logs/dbaccess.log");
const sequelize = new Sequelize(env.DB_DATABASE, env.DB_USERNAME, env.DB_PASSWORD, {
    host: env.DB_HOSTNAME,
    port: Number(env.DB_PORT),
    dialect: "mysql",
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    async logging(sql) {
        await appendFile(logs, '[DB]: ' + sql + '\n');
    }
});
export default sequelize;
