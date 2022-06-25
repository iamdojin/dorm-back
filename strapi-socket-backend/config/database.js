const path = require('path');

module.exports = ({ env }) => ({
  connection: {
    client: 'sqlite',
    connection: {
      filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
    },
    useNullAsDefault: true,
  },
});

async function userExists(id) {
  try {
      const user = strapi.services.users.findOne({ id: id });
      return user;
  } catch(err) {
      console.log("Error occured when fetching user", err);
  }
}

module.exports = {
  findUser,
  createUser,
  userExists,
}