import consulta from "../database/connection.js";

// Obter todos os posts
export async function getPosts(req, res) {
  try {
    const sql = "SELECT * FROM posts";
    const posts = await consulta(sql);
    if (posts.length > 0) {
      return res.status(200).json(posts);
    } else {
      return res.json({ message: "No posts found." });
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Internal server error." });
  }
}

// Obter um post por ID
export async function getPost(req, res) {
  const { id } = req.params;
  try {
    const sql = "SELECT * FROM posts WHERE id = ?";
    const post = (await consulta(sql, [id]))[0];
    if (post) {
      return res.status(200).json(post);
    } else {
      return res.json({ message: "Post not found." });
    }
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ error: "Internal server error." });
  }
}

// Criar um novo post
export async function createPost(req, res) {
  const {
    id,
    author_id,
    content,
    image_url,
    created_at,
    likes_count,
    comments_count
  } = req.body;

  try {
    const sql = "INSERT INTO posts SET ?";
    const novoPost = await consulta(sql, [{
      id,
      author_id,
      content,
      image_url,
      created_at,
      likes_count,
      comments_count
    }]);
    res.status(201).json(novoPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Error creating post." });
  }
}

// Atualizar post
export async function updatePost(req, res) {
  const { id } = req.params;
  const camposAtualizados = req.body;

  try {
    const sql1 = "SELECT * FROM posts WHERE id = ?";
    const existe = await consulta(sql1, [id]);

    if (existe.length > 0) {
      const sql2 = "UPDATE posts SET ? WHERE id = ?";
      const result = await consulta(sql2, [camposAtualizados, id]);

      res.status(200).json({
        success: true,
        message: "Post updated successfully.",
        result,
      });
    } else {
      res.status(404).json({ message: "Post not found." });
    }
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: "Internal server error." });
  }
}

// Deletar post
export async function deletePost(req, res) {
  const { id } = req.params;

  try {
    const sql1 = "SELECT * FROM posts WHERE id = ?";
    const post = await consulta(sql1, [id]);

    if (post.length > 0) {
      const sql2 = "DELETE FROM posts WHERE id = ?";
      await consulta(sql2, [id]);

      res.status(200).json({ message: "Post deleted successfully." });
    } else {
      res.status(404).json({ message: "Post not found." });
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Internal server error." });
  }
}
