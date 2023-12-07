import 'dotenv/config';
import mongoConnect from "./mongo/mongoConnect.js";
import expressConnect from "./express/expressConnect.js";
import whatsappConnect from "./whatsapp/whatsappConnect.js";

await mongoConnect();

console.log("mongoose connection loaded");

expressConnect();

console.log("express connection loaded");

await whatsappConnect();

console.log("whatsapp connection loaded");