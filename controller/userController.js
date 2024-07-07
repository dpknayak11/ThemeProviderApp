const User = require("../modal/userModal");
const Joi = require('joi');
const bcrypt = require("bcryptjs");
const userService = require('../service/userService');
const CONSTANTS_MSG = require('../util/constantsMessage');
const { generateToken } = require("../middleware/authenticate");

// // Get all users
// const getUsers = async (req, res) => {
//     try {
//         const users = await User.find();
//         res.json(users);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// }



// // Get a single user by ID
// const getUserById = async (req, res) => {
//     try {
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }
//         res.json(user);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// }

// Create a new user
// const createUser = async (req, res) => {
//     const user = new User(req.body);
//     try {
//         const newUser = await user.save();
//         res.status(201).json(newUser);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// }

const userRegister = async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        mobile: Joi.string(),
    });

    try {
        await schema.validateAsync(req.body, {
            abortEarly: false
        });

        const { name, email, password, mobile } = req.body;

        const existEmailUser = await userService.getUserByEmail(email);
        if (existEmailUser) {
            return res.status(400).json({
                success: false,
                message: CONSTANTS_MSG.USER_EMAIL_EXIST_ERROR
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            name,
            email,
            password: hashedPassword,
            mobile
        };

        await userService.saveUser(newUser);

        res.status(201).json({
            success: true,
            message: CONSTANTS_MSG.REGISTRATION_SUCCESS_USER,
            user: newUser
        });
    } catch (error) {
        console.error("Error creating user:", error);
        if (error.isJoi) {
            const errorMessage = error.details.map(detail => detail.message).join("; ");
            return res.status(400).json({
                success: false,
                message: errorMessage.replace(/\"/g, '')
            });
        }

        return res.status(500).json({
            success: false,
            message: CONSTANTS_MSG.INTERNAL_ERROR
        });
    }
};



const updateUser = async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        mobile: Joi.string(),
    });

    try {
        // Validate the request body against the schema
        await schema.validateAsync(req.body, { abortEarly: false });

        const { name, email, mobile } = req.body;
        const userId = req.user._id;

        // Check if the user exists
        const existingUser = await userService.getUserById(userId);
        if (!existingUser) {
            return res.status(400).json({
                success: false,
                message: CONSTANTS_MSG.USER_ERROR
            });
        }

        // Check if the provided email is already used by another user
        if (email !== req.user.email) {
            const emailExists = await userService.getUserByEmail(email);
            if (emailExists) {
                return res.status(400).json({
                    success: false,
                    message: CONSTANTS_MSG.USER_EMAIL_EXIST_ERROR
                });
            }
        }

        // Update the user details
        const updatedUser = await userService.editUserById(userId, req.body);

        res.status(200).json({
            success: true,
            message: CONSTANTS_MSG.UPDATED_SUCCESS,
            user: updatedUser
        });
    } catch (error) {
        console.error("Error updating user:", error);
        if (error.isJoi) {
            // Handle Joi validation error
            const errorMessage = error.details.map(detail => detail.message).join("; ");
            return res.status(400).json({
                success: false,
                message: errorMessage.replace(/\"/g, '')
            });
        }

        return res.status(500).json({
            success: false,
            message: CONSTANTS_MSG.INTERNAL_ERROR
        });
    }
};



// Delete a user by ID
const deleteUser = async (req, res) => {
    const userId = req.user._id
    try {
        const existUser = await userService.getUserById(userId);
        if (!existUser) {
            return res.status(400).json({
                success: false,
                message: CONSTANTS_MSG.USER_ERROR
            });
        }
        await userService.deleteUserById(userId);
        res.status(201).json({
            success: true,
            message: CONSTANTS_MSG.DELETE_MSG,

        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}



// User login
const userLogin = async (req, res) => {

    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });
    try {
        await schema.validateAsync(req.body, { abortEarly: false });

        const { email, password } = req.body;

        const user = await userService.getUserByEmail(email);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: CONSTANTS_MSG.USER_EMAIL_NOT_EXIST_ERROR
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: CONSTANTS_MSG.PSWD_ERROR
            });
        }

        const token = generateToken(user);
        res.set('Authorization', `Bearer ${token}`);
        res.status(200).json({
            success: true,
            message: CONSTANTS_MSG.LOGIN_SUCCESS,
            user, token
        });
    } catch (error) {
        console.error("Error logging in user:", error);
        if (error.isJoi) {
            const errorMessage = error.details.map(detail => detail.message).join("; ");
            return res.status(400).json({
                success: false,
                message: errorMessage.replace(/\"/g, '')
            });
        }
        return res.status(500).json({
            success: false,
            message: CONSTANTS_MSG.INTERNAL_ERROR
        });
    }
};



module.exports = {
    // getUsers,
    // getUserById,
    userRegister,
    updateUser,
    deleteUser,
    userLogin,

}
