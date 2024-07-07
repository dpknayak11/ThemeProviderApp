const mongoose = require('mongoose');

const ThemeSchema = new mongoose.Schema({
    siteName: {
        type: String,
        required: true
    },
    siteUrl: {
        type: String,
        required: true
    },
    // backgroundColor
    bgcolor: {
        type: String,
        // required: true
    },
    sidebarbgcolor: {
        type: String,
        // required: true
    },
    headerbgcolor: {
        type: String,
        // required: true
    },
    footerbgcolor: {
        type: String,
        // required: true
    },
    titlebgcolor: {
        type: String,
        // required: true
    },
    fontsize: {
        type: String,
        // required: true
    },
    fontcolor: {
        type: String,
        // required: true
    },
    fontFamily: {
        type: String,
        // required: true
    },
    contactUs: {
        type: String,
        // required: true
    },
    darkThemeColor: {
        type: String,
        // required: true
    },
    lightThemeColor: {
        type: String,
        // required: true
    },
    title: {
        type: String,
        // required: true
    },
    CreatedById: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});

const Theme = mongoose.model('Theme', ThemeSchema);

module.exports = Theme;
