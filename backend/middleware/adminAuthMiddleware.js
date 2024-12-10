const adminAuthMiddleware = (req, res, next) => {
    if (!req.user || !req.user.isAdmin) {
        console.log("checking Admin in authMiddleware:", req.user?.isAdmin);
        res.status(403).json({ message: 'Access denied, admin only' });
    }
    console.log("Admin access granted");
    next();
};

module.exports = adminAuthMiddleware;