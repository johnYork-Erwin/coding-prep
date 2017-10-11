const users = [{
  'username': 'chicken',
  'hashed_password': '$2a$12$VpeUcAVm/pvxRtKyMNnyeu2IWgUvdJPAmb6nmnbe3fUVZfvLtsNYS'
}, {
  'username': 'kitty',
  'hashed_password': '$2a$12$Uiybf7YICs5nmnZA0UWe9uPEkwLD5hWK.TuUxXID2XsLIOXy0uYJy'
}, {
  'username': 'puppy',
  'hashed_password': '$2a$12$T/Sq7FWWeKnvgw5t4eCZS..wa7X4TYgOE8ds6THw3g1JW3513w/hK'
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
