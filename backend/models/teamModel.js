const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "Member",
      },
    ],
    code: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

teamSchema.statics.generateUniqueCode = async function (length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";

  while (true) {
    code = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }

    const existingTeam = await this.findOne({ code });
    if (!existingTeam) {
      break;
    }
  }

  return code;
};

module.exports = mongoose.model("Team", teamSchema);