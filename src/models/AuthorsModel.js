const db = require('../config/Database');

class AuthorsModel {
  create({
    id,
    name,
    genre,
    nationality,
  }) {
    return new Promise(((resolve, reject) => {
      const { authors } = db.data;

      if (!authors || !authors[id]) {
        db.data = {
          authors: {
            ...authors,
            [id]: {
              id,
              name,
              genre,
              nationality,
            },
          },
        };

        resolve();
      } else {
        reject();
      }
    }));
  }

  getByID(id) {
    return new Promise(((resolve, reject) => {
      const { authors } = db.data;

      if (authors && authors[id]) {
        resolve(authors[id]);
      } else {
        reject(new Error(`Authors id:${id} not found.`));
      }
    }));
  }

  list() {
    return new Promise(((resolve, reject) => {
      const { authors } = db.data;
      const keys = Object.keys(authors);

      if (authors && keys.length > 0) {
        resolve(keys.map((key) => ({
          ...authors[key],
        })));
      } else {
        reject(new Error('Authors not found.'));
      }
    }));
  }

  update({
    id,
    ...props
  }) {
    return new Promise(((resolve, reject) => {
      const { authors } = db.data;

      if (authors && authors[id]) {
        const author = {
          ...authors[id],
          ...props,
        };

        db.data = {
          authors: {
            ...authors,
            [id]: author,
          },
        };

        resolve(author);
      } else {
        reject(new Error(`Authors id:${id} not found.`));
      }
    }));
  }

  remove({
    id,
  }) {
    return new Promise(((resolve, reject) => {
      const { authors } = db.data;

      if (authors && authors[id]) {
        authors[id] = null;
        delete authors[id];

        db.data = {
          authors,
        };

        resolve();
      } else {
        reject(new Error(`Authors id:${id} not found.`));
      }
    }));
  }
}

module.exports = new AuthorsModel();
