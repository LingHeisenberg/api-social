import consulta from "../database/connection.js";

// Listar todas as participações
export async function getEventParticipants(req, res) {
  try {
    const sql = "SELECT * FROM event_participants";
    const participacoes = await consulta(sql);
    res.status(200).json(participacoes);
  } catch (error) {
    console.error("Erro ao buscar participações:", error);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
}

// Eventos de um usuário
export async function getEventsByUser(req, res) {
  const { user_id } = req.params;
  try {
    const sql = "SELECT * FROM event_participants WHERE user_id = ?";
    const resultados = await consulta(sql, [user_id]);
    res.status(200).json(resultados);
  } catch (error) {
    console.error("Erro ao buscar eventos do usuário:", error);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
}

// Participantes de um evento
export async function getUsersByEvent(req, res) {
  const { event_id } = req.params;
  try {
    const sql = "SELECT * FROM event_participants WHERE event_id = ?";
    const resultados = await consulta(sql, [event_id]);
    res.status(200).json(resultados);
  } catch (error) {
    console.error("Erro ao buscar participantes do evento:", error);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
}

// Criar nova participação
export async function createEventParticipant(req, res) {
  const { user_id, event_id } = req.body;

  try {
    const sql = "INSERT INTO event_participants (user_id, event_id) VALUES (?, ?)";
    const resultado = await consulta(sql, [user_id, event_id]);
    res.status(201).json({ mensagem: "Participação registrada com sucesso!", resultado });
  } catch (error) {
    console.error("Erro ao registrar participação:", error);
    res.status(500).json({ error: "Erro interno ao registrar participação." });
  }
}

// Remover participação
export async function deleteEventParticipant(req, res) {
  const { user_id, event_id } = req.params;

  try {
    const sql = "DELETE FROM event_participants WHERE user_id = ? AND event_id = ?";
    const resultado = await consulta(sql, [user_id, event_id]);
    res.status(200).json({ mensagem: "Participação removida com sucesso!", resultado });
  } catch (error) {
    console.error("Erro ao remover participação:", error);
    res.status(500).json({ error: "Erro interno ao remover participação." });
  }
}
