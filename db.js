const mysql = require('mysql2/promise'); // fix: lowercase 'promise'

class Database {
    constructor() {
        if (!Database.instance) {
            this.pool = mysql.createPool({
                host: 'localhost',
                user: 'W1_87346_Ravilesh',
                password: 'manager',
                database: 'todo',
            });
            Database.instance = this;
        }

        return Database.instance;
    }

    async getConnection() {
        try {
            return await this.pool.getConnection();
        } catch (err) {
            console.error('Error while getting connection:', err);
            throw err;
        }
    }
}

module.exports = new Database();
