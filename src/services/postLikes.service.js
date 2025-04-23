import consulta from "../database/connection.js";

// Listar todos os likes
export async function getAllLikes(req, res) {
  try {
    const sql = "SELECT * FROM post_likes";
    const likes = await consulta(sql);
    res.status(200).json(likes);
  } catch (error) {
    console.error("Erro ao buscar likes:", error);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
}

// Likes por post
export async function getLikesByPost(req, res) {
  const { post_id } = req.params;
  try {
    const sql = "SELECT * FROM post_likes WHERE post_id = ?";
    const likes = await consulta(sql, [post_id]);
    res.status(200).json(likes);
  } catch (error) {
    console.error("Erro ao buscar likes do post:", error);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
}

// Likes por usuário
export async function getLikesByUser(req, res) {
  const { user_id } = req.params;
  try {
    const sql = "SELECT * FROM post_likes WHERE user_id = ?";
    const likes = await consulta(sql, [user_id]);
    res.status(200).json(likes);
  } catch (error) {
    console.error("Erro ao buscar likes do usuário:", error);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
}

// Criar um like (curtir post)
export async function likePost(req, res) {
  const { user_id, post_id } = req.body;
  try {
    const sql = "INSERT INTO post_likes (user_id, post_id) VALUES (?, ?)";
    await consulta(sql, [user_id, post_id]);
    res.status(201).json({ message: "Post curtido com sucesso." });
  } catch (error) {
    console.error("Erro ao curtir post:", error);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
}

// Remover like (descurtir post)
export async function unlikePost(req, res) {
  const { user_id, post_id } = req.body;
  try {
    const sql = "DELETE FROM post_likes WHERE user_id = ? AND post_id = ?";
    const resultado = await consulta(sql, [user_id, post_id]);

    if (resultado.affectedRows > 0) {
      res.status(200).json({ message: "Like removido com sucesso." });
    } else {
      res.status(404).json({ message: "Like não encontrado." });
    }
  } catch (error) {
    console.error("Erro ao remover like:", error);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
}
