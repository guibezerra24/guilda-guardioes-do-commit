const express = require("express");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const app = express();
app.disable("x-powered-by");
app.use(express.json({ limit: "8kb" }));

app.get("/feitiço", (req, res) => {
  const nome = String(req.query.nome || "").slice(0, 100);
  res.type("text/plain").send(nome);
});

app.post("/senha", (req, res) => {
  const senha = req.body.senha;
  if (typeof senha !== "string" || senha.length < 8 || senha.length > 256) {
    return res.status(400).json({ erro: "Senha deve ter de 8 a 256 caracteres" });
  }
  const salt = crypto.randomBytes(16);
  crypto.scrypt(senha, salt, 64, (erro, hash) => {
    if (erro) return res.sendStatus(500);
    res.json({ salt: salt.toString("hex"), hash: hash.toString("hex") });
  });
});

app.get("/mapa", (req, res) => {
  const segredo = process.env.JWT_SECRET;
  if (!segredo || segredo.length < 32) return res.sendStatus(503);
  try {
    const dados = jwt.verify(String(req.query.token || ""), segredo, {
      algorithms: ["HS256"], issuer: "guilda", audience: "hogwarts"
    });
    return res.json(dados);
  } catch {
    return res.sendStatus(401);
  }
});

app.listen(3000, "127.0.0.1");
