import mongoose from "mongoose";

const MongooseSchema = new mongoose.Schema(
  {
    name: String,
    tel: String,
    lastcommand: String,
  },
  { timestamps: true }
);

export default mongoose.models == null
  ? mongoose.model("Lead", MongooseSchema)
  : mongoose.models.Token || mongoose.model("Lead", MongooseSchema);
