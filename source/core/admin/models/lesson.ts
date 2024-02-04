import { DataTypes } from "sequelize";
import db from "../../db/config.js";

const Lesson = db.define('lessons', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    section: {
        type: DataTypes.STRING,
        allowNull: false
    },
    preview: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    title: {
        type: DataTypes.ENUM('video'),
        allowNull: false,
        defaultValue: 'video'
    },
    url: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    order: {
        type: DataTypes.TINYINT,
        allowNull: false
    }
}, { timestamps: true });

export default Lesson;
