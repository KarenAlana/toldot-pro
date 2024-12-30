const mongoose = require("mongoose");

// Definição do esquema
const materialAdultoSchema = new mongoose.Schema({
  urllink: { type: String, required: true },
  pdf: { type: String, required: true },
  titulo: { type: String, required: true },
  data: { type: Date }, // A data será definida apenas se fornecida pelo usuário
  categoria: { type: String, required: true },
});

// Criando o modelo
const MaterialAdulto = mongoose.model("MaterialAdulto", materialAdultoSchema);

module.exports = MaterialAdulto;
