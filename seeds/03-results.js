const date = new Date();

const results = {
  'user_id': 1,
  'question_id': 1,
  'time_taken': 15,
  'correct': true,
  'attempted_at': date,
  'answer': 'Nevermind dudes'
}


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('results').del()
    .then(() => {
      return knex.raw(
        "SELECT setval('results_id_seq', 1, false);"
      )
    })
    .then(() => {
      return knex('results').insert(results);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('results_id_seq', (SELECT MAX(id) FROM results));"
      );
    });
};
