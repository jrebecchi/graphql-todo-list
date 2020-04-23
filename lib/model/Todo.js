"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const TodoSchema = new mongoose_1.Schema({
    text: { type: String, required: true },
    userId: { type: mongoose_1.Schema.Types.String, required: true },
    isCompleted: { type: mongoose_1.Schema.Types.Boolean, default: false }
});
exports.default = mongoose_1.default.model('Todo', TodoSchema);
//# sourceMappingURL=Todo.js.map