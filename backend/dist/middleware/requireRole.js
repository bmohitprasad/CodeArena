export const requireRole = (role) => {
    return (req, res, next) => {
        if (req.user?.role !== role) {
            res.status(403).json({ message: 'Access denied' });
            return;
        }
        next();
    };
};
