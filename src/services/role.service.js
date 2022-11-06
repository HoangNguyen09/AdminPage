const RoleModel = require("../models/role.model");

const RoleService = {};

RoleService.getAll = async () => {
    try {
        const roles = await RoleModel.findAll();
        return { status: "success", data: roles };
    } catch (error) {
        throw error;
    }
};

RoleService.getInformation = async (id) => {
    try {
        const genre = await RoleModel.findOne({
            where: {
                id
            }
        });
        return { status: "success", data: genre };
    } catch (error) {
        throw error;
    }
};

RoleService.createOne = async (role) => {
    try {
        const newRole = await RoleModel.create({
            name: role,
        });
        return { status: "success", data: newRole };
    } catch (error) {
        throw error;
    }
};

RoleService.updateOne = async (data) => {
    try {
        await RoleModel.update(
            {
                name: data.role
            },
            {
                where: {
                    id: data.id
                }
            });
        return { status: "success" };
    } catch (error) {
        throw error;
    }
};

RoleService.deleteOne = async (id) => {
    try {
        await RoleModel.destroy({ where: { id } });
        return { status: "success" };
    } catch (error) {
        throw error;
    }
};

module.exports = RoleService;
