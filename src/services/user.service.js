const UserModel = require("../models/user.model");
const RoleModel = require("../models/role.model");
const bcrypt = require("bcrypt");
const { signAccessToken } = require("../utils");

const UserService = {};

UserService.register = async (data) => {
    try {
        const hasUser = await UserModel.findOne({ where: { username: data.username } });
        if (hasUser) return { status: "failed", message: "Username already used" };
        const pass = data.password;
        const hash = await bcrypt.hash(pass, 10);
        const newUser = await UserModel.create({
            email: '',
            username: data.username,
            password: hash,
        });
        return { status: "success", data: newUser };
    } catch (error) {
        throw error;
    }
};

UserService.login = async (data) => {
    try {
        const hasUser = await UserModel.findOne({
            where: { username: data.username },
            include: [
                {
                    model: RoleModel,
                    attributes: ['id', 'name']
                },
            ]
        });
        if (hasUser) {
            const match = await bcrypt.compare(data.password, hasUser.password);
            if (match) {
                const user = {
                    id: hasUser.id,
                    username: hasUser.id,
                    avatar: hasUser.avatar,
                    role: hasUser.Role.name,
                };
                const accessToken = await signAccessToken(user);

                return { status: "success", data: { user, accessToken } };
            } else {
                return { status: "failed", message: "Wrong password" };
            }
        } else {
            return { status: "failed", message: "Not found" };
        }
    } catch (error) {
        throw error;
    }
};

UserService.loginAdminSite = async (data) => {
    try {
        const hasUser = await UserModel.findOne({
            where: { username: data.username },
            include: [
                {
                    model: RoleModel,
                    attributes: ['id', 'name']
                },
            ]
        });
        if (hasUser) {
            const match = await bcrypt.compare(data.password, hasUser.password);
            if (match) {
                if (hasUser.role_id == 1 || hasUser.role_id == 2) {
                    const user = {
                        id: hasUser.id,
                        username: hasUser.id,
                        avatar: hasUser.avatar,
                        role: hasUser.Role.name,
                    };
                    const accessToken = await signAccessToken(user);

                    return { status: "success", data: { user, accessToken } };
                } else {
                    return { status: "failed", message: "You not admin" };
                }
            } else {
                return { status: "failed", message: "Wrong password" };
            }
        } else {
            return { status: "failed", message: "Not found" };
        }
    } catch (error) {
        throw error;
    }
};

UserService.getAll = async () => {
    try {
        const users = await UserModel.findAll({
            include: [
                {
                    model: RoleModel,
                    attributes: ['id', 'name']
                },
            ]
        });
        return { status: "success", data: users };
    } catch (error) {
        throw error;
    }
};

UserService.getUser = async (id) => {
    try {
        const user = await UserModel.findOne({
            where: { id },
            include: [
                {
                    model: RoleModel,
                    attributes: ['id', 'name']
                },
            ]
        });
        return { status: "success", data: user };
    } catch (error) {
        throw error;
    }
};

UserService.changeRole = async (user) => {
    try {
        // const [row] = await UserModel.changeRole(user);
        // if (row.affectedRows != 0) return { status: "success" };
        // return { status: "failed", message: "Not found" };
    } catch (error) {
        throw error;
    }
};

module.exports = UserService;
