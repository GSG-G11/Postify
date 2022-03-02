const dbConnection = require('../config/connections');

const createUser = (username, email, password) => {
  const query = {
    text: 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
    values: [username, email, password],
  };

  return dbConnection.query(query);
};

module.exports = createUser;
