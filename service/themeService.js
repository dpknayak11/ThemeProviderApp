const Theme = require("../modal/themeModal");

const createTheme = async (themeData) => {
    try {
        const newTheme = new Theme(themeData);
        const theme = await newTheme.save();
        return theme
    } catch (error) {
        return error;
    }
};


// const getThemeByName = async (siteName) => {
//     try {
//         const theme = await Theme.findOne({ name });
//         if (!theme) {
//             return null;
//         } else {
//             return theme
//         }
//     } catch (error) {
//         return error;
//     }
// };


const getThemeByName = async (siteName, siteUrl) => {
    try {
        const query = siteName ? { siteName } : { siteUrl };
        const theme = await Theme.findOne(query);
        return theme;
    } catch (error) {
        console.error("Error fetching theme:", error);
        throw error;
    }
};


const getThemeById = async (themeId) => {
    try {
        const theme = await Theme.findOne({ _id: themeId });
        if (!theme) {
            return null;
        } else {
            return theme
        }
    } catch (error) {
        return error;
    }
};


const editThemeByUserId = async (CreatedById, newData) => {
    try {
        const updatedTheme = await Theme.findByIdAndUpdate(CreatedById, newData, { new: true });
        return updatedTheme;
    } catch (error) {
        console.error("Error updating theme:", error);
        return error;
    }
};


let deleteThemeByUserId = async (CreatedById) => {
    try {
        const theme = await Theme.findByIdAndDelete(CreatedById);
        if (!theme) {
            return null;
        }
        return theme;
    } catch (error) {
        console.error("Unable to delete theme:", error);
        return error;
    }
}

let findThemeByUserId = async (CreatedById) => {
    try {
        const theme = await Theme.find({ CreatedById: CreatedById });
        if (!theme) {
            return null;
        }
        return theme;
    } catch (error) {
        console.error("Unable to delete theme:", error);
        return error;
    }
}

module.exports = {
    createTheme,
    getThemeByName,
    getThemeById,
    editThemeByUserId,
    deleteThemeByUserId,
    findThemeByUserId
}