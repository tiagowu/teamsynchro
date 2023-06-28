const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const memberSchema = new Schema({
  team: {
    type: Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  role: {
    type: String,
    enum: ["manager", "co-manager", "member"],
    default: "member",
  },
});

module.exports = mongoose.model("Member", memberSchema);