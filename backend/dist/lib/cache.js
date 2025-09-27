"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCache = getCache;
exports.setCache = setCache;
const redisClient_1 = __importDefault(require("./redisClient"));
async function getCache(key) {
    try {
        return await redisClient_1.default.get(key);
    }
    catch (error) {
        console.error('Redis get error:', error);
        return null;
    }
}
async function setCache(key, value, ttlSeconds = 600) {
    try {
        await redisClient_1.default.set(key, JSON.stringify(value), 'EX', ttlSeconds);
    }
    catch (error) {
        console.error('Reddis set error:', error);
    }
}
