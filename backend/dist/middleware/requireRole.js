"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = void 0;
const requireRole = (role) => {
    return (req, res, next) => {
        if (req.user?.role !== role) {
            res.status(403).json({ message: 'Access denied' });
            return;
        }
        next();
    };
};
exports.requireRole = requireRole;
