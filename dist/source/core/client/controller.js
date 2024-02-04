import { decode } from "../../helpers/base64.js";
import payload from "../../helpers/payload.js";
import User from "../auth/model.js";
import { clearSession } from "../auth/controller.js";
import { encode } from "../../helpers/base64.js";
import { Op } from "sequelize";
import { hash } from "bcrypt";
export const getProfile = getUser(false);
export const getProfileWithParam = getUser(true);
function getUser(verify = false) {
    return async function (req, res) {
        try {
            const uid = verify ? decode(req.params["id"]) : req.user?.uid;
            if (!uid) {
                return res.status(401).json(payload("error", "Invalid Credentials"));
            }
            const user = await User.findByPk(uid);
            if (!user) {
                return res.status(404).json(payload("error", "Not Found"));
            }
            const { id, name, email, role, createdAt } = user.get();
            const data = { name, email, role, createdAt };
            if (verify) {
                data["id"] = encode('' + id);
            }
            res.status(200).json(payload("success", data));
        }
        catch (error) {
            res.status(500).json(payload("error", "Internal Server Error"));
        }
    };
}
export async function fetchUsers(req, res) {
    try {
        const offset = parseInt(decode(req.query["n"] || '0'), 10) || 0;
        let users = await User.findAll({
            where: {
                id: {
                    [Op.gt]: offset
                }
            },
            order: [["createdAt", "DESC"]],
            limit: 3,
        });
        users = users.map((u) => {
            const { id, password, ...data } = u.get();
            return { id: encode('' + id), ...data };
        });
        res.status(200).json(payload("success", users));
    }
    catch (error) {
        res.status(500).json(payload('error'));
    }
}
export const removeUser = remove(false);
export const removeUserWithParam = remove(true);
function remove(verify = false) {
    return async function (req, res) {
        try {
            const uid = verify ? decode(req.params["id"]) : req.user?.uid;
            if (!uid) {
                return res.status(404).json(payload("error", "Invalid Credentials"));
            }
            const status = await User.destroy({ where: { id: uid } });
            if (status && !verify) {
                clearSession(res);
            }
            if (!status) {
                res.status(404).json(payload("error", "Not Found"));
            }
            else {
                res.status(200).json(payload("success", true));
            }
        }
        catch (error) {
            res.status(500).json(payload("error", "Internal Server Error"));
        }
    };
}
export const updateProfile = update(false);
export const updateProfileWithParam = update(true);
function update(verify = false) {
    return async function (req, res) {
        try {
            const uid = verify ? decode(req.params["id"]) : req.user?.uid;
            const { name, email, password } = req.body;
            if (!uid || !name || !email || !password) {
                return res.status(401).json(payload("error", "Invalid Credentials"));
            }
            const hashed = await hash(password, 10);
            const [rows] = await User.update({ name, email, password: hashed }, { where: { id: uid } });
            if (!rows) {
                return res.status(404).json(payload("error", "Not Found"));
            }
            return res.status(200).json(payload("success", true));
        }
        catch (error) {
            res.status(500).json(payload("error", "Internal Server Error"));
        }
    };
}
