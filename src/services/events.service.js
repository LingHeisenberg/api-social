import consulta from "../database/connection.js";

// Listar todos os eventos
export async function getEvents(req, res) {
  try {
    const sql = "SELECT * FROM events";
    const eventos = await consulta(sql);
    res.status(200).json(eventos);
  } catch (erro) {
    console.error("Erro ao buscar eventos:", erro);
    res.status(500).json({ erro: "Erro interno no servidor." });
  }
}

// Buscar um evento por ID
export async function getEvent(req, res) {
  const { id } = req.params;

  try {
    const sql = "SELECT * FROM events WHERE id = ?";
    const evento = (await consulta(sql, [id]))[0];
    if (evento) {
      res.status(200).json(evento);
    } else {
      res.status(404).json({ mensagem: "Evento não encontrado." });
    }
  } catch (erro) {
    console.error("Erro ao buscar evento:", erro);
    res.status(500).json({ erro: "Erro interno no servidor." });
  }
}

// Criar novo evento
export async function createEvent(req, res) {
  const { id, title, description, date, location, created_by } = req.body;

  try {
    const sql = "INSERT INTO events SET ?";
    const novo = await consulta(sql, [{
      id,
      title,
      description,
      date,
      location,
      created_by,
    }]);

    res.status(201).json({ mensagem: "Evento criado com sucesso!", novo });
  } catch (erro) {
    console.error("Erro ao criar evento:", erro);
    res.status(500).json({ erro: "Erro interno no servidor." });
  }
}

// Atualizar um evento
export async function updateEvent(req, res) {
  const { id } = req.params;
  const atualizacoes = req.body;

  try {
    const verificar = "SELECT * FROM events WHERE id = ?";
    const existente = await consulta(verificar, [id]);

    if (existente.length > 0) {
      const sql = "UPDATE events SET ? WHERE id = ?";
      const resultado = await consulta(sql, [atualizacoes, id]);
      res.status(200).json({ mensagem: "Evento atualizado com sucesso!", resultado });
    } else {
      res.status(404).json({ mensagem: "Evento não encontrado." });
    }
  } catch (erro) {
    console.error("Erro ao atualizar evento:", erro);
    res.status(500).json({ erro: "Erro interno no servidor." });
  }
}

// Deletar evento
export async function deleteEvent(req, res) {
  const { id } = req.params;

  try {
    const verificar = "SELECT * FROM events WHERE id = ?";
    const existente = await consulta(verificar, [id]);

    if (existente.length > 0) {
      const sql = "DELETE FROM events WHERE id = ?";
      await consulta(sql, [id]);
      res.status(200).json({ mensagem: "Evento deletado com sucesso!" });
    } else {
      res.status(404).json({ mensagem: "Evento não encontrado." });
    }
  } catch (erro) {
    console.error("Erro ao deletar evento:", erro);
    res.status(500).json({ erro: "Erro interno no servidor." });
  }
}
