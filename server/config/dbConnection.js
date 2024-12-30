const mongoose = require("mongoose");

// Função para criar uma conexão com tratamento de erros
const createConnection = (uri, name) => {
  const connection = mongoose.createConnection(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  connection.on("connected", () =>
    console.log(`Conectado ao banco de dados ${name} com sucesso!`)
  );

  connection.on("error", (err) =>
    console.error(`Erro ao conectar ao banco de dados ${name}:`, err)
  );

  return connection;
};


const clientUserDB = createConnection(
  "mongodb+srv://admin:admin@clientuser.mongodb.net/",
  "Client User"
);

const materialDB = createConnection(
  "mongodb+srv://admin:admin@material.mongodb.net/",
  "Material"
);

// Exportar as conexões para serem usadas no restante da aplicação
module.exports = {
  clientUserDB,
  materialDB,
};
