const knex = require('knex')(require('./../knexfile'));

module.exports = {
  createUser ({username, password}) {
    console.log(`username: ${username}, password: ${password}`);
    return knex('user').insert({
      username,
      password
    });
  }
}
