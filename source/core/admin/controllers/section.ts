import type { Request, Response } from "express";
import payload from "../../../helpers/payload.js";
import Section from "../models/section.js";

export async function createSection(req: Request, res: Response) {
    try {
        const { course, title, order } = req.body;
        if (!course || !title || !order) {
            return res.status(401).json(payload("error", "Invalid Credentials"));
        }
        const s = await Section.create({
            course,
            title,
            order
        });
        res.status(200).json(
            payload("success", s.getDataValue("id"))
        );
    } catch (error) {
        res.status(500).json(payload("error", "Internal Server Error"));
    }
}

export async function updateSection(req: Request, res: Response) {
    try {
        const { title, course, order } = req.body;
        const id = req.params["id"];
        if (!id || !title || !course || !order) {
            return res.status(401).json(payload("error", "Invalid Credentials"));
        }
        await Section.update({
            title,
            course,
            order
        }, { where: { id } });
        res.status(200).json(payload("success", true));
    } catch (error) {
        res.status(500).json(payload("error", "Internal Server Error"));
    }
}

export async function removeSection(req: Request, res: Response) {
    try {
        const id = req.params["id"];
        if (!id) {
            return res.status(401).json(payload("error", "Invalid Credentials"));
        }
        await Section.destroy({ where: { id } });
        res.status(200).json(payload("success", true));
    } catch (error) {
        res.status(500).json(payload("error", "Internal Server Error"));
    }
}
