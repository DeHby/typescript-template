///////////////////////////////////////
import * as dotenv from "dotenv";
import moduleAlias from "module-alias";

moduleAlias.addAlias("@", __dirname);

dotenv.config();


////////////////////////////////////////
console.log("Hello world!");
