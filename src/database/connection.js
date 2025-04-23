import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Criação de um pool de conexões
const pool = mysql.createPool({
  uri: process.env.MYSQL_URL, // Usa a URI definida no .env
  waitForConnections: true,
  connectionLimit: 10, // Limita o número máximo de conexões
  queueLimit: 0, // Sem limite para filas de requisições
});

// Função para verificar a conexão com o banco
(async function checkConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("Conexão bem-sucedida!");
    connection.release(); // Libera a conexão de volta para o pool
  } catch (erro) {
    console.error("Erro ao conectar no banco:", erro.message);
  }
})();

// Função para realizar consultas
export default async function consulta(sql, dados = []) {
  try {
    const [result] = await pool.execute(sql, dados); // Usa pool para executar a consulta
    return result;
  } catch (erro) {
    console.error("Erro na consulta:", erro.message);
    throw erro; // Relança o erro para tratamento posterior
  }
}
