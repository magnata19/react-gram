const mongoose = require("mongoose");
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const conn = async () => {
  try {
    const dbConn = await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.qb5hajw.mongodb.net/?retryWrites=true&w=majority`)
    console.log('conectou ao banco com sucesso')
    return dbConn
  } catch (error) {
    console.error(error, 'deu ruim na conexao do db')
  }
}

conn();

module.exports = conn;