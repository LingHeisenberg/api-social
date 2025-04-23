import consulta from "../database/connection.js";

// Obter todos os usuários
export async function getUsers(req, res) {
  try {
    const sql = "SELECT * FROM users";
    const users = await consulta(sql);
    if (users.length > 0) {
      return res.status(200).json(users);
    } else {
      return res.json({ message: "No users found!" });
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error." });
  }
}

// Obter usuário por ID
export async function getUser(req, res) {
  const { id } = req.params;
  try {
    const sql = "SELECT * FROM users WHERE id = ?";
    const user = (await consulta(sql, [id]))[0];
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.json({ message: "User not found!" });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error." });
  }
}

// Criar novo usuário
export async function createUser(req, res) {
  const { id, name, email, curso, semestre, bio, avatar_url } = req.body;
  try {
    const sql = "INSERT INTO users SET ?";
    const newUser = await consulta(sql, [{
      id,
      name,
      email,
      curso,
      semestre,
      bio,
      avatar_url
    }]);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Error creating user." });
  }
}

// Atualizar usuário
export async function updateUser(req, res) {
  const { id } = req.params;
  const updatedFields = req.body;

  try {
    const sql1 = "SELECT * FROM users WHERE id = ?";
    const exists = await consulta(sql1, [id]);

    if (exists.length > 0) {
      const sql2 = "UPDATE users SET ? WHERE id = ?";
      const result = await consulta(sql2, [updatedFields, id]);

      res.status(200).json({
        success: true,
        message: "User updated successfully.",
        result,
      });
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error." });
  }
}

// Deletar usuário
export async function deleteUser(req, res) {
  const { id } = req.params;

  try {
    const sql1 = "SELECT * FROM users WHERE id = ?";
    const user = await consulta(sql1, [id]);

    if (user.length > 0) {
      const sql2 = "DELETE FROM users WHERE id = ?";
      await consulta(sql2, [id]);

      res.status(200).json({ message: "User deleted successfully." });
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error." });
  }
}
