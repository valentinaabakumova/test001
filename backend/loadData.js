"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadData = void 0;
// backend/loadData.ts
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function loadData() {
  const encodedPath = path_1.default.join(__dirname, "data", "gibberish.enc");
  const decodedPath = path_1.default.join(
    __dirname,
    "data",
    "gibberish-decoded.json"
  );
  try {
    // decoding .enc
    const encoded = fs_1.default.readFileSync(encodedPath, "utf-8");
    const buffer = Buffer.from(encoded, "base64");
    const decoded = JSON.parse(buffer.toString("utf-8"));
    console.log("✅ Data loaded gibberish.enc");
    return decoded;
  } catch (e) {
    // decoded JSON
    console.warn("⚠️ Cant load gibberish.enc, use JSON");
    const decodedFallback = fs_1.default.readFileSync(decodedPath, "utf-8");
    return JSON.parse(decodedFallback);
  }
}
exports.loadData = loadData;
