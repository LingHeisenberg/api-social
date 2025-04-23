import consulta from "../database/connection.js";

// Listar todas as associações
export async function getGroupMembers(req, res) {
  try {
    const sql = "SELECT * FROM user_groups";
    const results = await consulta(sql);
    res.status(200).json(results);
  } catch (error) {
    console.error("Erro ao buscar associações:", error);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
}

// Listar grupos de um usuário específico
export async function getGroupsByUser(req, res) {
  const { user_id } = req.params;
  try {
    const sql = "SELECT * FROM user_groups WHERE user_id = ?";
    const results = await consulta(sql, [user_id]);
    res.status(200).json(results);
  } catch (error) {
    console.error("Erro ao buscar grupos do usuário:", error);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
}

// Criar nova associação
export async function createGroupMember(req, res) {
  const { user_id, group_id } = req.body;

  try {
    const sql = "INSERT INTO user_groups (user_id, group_id) VALUES (?, ?)";
    const result = await consulta(sql, [user_id, group_id]);
    res.status(201).json({ message: "Associação criada com sucesso!", result });
  } catch (error) {
    console.error("Erro ao criar associação:", error);
    res.status(500).json({ error: "Erro interno ao criar associação." });
  }
}

// Deletar associação
export async function deleteUserGroup(req, res) {
  const { user_id, group_id } = req.params;

  try {
    const sql = "DELETE FROM user_groups WHERE user_id = ? AND group_id = ?";
    const result = await consulta(sql, [user_id, group_id]);
    res.status(200).json({ message: "Associação removida com sucesso!", result });
  } catch (error) {
    console.error("Erro ao deletar associação:", error);
    res.status(500).json({ error: "Erro interno ao remover associação." });
  }
}



