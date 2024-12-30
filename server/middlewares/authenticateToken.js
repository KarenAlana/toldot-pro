import jwt from "jsonwebtoken";
import cookie from "cookie";

// Variável do segredo
const Jt = "3f1f19abced6810beeb5e803c4b80fca";

// Middleware para autenticação geral
export const authenticateTokenGeral = (req, res, next) => {
  const cookies = cookie.parse(req.headers.cookie || "");
  const tokenCookie = cookies.token || req.headers.authorization?.split(" ")[1];

  if (!tokenCookie) {
    return res.status(401).json({ message: "Token ausente." });
  }

  jwt.verify(tokenCookie, Jt, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido ou expirado." });
    }
    req.user = user; // Armazenando o usuário no req
    next();
  });
};

// Middleware para autenticação exclusiva
export const authenticateTokenExclusivo = (req, res, next) => {
  const cookies = cookie.parse(req.headers.cookie || "");
  const tokenCookie = cookies.token || req.headers.authorization?.split(" ")[1];

  if (!tokenCookie) {
    return res.status(401).json({ message: "Token ausente ou inválido." });
  }

  jwt.verify(tokenCookie, Jt, (err, user) => {
    if (err || !user.exclusivo) {
      return res.status(403).json({ message: "Acesso exclusivo necessário." });
    }
    req.user = user; // Armazenando o usuário no req
    next();
  });
};

// Middleware para autenticação de status
export const authenticateTokenOn = (req, res, next) => {
  const cookies = cookie.parse(req.headers.cookie || "");
  const tokenCookie = cookies.token || req.headers.authorization?.split(" ")[1];

  if (!tokenCookie) {
    return res.status(401).json({ message: "Token ausente ou inválido." });
  }

  jwt.verify(tokenCookie, Jt, (err, user) => {
    if (err || !user.status) {
      return res.status(403).json({ message: "Acesso negado, o status não está ativo." });
    }
    req.user = user; // Armazenando o usuário no req
    next();
  });
};
