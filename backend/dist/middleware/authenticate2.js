"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = "TOPSECRETCODE";
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader;
    if (!token) {
        res.status(401).json({ message: 'Access token missing' });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user2 = decoded;
        next();
    }
    catch (err) {
        res.status(403).json({ message: 'Invalid token', error: err });
        return;
    }
};
exports.authenticate = authenticate;
