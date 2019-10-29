import uuid from 'uuid/v3';

import Environment from '../config/Environment';
import Hypermedia from '../classes/Hypermedia';
import HttpError from '../classes/HttpError';
import AuthorsModel from '../models/AuthorsModel';

const { NAMESPACE } = Environment;

class AuthorsService extends Hypermedia {
  create(req) {
    const {
      body: {
        name,
        genre,
        nationality,
      },
    } = req;
    return new Promise(((resolve, reject) => {
      const id = uuid(name, NAMESPACE);
      const author = {
        id,
        name,
        genre,
        nationality,
      };

      AuthorsModel.create(author)
        .then(() => resolve({
          status: 201,
          data: author,
        }))
        .catch(() => reject(new HttpError('The request could not be completed due to a conflict with the current state of the target resource.', 409)));
    }));
  }

  getByID(req) {
    return new Promise(((resolve, reject) => {
      const {
        params: {
          id,
        },
      } = req;

      AuthorsModel.getByID(id)
        .then((data) => resolve({
          status: 200,
          ...this.generateLinks(req, data, ['books']),
        }))
        .catch(() => reject(new HttpError('Not found.', 404)));
    }));
  }

  list(req) {
    return new Promise(((resolve, reject) => {
      AuthorsModel.list()
        .then((data) => resolve({
          status: 200,
          ...this.generateLinks(req, data, ['books']),
        }))
        .catch(() => reject(new HttpError('Not found.', 404)));
    }));
  }

  update(req) {
    return new Promise(((resolve, reject) => {
      const {
        params: {
          id,
        },
        body,
      } = req;

      AuthorsModel.update({ id, ...body })
        .then((data) => resolve({
          status: 200,
          ...this.generateLinks(req, data, ['books']),
        }))
        .catch(() => reject(new HttpError('Not found.', 404)));
    }));
  }

  remove(req) {
    return new Promise(((resolve, reject) => {
      const {
        params: {
          id,
        },
      } = req;

      AuthorsModel.remove({ id })
        .then(() => resolve({
          status: 204,
        }))
        .catch(() => reject(new HttpError('Not found.', 404)));
    }));
  }
}

module.exports = new AuthorsService();
