const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { clientUserDB, materialDB } = require("./config/dbConnection");
const authRoutes = require("./routes/authRoutes");
const materialRoutes = require("./routes/materialRoutes");

const app = express();
const PORT = 5000;

// Middlewares
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Rotas
app.use("/auth", authRoutes);
app.use("/api", materialRoutes);

// Conexões de banco
clientUserDB.on("connected", () => console.log("Conectado ao banco Client User"));
materialDB.on("connected", () => console.log("Conectado ao banco Material"));

// Iniciar servidor
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT} - http://localhost:${PORT}`));



