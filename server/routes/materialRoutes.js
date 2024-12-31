const express = require("express");
const {
  authenticateTokenGeral,
  authenticateTokenOn,
  authenticateTokenExclusivo,
} = require("../middlewares/authenticateToken");
const {
  MaterialAdulto,
  MaterialNewsletter,
  MaterialExclusivo,
} = require("../models/Material");

const router = express.Router();

router.get("/materialAdulto", authenticateTokenOn, authenticateTokenGeral, async (req, res) => {
  try {
    const materials = await MaterialAdulto.find();
    res.status(200).json(materials);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar materiais" });
  }
});
router.get("/materialAdulto/:id", authenticateTokenOn, authenticateTokenGeral, async (req, res) => {
  const itemId = req.params.id;
  MaterialAdulto.findById(itemId)
    .then((item) => {
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }
      res.json(item);
    })
    .catch((error) => {
      console.error("Error fetching item:", error);
      res.status(500).json({ message: "Internal server error" });
    });
});

router.get("/newslatter", authenticateTokenOn, authenticateTokenGeral, async (req, res) => {
  try {
    const materials = await MaterialNewsletter.find();
    res.status(200).json(materials);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar materiais" });
  }
});
router.get("/exclusivo",
  authenticateTokenOn,
  authenticateTokenGeral,
  authenticateTokenExclusivo,
  async (req, res) => {
    try {
      const materials = await MaterialExclusivo.find();
      res.status(200).json(materials);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar materiais" });
    }
  }
)

module.exports = router;