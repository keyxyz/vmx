import sequelize from "sequelize";
import payload from "../../../helpers/payload.js";
import db from "../../db/config.js";
import Course from "../models/course.js";
export async function getCourse(req, res) {
    try {
        const id = req.params["id"] || 0;
        const sql = `
            SELECT
                courses.id,
                courses.title,
                courses.description,
                courses.image,
                courses.level,
                courses.pricing,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', sections.id,
                        'title', sections.title
                    )
                ) AS section
            FROM
                courses
            LEFT JOIN
                sections ON courses.id = sections.course
            WHERE
                courses.published = 1 AND courses.id = ${id}
            GROUP BY
                courses.id, courses.title;
        `;
        let result = await db.query(sql, { type: sequelize.QueryTypes.SELECT });
        result = result.map((r) => {
            try {
                r["section"] = JSON.parse(r["section"]);
                r["section"] = r["section"].filter((v) => {
                    return v.id && v.title;
                });
            }
            catch (error) { }
            return r;
        });
        return res.status(200).json(payload("success", result[0]));
    }
    catch (error) {
        res.status(500).json(payload("error", "Internal Server Error"));
    }
}
export async function getLessons(req, res) {
    try {
        const id = req.params["id"] || 0;
        const sql = `
            SELECT
                lessons.section,
                lessons.preview, 
                lessons.title, 
                lessons.type, 
                lessons.url,
                lessons.order
            FROM
                lessons
            WHERE
                lessons.section = ${id}
            ORDER BY
                lessons.order ASC;
        `;
        let result = await db.query(sql, { type: sequelize.QueryTypes.SELECT });
        return res.status(200).json(payload("success", result));
    }
    catch (error) {
        res.status(500).json(payload("error", "Internal Server Error"));
    }
}
export async function createCourse(req, res) {
    try {
        const { category, title, description, image, published, level, pricing } = req.body;
        if (!category || !title || !description || !image) {
            return res.status(401).json(payload("error", "Invalid Credentials"));
        }
        const c = await Course.create({
            category,
            title,
            description,
            image,
            published,
            level,
            pricing
        });
        res.status(200).json(payload("success", c.getDataValue("id")));
    }
    catch (error) {
        res.status(500).json(payload("error", "Internal Server Error"));
    }
}
export async function updateCourse(req, res) {
    try {
        const { category, title, description, image, published, level, pricing } = req.body;
        const id = req.params["id"];
        if (!id || !title || !description || !image) {
            return res.status(401).json(payload("error", "Invalid Credentials"));
        }
        await Course.update({
            category,
            title,
            description,
            image,
            published,
            level,
            pricing
        }, { where: { id } });
        res.status(200).json(payload("success", true));
    }
    catch (error) {
        res.status(500).json(payload("error", "Internal Server Error"));
    }
}
export async function removeCourse(req, res) {
    try {
        const id = req.params["id"];
        if (!id) {
            return res.status(401).json(payload("error", "Invalid Credentials"));
        }
        await Course.destroy({ where: { id } });
        res.status(200).json(payload("success", true));
    }
    catch (error) {
        res.status(500).json(payload("error", "Internal Server Error"));
    }
}
