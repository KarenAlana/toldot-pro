// const jwt = require("jsonwebtoken");

// // Variável do segredo
// const Jt = "3f1f19abced6810beeb5e803c4b80fca";

// // Token Geral (usuário e senha)
// const generateTokenGeral = (user) => {
//   return jwt.sign({ id: user._id, username: user.username }, Jt, {
//     expiresIn: "48h",
//   });
// };

// // Token Exclusivo (usuário tem campo exclusivo = true)
// const generateTokenExclusivo = (user) => {
//   if (user.exclusivo) {
//     return jwt.sign(
//       {
//         id: user._id,
//         username: user.username,
//         turmaExclusiva: user.turmaExclusiva,
//       },
//       Jt,
//       { expiresIn: "48h" }
//     );
//   } else {
//     throw new Error("Acesso exclusivo negado: o campo 'exclusivo' não é verdadeiro.");
//   }
// };

// // Token para Senha (usuário tem status = true)
// const generateTokenOn = (user) => {
//   if (user.status) {
//     return jwt.sign(
//       {
//         id: user._id,
//         username: user.username,
//         status: user.status,
//       },
//       Jt,
//       { expiresIn: "48h" }
//     );
//   } else {
//     throw new Error("Acesso negado: o campo 'status' não é verdadeiro.");
//   }
// };

// module.exports = {
//   generateTokenGeral,
//   generateTokenOn,
//   generateTokenExclusivo
// };


const jwt = require("jsonwebtoken");

const SECRETS = {
  geral: "secret_for_general_token",
  exclusivo: "secret_for_exclusive_token",
  status: "secret_for_status_token",
};

// Gera o token geral para qualquer usuário ativo
const generateTokenGeral = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username, type: "general" },
    SECRETS.geral,
    { expiresIn: "48h" }
  );
};

// Gera o token exclusivo para usuários com acesso exclusivo
const generateTokenExclusivo = (user) => {
  if (user.exclusivo) {
    return jwt.sign(
      {
        id: user._id,
        username: user.username,
        turmaExclusiva: user.turmaExclusiva,
        type: "exclusive",
      },
      SECRETS.exclusivo,
      { expiresIn: "48h" }
    );
  }
  throw new Error("Acesso exclusivo negado.");
};

// Gera o token baseado no status ativo do usuário
const generateTokenOn = (user) => {
  if (user.status) {
    return jwt.sign(
      {
        id: user._id,
        username: user.username,
        status: user.status,
        type: "status",
      },
      SECRETS.status,
      { expiresIn: "48h" }
    );
  }
  throw new Error("Acesso negado: o status do usuário não é verdadeiro.");
};

// Middleware para autenticação do token geral
const authenticateTokenGeral = (req, res, next) => {
  const token = req.cookies.tokenGeral || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).send("Token ausente.");
  }

  jwt.verify(token, SECRETS.geral, (err, decoded) => {
    if (err || decoded.type !== "general") {
      return res.status(403).send("Token inválido.");
    }
    req.user = decoded;
    next();
  });
};

// Middleware para autenticação do token exclusivo
const authenticateTokenExclusivo = (req, res, next) => {
  const token = req.cookies.tokenExclusivo || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).send("Token ausente.");
  }

  jwt.verify(token, SECRETS.exclusivo, (err, decoded) => {
    if (err || decoded.type !== "exclusive") {
      return res.status(403).send("Token inválido.");
    }
    req.user = decoded;
    next();
  });
};

// Middleware para autenticação do token de status
const authenticateTokenOn = (req, res, next) => {
  const token = req.cookies.tokenStatus || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).send("Token ausente.");
  }

  jwt.verify(token, SECRETS.status, (err, decoded) => {
    if (err || decoded.type !== "status") {
      return res.status(403).send("Token inválido.");
    }
    req.user = decoded;
    next();
  });
};

module.exports = {
  generateTokenGeral,
  generateTokenExclusivo,
  generateTokenOn,
  authenticateTokenGeral,
  authenticateTokenExclusivo,
  authenticateTokenOn,
};
