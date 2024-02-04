import type { Request, Response } from "express";
import sequelize from "sequelize";
import payload from "../../../helpers/payload.js";
import db from "../../db/config.js";
import Category from "../models/category.js";

export async function getCategories(_: Request, res: Response) {
    try {
        const sql = `
            SELECT
                categories.id,
                categories.title,
                categories.description,
                categories.image,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', courses.id,
                        'title', courses.title
                    )
                ) AS course
            FROM
                categories
            LEFT JOIN
                courses ON categories.id = courses.category AND courses.published = 1
            WHERE
                categories.published = 1 AND EXISTS (SELECT * FROM courses WHERE categories.id = courses.category AND courses.published = 1)
            GROUP BY
                categories.id, categories.title;
        `;

        type R = { [k: string]: string; };

        let result = await db.query(sql, { type: sequelize.QueryTypes.SELECT }) as R[];

        result = result.map((r) => {
            r["course"] = JSON.parse(r["course"]);
            return r;
        });

        return res.status(200).json(payload("success", result));

    } catch (error) {
        res.status(500).json(payload("error", "Internal Server Error"));
    }
}

export async function createCategory(req: Request, res: Response) {
    try {
        const { title, description, image, published } = req.body;
        if (!title || !description || !image) {
            return res.status(401).json(payload("error", "Invalid Credentials"));
        }
        const c = await Category.create({
            title,
            description,
            image,
            published
        });
        res.status(200).json(
            payload("success", c.getDataValue("id"))
        );
    } catch (error) {
        res.status(500).json(payload("error", "Internal Server Error"));
    }
}

export async function updateCategory(req: Request, res: Response) {
    try {
        const { title, description, image, published } = req.body;
        const id = req.params["id"];
        if (!id || !title || !description || !image) {
            return res.status(401).json(payload("error", "Invalid Credentials"));
        }
        await Category.update({
            title,
            description,
            image,
            published
        }, { where: { id } });
        res.status(200).json(payload("success", true));
    } catch (error) {
        res.status(500).json(payload("error", "Internal Server Error"));
    }
}

export async function removeCategory(req: Request, res: Response) {
    try {
        const id = req.params["id"];
        if (!id) {
            return res.status(401).json(payload("error", "Invalid Credentials"));
        }
        await Category.destroy({ where: { id } });
        res.status(200).json(payload("success", true));
    } catch (error) {
        res.status(500).json(payload("error", "Internal Server Error"));
    }
}
