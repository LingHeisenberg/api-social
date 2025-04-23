import consulta from "../database/connection.js";

// Listar todos os recursos
export async function getResources(req, res) {
  try {
    const sql = "SELECT * FROM resources";
    const results = await consulta(sql);
    res.status(200).json(results);
  } catch (error) {
    console.error("Erro ao buscar resources:", error);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
}

// Buscar recurso por ID
export async function getResource(req, res) {
  const { id } = req.params;
  try {
    const sql = "SELECT * FROM resources WHERE id = ?";
    const resource = (await consulta(sql, [id]))[0];
    if (resource) {
      res.status(200).json(resource);
    } else {
      res.status(404).json({ message: "Resource não encontrado." });
    }
  } catch (error) {
    console.error("Erro ao buscar resource:", error);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
}

// Criar novo recurso
export async function createResource(req, res) {
  const { id, title, file_url, posted_by, course, created_at } = req.body;

  try {
    const sql = "INSERT INTO resources SET ?";
    const result = await consulta(sql, [{
      id,
      title,
      file_url,
      posted_by,
      course,
      created_at,
    }]);

    res.status(201).json({ message: "Resource criado com sucesso!", result });
  } catch (error) {
    console.error("Erro ao criar resource:", error);
    res.status(500).json({ error: "Erro ao criar resource." });
  }
}

// Atualizar resource
export async function updateResource(req, res) {
  const { id } = req.params;
  const dadosAtualizar = req.body;

  try {
    const sqlVerifica = "SELECT * FROM resources WHERE id = ?";
    const existe = await consulta(sqlVerifica, [id]);

    if (existe.length > 0) {
      const sql = "UPDATE resources SET ? WHERE id = ?";
      const result = await consulta(sql, [dadosAtualizar, id]);
      res.status(200).json({ message: "Resource atualizado com sucesso!", result });
    } else {
      res.status(404).json({ message: "Resource não encontrado." });
    }
  } catch (error) {
    console.error("Erro ao atualizar resource:", error);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
}

// Deletar resource
export async function deleteResource(req, res) {
  const { id } = req.params;
  try {
    const sqlCheck = "SELECT * FROM resources WHERE id = ?";
    const resource = await consulta(sqlCheck, [id]);

    if (resource.length > 0) {
      const sqlDelete = "DELETE FROM resources WHERE id = ?";
      await consulta(sqlDelete, [id]);
      res.status(200).json({ message: "Resource deletado com sucesso!" });
    } else {
      res.status(404).json({ message: "Resource não encontrado." });
    }
  } catch (error) {
    console.error("Erro ao deletar resource:", error);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
}
