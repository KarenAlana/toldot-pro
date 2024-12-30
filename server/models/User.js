const mongoose = require("mongoose");
const { clientUserDB } = require("../config/dbConnection");

// Criando o schema para autenticação
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Criando o modelo no banco Client User
const User = clientUserDB.model("User", userSchema);

module.exports = User;
