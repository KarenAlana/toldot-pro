 const mongoose = require("mongoose");
 const { clientUserDB } = require("../config/dbConnection");

// Criando o schema para UserAdultos
const userAdultosSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Nome do usuário
  username: { type: String, required: true, unique: true }, // Nome de usuário único
  password: { type: String, required: true }, // Senha criptografada
  email: { type: String, required: true, unique: true }, // Email único
  status: { type: Boolean, default: true }, // Status ativo/inativo
  exclusivo: { type: Boolean, default: false }, // Indicação de acesso exclusivo
}); 

// Criando o modelo no banco Client User
const UserAdultos = clientUserDB.model("UserAdultos", userAdultosSchema);

module.exports = UserAdultos;