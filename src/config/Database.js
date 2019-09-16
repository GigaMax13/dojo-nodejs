const {
  constants: fsConstants,
  promises: fsPromises,
} = require('fs');
const path = require('path');

class DataBase {
  constructor() {
    this.filePath = path.join(__dirname, '../../db.json');

    this._createDataBaseFile();
  }

  save(data) {
    return fsPromises.writeFile(this.filePath, JSON.stringify(data))
  }

  read() {
    return fsPromises.readFile(this.filePath, {
      encoding: 'utf8',
      flag: 'r+'
    })
      .then(data => data ? JSON.parse(data) : null);
  }

  _createDataBaseFile() {
    fsPromises.access(this.filePath, fsConstants.F_OK)
      .then(() => {
        console.log('Database file already exists');
      })
      .catch(() => {
        fsPromises.writeFile(this.filePath, '')
          .then(() => console.log('Successfully created database file.'))
          .catch(err => console.log('Error creating the database file.', err));
      });
  }
}

module.exports = new DataBase();
