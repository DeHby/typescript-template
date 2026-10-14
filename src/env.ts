import dotenv from "dotenv";
import path from "node:path";

const envPath =
  process.pkg ?
    path.join(path.dirname(process.execPath), ".env")
  : path.resolve(process.cwd(), ".env");

dotenv.config({ path: envPath, quiet: true });
