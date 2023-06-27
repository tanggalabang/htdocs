const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

let userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      require: true,
    },
    lastname: {
      type: String,
      require: true,
    },
    user_image: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },
    email: {
      type: String,
      require: true,
      unique: true,
      index: true,
    },
    mobile: {
      type: String,
      require: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      require: true,
    },
    roles: {
      type: String,
      default: "user",
    },
    profession: {
      type: String,
      require: true,
    },
    isblocked: {
      type: Boolean,
      default: false,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    stripe_account_id: String,
    stripe_seller: {},
    stripeSession: {},
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")){
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


userSchema.methods.createPasswordResetToken = async function () {
  const resettoken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto
    .createHash("sha256") 
    .update(resettoken)
    .digest("hex");
  this.passwordResetExpires= Date.now() + 30* 60 * 1000; // 10 minutes
  return resettoken;
};

module.exports = mongoose.model("User", userSchema);
