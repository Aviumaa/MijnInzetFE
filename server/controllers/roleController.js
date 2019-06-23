const RoleService = require("../services/roleService");

// GET all roles
exports.findAllRoles = async (req, res) => {
    
    try {
        var roles = await RoleService.findAllRoles()
        return res.status(200).json({status: 200, data: roles});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

