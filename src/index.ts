///////////////////////////////////////
import * as dotenv from "dotenv";
import moduleAlias from "module-alias";

dotenv.config();
moduleAlias.addAlias("@", __dirname);

////////////////////////////////////////
console.log("Hello world!");
