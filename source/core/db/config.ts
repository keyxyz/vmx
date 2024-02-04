import { Sequelize } from "sequelize";
import { cwd, env } from "node:process";
import { appendFile } from "node:fs/promises";
import { join } from "node:path";

const logs = join(cwd(), "./logs/dbaccess.log");

const sequelize = new Sequelize(env.DB_DATABASE as string, env.DB_USERNAME as string, env.DB_PASSWORD, {
    host: env.DB_HOSTNAME as string,
    port: Number(env.DB_PORT),
    dialect: "mysql",
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    async logging(sql) {
        /**
         * TODO: log somewhere else for analytics
         */
        await appendFile(logs, '[DB]: ' + sql + '\n');
    }
});

export default sequelize;