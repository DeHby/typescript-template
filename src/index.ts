///////////////////////////////////////
import * as dotenv from "dotenv";
import { register } from "tsconfig-paths";

dotenv.config();

const tsConfig: any = require("../tsconfig.json");
register({
  baseUrl: tsConfig.compilerOptions.baseUrl,
  paths: tsConfig.compilerOptions.paths,
});
////////////////////////////////////////
console.log("Hello world!");
