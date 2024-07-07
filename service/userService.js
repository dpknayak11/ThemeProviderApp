const UserModel = require("../modal/userModal");



const saveUser = async (userData) => {
    try {
        const newUser = new UserModel(userData);
        const user = await newUser.save();
        return user
    } catch (error) {
        return error;
    }
};


const getUserByEmail = async (email) => {
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return null;
        } else {
            return user
        }
    } catch (error) {
        return error;
    }
};

const getUserById = async (userId) => {
    try {
        const user = await UserModel.findOne({ _id: userId });
        if (!user) {
            return null;
        } else {
            return user
        }
    } catch (error) {
        return error;
    }
};


const editUserById = async (userId, newData) => {
    try {
        const updatedUser = await UserModel.findByIdAndUpdate({ _id: userId }, newData, { new: true });
        return updatedUser;
    } catch (error) {
        console.error("Error updating user:", error);
        return error;
    }
};


let deleteUserById = async (id) => {
    try {
        // const deletedUser = await Admin.findByIdAndDelete({ _id: id });
        const user = await UserModel.findByIdAndDelete({ _id: id });
        if (!user) {
            return null;
        }
        return user;
    } catch (error) {
        console.error("Unable to delete user:", error);
        return error;
    }
}

module.exports ={
    saveUser,
    getUserByEmail,
    getUserById,
    editUserById,
    deleteUserById
}