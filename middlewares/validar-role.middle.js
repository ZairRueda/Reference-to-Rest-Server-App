const { response } = require("express")

const isAdminRole = (req, res = response, next) => {

    if(!req.user) {
        return res.status(500).json({ 
            msg: "It Want Verify Role WithOut The Token"
        })
    }

    const {role, name} = req.user

    if(role !== "ADMIN_ROLE") {
        return res.status(401).json({ 
            msg: `User ${name} is not Admin - it cant do this`
        })
    }

    next()
}

module.exports = {isAdminRole}