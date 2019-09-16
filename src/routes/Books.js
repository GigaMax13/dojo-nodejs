const express = require('express');
const BooksController = require('../controllers/BooksController');

const books = express.Router({ mergeParams: true });

/* POST /books */
books.post('/', BooksController.create);

/* GET /books/:bookID */
books.get('/:bookID', BooksController.getByID);

/* GET /books */
books.get('/', BooksController.list);

/* PUT /books/:bookID */
books.patch('/:bookID', BooksController.patch);

/* DELETE /books/:bookID */
books.delete('/:bookID', BooksController.remove);

module.exports = books;
