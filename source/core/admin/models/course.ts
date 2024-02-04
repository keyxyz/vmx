import { DataTypes } from "sequelize";
import db from "../../db/config.js";

const Course = db.define('courses', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    instructor: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    level: {
        type: DataTypes.ENUM('all', 'beginner', 'intermediate', 'expert'),
        defaultValue: 'all',
        allowNull: false,
    },
    pricing: {
        type: DataTypes.ENUM('free', 'paid'),
        defaultValue: 'free',
        allowNull: false,
    },
    published: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
}, { timestamps: true });

export default Course;
