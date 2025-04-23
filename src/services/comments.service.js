import consulta from "../database/connection.js";

// Listar todos os comentários
export async function getComments(req, res) {
  try {
    const sql = "SELECT * FROM comments";
    const comentarios = await consulta(sql);
    res.status(200).json(comentarios);
  } catch (erro) {
    console.error("Erro ao buscar comentários:", erro);
    res.status(500).json({ erro: "Erro interno no servidor." });
  }
}

// Buscar comentários por post
export async function getCommentsByPost(req, res) {
  const { post_id } = req.params;
  try {
    const sql = "SELECT * FROM comments WHERE post_id = ?";
    const comentarios = await consulta(sql, [post_id]);
    res.status(200).json(comentarios);
  } catch (erro) {
    console.error("Erro ao buscar comentários do post:", erro);
    res.status(500).json({ erro: "Erro interno no servidor." });
  }
}

// Buscar comentários por autor
export async function getCommentsByAuthor(req, res) {
  const { author_id } = req.params;
  try {
    const sql = "SELECT * FROM comments WHERE author_id = ?";
    const comentarios = await consulta(sql, [author_id]);
    res.status(200).json(comentarios);
  } catch (erro) {
    console.error("Erro ao buscar comentários do autor:", erro);
    res.status(500).json({ erro: "Erro interno no servidor." });
  }
}

// Criar novo comentário
export async function createComment(req, res) {
  const { id, post_id, author_id, content } = req.body;

  try {
    const sql = "INSERT INTO comments SET ?";
    const novoComentario = await consulta(sql, [{
      id,
      post_id,
      author_id,
      content,
    }]);

    res.status(201).json({ mensagem: "Comentário criado com sucesso!", novoComentario });
  } catch (erro) {
    console.error("Erro ao criar comentário:", erro);
    res.status(500).json({ erro: "Erro interno no servidor." });
  }
}

// Deletar comentário
export async function deleteComment(req, res) {
  const { id } = req.params;

  try {
    const sql = "DELETE FROM comments WHERE id = ?";
    const resultado = await consulta(sql, [id]);
    res.status(200).json({ mensagem: "Comentário deletado com sucesso!", resultado });
  } catch (erro) {
    console.error("Erro ao deletar comentário:", erro);
    res.status(500).json({ erro: "Erro interno no servidor." });
  }
}
