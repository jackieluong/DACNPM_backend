const mysql = require("mysql2/promise");
require("dotenv").config();
// Create connection
// const connection = mysql.createConnection({
//   host: process.env.DB_HOST ,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });


const connection = mysql.createPool({
    host: process.env.DB_HOST ,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  async function testConnection() {
    try {
        // Run a simple query to check the connection (e.g., check server version)
        const [rows] = await connection.execute('SELECT 1');
        
        // If the query is successful, connection is good
        console.log('Connected to the database successfully');
        
    } catch (error) {
        console.error('Error connecting to the database bị loi ne:', error.message);
    }
}

testConnection();

module.exports = connection;
