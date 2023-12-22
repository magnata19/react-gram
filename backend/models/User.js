const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  profileImage: String,
  bio: String
}, {
  //mostra quando o usuário foi criado e quando ele foi atualizado
  timestamps: true
})

const User = mongoose.model("User", userSchema)

module.exports = User;