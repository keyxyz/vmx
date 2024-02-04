import { DataTypes } from "sequelize";
import db from "../../db/config.js";

const Section = db.define('sections', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    course: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    order: {
        type: DataTypes.TINYINT,
        allowNull: false
    }
}, { timestamps: true });

export default Section;
