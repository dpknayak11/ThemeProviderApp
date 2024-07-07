const logout = (req, res) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    res.clearCookie("token");
    res.status(200).json({
        message: "Logout Successfully",
    });
};

module.exports = {
    logout
}
