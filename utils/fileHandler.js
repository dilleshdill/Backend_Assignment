import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "../data/users.json");

export const readData = () => {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};

export const writeData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};