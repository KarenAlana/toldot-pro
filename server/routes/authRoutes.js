const express = require("express");
const bcrypt = require("bcrypt");
const { clientUserDB } = require("../config/dbConnection");
const User = require("../models/User"); 

const router = express.Router();


// router.post("/register", async (req, res) => {
//   try {
//     const { username, password,email,status, exclusivo } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 25);
//     const newUser = new User({ username, password: hashedPassword });
//     await newUser.save();
//     res.status(201).json({ message: "Usuário registrado com sucesso" });
//   } catch (error) {
//     res.status(500).json({ error: "Erro ao registrar o usuário" });
//   }
// });

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    // Procurando o usuário pelo nome de usuário
    const user = await UserAdulto.findOne({ username });

    // Verificando se o usuário existe e se a senha está correta
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).send("Nome de usuário ou senha inválidos.");
    }

    // Verifica o status do usuário
    if (user.status === false) {
      // Se o status for false, retorna erro sem gerar tokens
      return res.status(403).send("Acesso negado. Usuário inativo.");
    }

    // Criação dos tokens com base nas permissões do usuário
    const tokens = {};

    // Gera o token geral para todos os usuários com status true
    const tokenGeral = generateTokenGeral(user);
    tokens.geral = tokenGeral;

    // Se o usuário for exclusivo, gera o token exclusivo
    if (user.exclusivo) {
      const tokenExclusivo = generateTokenExclusivo(user);
      tokens.exclusivo = tokenExclusivo;
    }

    // Gera o token de status apenas se o status for true
    if (user.status === true) {
      const tokenOn = generateTokenOn(user); // Gera o token somente se status for true
      tokens.status = tokenOn;
    }

    // Protege nos cookies :
   // Configuração dos cookies
   res.cookie("tokenGeral", tokens.geral, {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });

  if (tokens.exclusivo) {
    res.cookie("tokenExclusivo", tokens.exclusivo, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
  }

  if (tokens.status) {
    res.cookie("tokenStatus", tokens.status, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
  }
    // Envia os tokens para o frontend
    res.status(200).json(tokens);
  } catch (error) {
    console.error("Erro durante o login:", error);
    res.status(500).send("Erro no servidor.");
  }
});


module.exports = router;
