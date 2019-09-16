const db = require('../config/Database');

class BooksModel {
  create({ id, name, genre, authorID }){
    return new Promise(((resolve, reject) => {

    }));
  }
}

module.exports = new BooksModel();
