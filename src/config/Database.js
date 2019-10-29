import {
  constants as fsConstants,
  promises as fsPromises,
} from 'fs';
import path from 'path';

class DataBase {
  #filePath;
  #dbData;

  constructor() {
    this.#filePath = path.join(__dirname, '../../db.json');
    this.#dbData = {};

    this.#createDatabaseFile()
      .then(this.#loadDatabaseFile);
  }

  set data(collection) {
    if (collection && collection.constructor === Object && Object.keys(collection).length > 0) {
      this.#dbData = {
        ...this.#dbData,
        ...collection,
      };
    }

    this.#saveDatabaseFile();
  }

  get data() {
    return {
      ...this.#dbData,
    };
  }

  #createDatabaseFile = () => (new Promise(((resolve, reject) => {
    fsPromises.access(this.#filePath, fsConstants.F_OK)
      .then(() => {
        // eslint-disable-next-line no-console
        console.log('Database file already exists');
        resolve();
      })
      .catch(() => {
        fsPromises.writeFile(this.#filePath, '')
          .then(() => {
            // eslint-disable-next-line no-console
            console.log('Successfully created database file.');
            resolve();
          })
          .catch((err) => {
            // eslint-disable-next-line no-console
            console.log('Error creating the database file.');
            reject(err);
          });
      });
  })));

  #loadDatabaseFile = async () => {
    this.#dbData = await fsPromises.readFile(this.#filePath, {
      encoding: 'utf8',
      flag: 'r',
    })
      .then((data) => (data ? JSON.parse(data) : {}));
  };

  #saveDatabaseFile = () => {
    if (this.#dbData && Object.keys(this.#dbData).length > 0) {
      fsPromises.writeFile(this.#filePath, JSON.stringify(this.#dbData));
    }
  };
}

module.exports = new DataBase();
