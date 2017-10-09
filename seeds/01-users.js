const users = [{
  'username': 'kitty',
  'hashed_password': 'kitty'
}, {
  'username': 'puppy',
  'hashed_password': 'puppy'
}]


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => {
      return knex.raw(
        "SELECT setval('users_id_seq', 1, false);"
      )
    })
    .then(() => {
      return knex('users').insert(users);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));"
      );
    });
};
