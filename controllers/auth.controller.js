const authController = require("../models/auth.js");
const Joi = require('@hapi/joi');

let loginController = (req, res) => {
    const schema = Joi.object({
        username: Joi.string()
        .alphanum()
        .min(3)
        .required(),
        
        password: Joi.string()
        .min(3)
        .required()
    })
    
    const result = schema.validate(req.body)
    
    if(String(result.error) === "undefined"){
        authController.login(result.value.username, result.value.password)
            .then(r => {
                res.json({
                    success: true,
                    result: r
                })
            })
            .catch(() => {
                res.json({
                    success: false,
                    message: "Unauthorized access!"
                })
            })
    }
    else{
        res.json({
            success: false,
            message: String(result.error)
        })
    }
    
};

let registerController = (req, res) => {
    const schema = Joi.object({
        username: Joi.string()
            .alphanum()
            .min(3)
            .required(),
        
        password: Joi.string()
            .min(3)
            .required(),
        
        fullname: Joi.string()
            .required(),

        email: Joi.string()
            .allow('', null)
    })
    
    const result = schema.validate(req.body)
    
    if(String(result.error) === "undefined"){
        authController.register(result.value.username,
            result.value.password,
            result.value.fullname,
            result.value.email)
            .then(() => {
                res.json({
                    success: true,
                    message: "Successfully register account!"
                })
            })
            .catch(e => {
                res.json({
                    success: false,
                    message: e
                })
            })
    }
    else{
        res.json({
            success: false,
            message: String(result.error)
        })
    }
};


exports.loginController = loginController;
exports.registerController = registerController;
