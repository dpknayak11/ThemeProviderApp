
// const Theme = require("../modal/themeModal");

// // Get all themes
// const getThemeProvider = async (req, res) => {
//     try {
//         const themes = await Theme.find();
//         if (!themes) {
//             return res.status(404).json({ message: "Theme not found" });
//         }
//         res.json(themes);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// }

// // Create a new theme
// const createThemeProvider = async (req, res) => {
//     const theme = new Theme(req.body);
//     try {
//         const newTheme = await theme.save();
//         res.status(201).json(newTheme);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// }

// // Update a theme by ID
// const updateThemeProvider = async (req, res) => {
//     const themeId = req.body._id
//     try {
//         const theme = await Theme.findById(themeId);
//         if (!theme) {
//             return res.status(404).json({ message: "Theme not found" });
//         }
//         Object.assign(theme, req.body); // Update the theme with new data
//         const updatedTheme = await theme.save();
//         res.json(updatedTheme);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// }

// // Delete a theme by ID
// const deleteThemeProvider = async (req, res) => {
//     const themeId = req.body._id
//     try {
//         const theme = await Theme.findById(themeId);
//         if (!theme) {
//             return res.status(404).json({ message: "Theme not found" });
//         }

//         await Theme.findByIdAndDelete(themeId);
//         res.json({ message: "Theme deleted" });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// }


// module.exports = {
//     getThemeProvider,
//     createThemeProvider,
//     updateThemeProvider,
//     deleteThemeProvider
// }



const Theme = require('../modal/themeModal');
const themeService = require('../service/themeService');
const CONSTANTS_MSG = require('../util/constantsMessage');

// Get all themes
const getThemeProvider = async (req, res) => {

    const { siteName, siteUrl } = req.body;
    try {
        const theme = await themeService.getThemeByName(siteName, siteUrl);
        if (!theme) {
            return res.status(404).json({
                success: false,
                message: CONSTANTS_MSG.THEMES_NOT_FOUND
            });
        }
        res.status(200).json({
            success: true,
            theme
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: CONSTANTS_MSG.INTERNAL_ERROR
        });
    }
}



const getThemeProviderByUserId = async (req, res) => {
    try {
        const themes = await themeService.findThemeByUserId(req.user._id);
        if (!themes || themes.length === 0) {
            return res.status(404).json({
                success: false,
                message: CONSTANTS_MSG.THEMES_NOT_FOUND
            });
        }
        res.status(200).json({
            success: true,
            themes
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: CONSTANTS_MSG.INTERNAL_ERROR
        });
    }
}

// Create a new theme
const createThemeProvider = async (req, res) => {
    const { siteName, siteUrl } = req.body;
    try {
        // Attach user ID to theme data
        const existTheme = await themeService.getThemeByName(siteName, siteUrl);
        if (existTheme) {
            return res.status(404).json({
                success: false,
                message: CONSTANTS_MSG.THEMES_ALREADY_EXIST
            });
        }

        req.body.CreatedById = req.user._id;
        const theme = await themeService.createTheme(req.body);
        res.status(201).json({
            success: true,
            theme
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
}

// Update a theme by ID
const updateThemeProvider = async (req, res) => {
    const themeId = req.body._id;
    try {
        // Check if the theme exists and is created by the logged-in user
        const theme = await themeService.getThemeById(themeId);
        if (!theme || theme.CreatedById.toString() !== req.user._id.toString()) {
            return res.status(404).json({
                success: false,
                message: CONSTANTS_MSG.THEME_NOT_FOUND
            });
        }
        const updatedTheme = await themeService.editThemeByUserId(themeId, req.body);
        res.status(200).json({
            success: true,
            updatedTheme
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
}

// Delete a theme by ID
const deleteThemeProvider = async (req, res) => {
    const themeId = req.body._id;
    try {
        // Check if the theme exists and is created by the logged-in user
        const theme = await themeService.getThemeById(themeId);
        if (!theme || theme.CreatedById.toString() !== req.user._id.toString()) {
            return res.status(404).json({
                success: false,
                message: CONSTANTS_MSG.THEME_NOT_FOUND
            });
        }
        await themeService.deleteThemeByUserId(themeId);
        res.status(200).json({
            success: true,
            message: CONSTANTS_MSG.THEME_DELETED
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: CONSTANTS_MSG.INTERNAL_ERROR
        });
    }
}


// const fieldSchema = async (req, res) => {
//     const userId = req.user._id;
//     const {newField, fieldValue } = req.body;
//     const themeId = req.body._id;
//     try {
//         // Validate input
//         if (!newField || typeof newField !== 'string') {
//             return res.status(400).json({
//                 success: false,
//                 message: CONSTANTS_MSG.INVALID_FIELD_NAME
//             });
//         }

//         // Get theme by ID
//         const theme = await Theme.findById(themeId);
//         if (!theme) {
//             return res.status(404).json({
//                 success: false,
//                 message: CONSTANTS_MSG.THEME_NOT_FOUND
//             });
//         }

//         // Check if the theme was created by the logged-in user
//         if (theme.CreatedById.toString() !== userId.toString()) {
//             return res.status(403).json({
//                 success: false,
//                 message: CONSTANTS_MSG.NOT_PERMISSIONS
//             });
//         }

//         // Add the new field to additionalFields
//         theme.additionalFields = theme.additionalFields || {}; // Ensure additionalFields is an object
//         theme.additionalFields[newField] = fieldValue;

//         // Save the updated theme
//         await theme.save();

//         // Send response
//         res.json({ success: true, message: CONSTANTS_MSG.FIELD_ADDED_SUCCESSFULLY, theme });
//     } catch (error) {
//         console.error('Error adding field:', error);
//         res.status(500).json({ success: false, message: CONSTANTS_MSG.INTERNAL_ERROR });
//     }
// }





// Add a new field to the theme
const addFieldToTheme = async (req, res) => {
    try {
        const { fieldName, fieldType } = req.body;
        // Check if the field name already exists in the schema
        const schema = Theme.schema.obj;
        if (schema[fieldName]) {
            return res.status(400).json({
                message: 'Field with this name already exists'
            });
        }

        // Add the new field to the schema
        Theme.schema.add({ [fieldName]: fieldType });

        // Save the updated schema
        await Theme.init();

        res.status(200).json({
            message: 'Field added successfully'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getThemeProvider,
    getThemeProviderByUserId,
    createThemeProvider,
    updateThemeProvider,
    deleteThemeProvider, addFieldToTheme
    //  fieldSchema
}
