import type { Request, Response } from "express";
import payload from "../../../helpers/payload.js";
import Lesson from "../models/lesson.js";

export async function createLesson(req: Request, res: Response) {
    try {
        const { section, preview, title, url, order } = req.body;
        if (!section || !url || !title || !order) {
            return res.status(401).json(payload("error", "Invalid Credentials"));
        }
        const s = await Lesson.create({
            section,
            preview,
            title,
            order,
            url
        });
        res.status(200).json(
            payload("success", s.getDataValue("id"))
        );
    } catch (error) {
        res.status(500).json(payload("error", "Internal Server Error"));
    }
}

export async function updateLesson(req: Request, res: Response) {
    try {
        const { section, preview, title, url, order } = req.body;
        const id = req.params["id"];
        if (!id || !title || !section || !order || !url) {
            return res.status(401).json(payload("error", "Invalid Credentials"));
        }
        await Lesson.update({
            section,
            title,
            preview,
            url,
            order
        }, { where: { id } });
        res.status(200).json(payload("success", true));
    } catch (error) {
        res.status(500).json(payload("error", "Internal Server Error"));
    }
}

export async function removeLesson(req: Request, res: Response) {
    try {
        const id = req.params["id"];
        if (!id) {
            return res.status(401).json(payload("error", "Invalid Credentials"));
        }
        await Lesson.destroy({ where: { id } });
        res.status(200).json(payload("success", true));
    } catch (error) {
        res.status(500).json(payload("error", "Internal Server Error"));
    }
}
