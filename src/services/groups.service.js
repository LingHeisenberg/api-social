import consulta from "../database/connection.js";

// Listar todas as categorias
export async function getGroups(req, res) {
  try {
    const sql = "SELECT * FROM categories";
    const results = await consulta(sql);
    res.status(200).json(results);
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
}

// Buscar uma categoria por ID
export async function getGroup(req, res) {
  const { id } = req.params;
  try {
    const sql = "SELECT * FROM categories WHERE id = ?";
    const category = (await consulta(sql, [id]))[0];
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: "Categoria não encontrada." });
    }
  } catch (error) {
    console.error("Erro ao buscar categoria:", error);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
}

// Criar nova categoria
export async function createGroup(req, res) {
  const { id, name, description, created_at } = req.body;

  try {
    const sql = "INSERT INTO categories SET ?";
    const result = await consulta(sql, [{
      id,
      name,
      description,
      created_at,
    }]);
    res.status(201).json({ message: "Categoria criada com sucesso!", result });
  } catch (error) {
    console.error("Erro ao criar categoria:", error);
    res.status(500).json({ error: "Erro ao criar categoria." });
  }
}

// Atualizar categoria
export async function updateGroup(req, res) {
  const { id } = req.params;
  const dadosAtualizar = req.body;

  try {
    const sqlVerifica = "SELECT * FROM categories WHERE id = ?";
    const existe = await consulta(sqlVerifica, [id]);

    if (existe.length > 0) {
      const sql = "UPDATE categories SET ? WHERE id = ?";
      const result = await consulta(sql, [dadosAtualizar, id]);
      res.status(200).json({ message: "Categoria atualizada com sucesso!", result });
    } else {
      res.status(404).json({ message: "Categoria não encontrada." });
    }
  } catch (error) {
    console.error("Erro ao atualizar categoria:", error);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
}

// Deletar categoria
export async function deleteGroup(req, res) {
  const { id } = req.params;
  try {
    const sqlCheck = "SELECT * FROM categories WHERE id = ?";
    const category = await consulta(sqlCheck, [id]);

    if (category.length > 0) {
      const sqlDelete = "DELETE FROM categories WHERE id = ?";
      await consulta(sqlDelete, [id]);
      res.status(200).json({ message: "Categoria deletada com sucesso!" });
    } else {
      res.status(404).json({ message: "Categoria não encontrada." });
    }
  } catch (error) {
    console.error("Erro ao deletar categoria:", error);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
}
