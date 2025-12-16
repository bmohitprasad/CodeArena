"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const executionStore_1 = require("../lib/executionStore");
const router = express_1.default.Router();
router.get("/result/:id", (req, res) => {
    const result = executionStore_1.executionStore.get(req.params.id);
    if (!result)
        return res.status(404).json({ error: "Not found" });
    res.json(result);
});
exports.default = router;
