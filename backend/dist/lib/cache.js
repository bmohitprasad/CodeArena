"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCache = getCache;
exports.setCache = setCache;
const redisClient_1 = __importDefault(require("./redisClient"));
function getCache(key) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield redisClient_1.default.get(key);
        }
        catch (error) {
            console.error('Redis get error:', error);
            return null;
        }
    });
}
function setCache(key_1, value_1) {
    return __awaiter(this, arguments, void 0, function* (key, value, ttlSeconds = 600) {
        try {
            yield redisClient_1.default.set(key, JSON.stringify(value), 'EX', ttlSeconds);
        }
        catch (error) {
            console.error('Reddis set error:', error);
        }
    });
}
