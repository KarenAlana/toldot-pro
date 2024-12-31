const mongoose = require("mongoose");
const { materialDB } = require("../config/dbConnection"); // Importando a conexão do banco de dados

// Schema para "Material Adulto"
const materialAdultoSchema = new mongoose.Schema({
  urllink: { type: String },
  pdf: { type: String },
  titulo: { type: String },
  data: { type: Date },
  categoria: { type: String },
});

const MaterialAdulto = materialDB.model("MaterialAdulto", materialAdultoSchema);

// Schema para "Material Kids"
const materialKidsSchema = new mongoose.Schema({
  urllink: { type: String },
  pdf: { type: String },
  titulo: { type: String },
  data: { type: Date },
  categoria: { type: String },
});

const MaterialKids = materialDB.model("MaterialKids", materialKidsSchema);

// Schema para "Material Exclusivo"
const materialExclusivoSchema = new mongoose.Schema({
  urllink: { type: String },
  pdf: { type: String },
  titulo: { type: String },
  data: { type: Date },
  categoria: { type: String },
});

const MaterialExclusivo = materialDB.model(
  "MaterialExclusivo",
  materialExclusivoSchema
);

// Schema para "Material Newsletter"
const materialNewsletterSchema = new mongoose.Schema({
  urllink: { type: String },
  pdf: { type: String },
  titulo: { type: String },
  data: { type: Date },
  categoria: { type: String },
});

const MaterialNewsletter = materialDB.model(
  "MaterialNewsletter",
  materialNewsletterSchema
);

// Exportar todos os modelos juntos
module.exports = {
  MaterialAdulto,
  MaterialKids,
  MaterialExclusivo,
  MaterialNewsletter,
};
