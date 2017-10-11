'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('questions', (table) => {
    table.increments();
    table.integer('created_by').references('users.id').defaultTo(0);
    table.string('title').notNullable();
    table.string('difficulty').notNullable();
    table.string('language').notNullable();
    table.text('answer').notNullable();
    table.text('prompt').notNullable();
    table.text('expected_outputs').notNullable();
    table.integer('duration').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('questions')
};
