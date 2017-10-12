const questions = [ {
    'prompt': "Write a function that accepts a reference to the head of a linked list as an argument and returns a reference to a new linked list. The new linked list should be the same as the old linked list but minus the previous head.",
    'answer': "function decapitate (head) {return head.next}",
    'expected_outputs': "1 -> 2 -> 3 should return 2 -> 3",
    'difficulty': 'Easy',
    'language': 'JavaScript',
    'title': 'Off With The Head!',
    'created_by': null,
    'duration': 30
  }, {
    'prompt': "Write a function that accepts an integer and returns a boolean expressing whether or not that number is prime.",
    'answer': "function isPrime(int) {let end = Math.floor(Math.sqrt(int)); for (let i = 2; i < end; i++) {if (int/i % 1 === 0) return true}; return false;}",
    'expected_outputs': "5 => true, 6 => false, 1 => false, 2 => false",
    'difficulty': 'Easy',
    'language': 'JavaScript',
    'title': 'Is It Prime?',
    'created_by': null,
    'duration': 30
  }
];


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('questions').del()
    .then(() => {
      return knex.raw(
        "SELECT setval('questions_id_seq', 1, false);"
      )
    })
    .then(() => {
      return knex('questions').insert(questions);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('questions_id_seq', (SELECT MAX(id) FROM questions));"
      );
    });
};
