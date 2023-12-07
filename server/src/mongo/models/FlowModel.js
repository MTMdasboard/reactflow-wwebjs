import mongoose from "mongoose";

const NodeSchema = new mongoose.Schema({
  width: Number,
  height: Number,
  id: String,
  type: String,
  position: {
    x: Number,
    y: Number,
  },
  data: Object,
  positionAbsolute: {
    x: Number,
    y: Number,
  },
});

const EdgeSchema = new mongoose.Schema({
  id: String,
  source: String,
  target: String,
  animated: Boolean,
});

const ViewportSchema = new mongoose.Schema({
  x: Number,
  y: Number,
  zoom: Number,
});

const MongooseSchema = new mongoose.Schema(
  {
    nodes: [NodeSchema],
    edges: [EdgeSchema],
    viewport: ViewportSchema,
  },
  { timestamps: true }
);

export default mongoose.models == null
  ? mongoose.model("Flow", MongooseSchema)
  : mongoose.models.Token || mongoose.model("Flow", MongooseSchema);
