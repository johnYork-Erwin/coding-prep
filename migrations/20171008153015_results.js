
exports.up = function(knex, Promise) {
  return knex.schema.createTable('results', (table) => {
    table.increments();
    table.integer('user_id').references('users.id').notNullable().onDelete('CASCADE');
    table.integer('question_id').references('questions.id').notNullable().onDelete('CASCADE');
    table.integer('time_taken').defaultTo(0);
    table.text('answer');
    table.boolean('correct').defaultTo(false);
    table.date('attempted_at');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('results')
};
