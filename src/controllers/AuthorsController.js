const AuthorsService = require('../services/AuthorsService');

class AuthorsController {
  create(req, res) {
    AuthorsService.create(req)
      .then(({ status, data }) => {
        res.status(status).send({
          success: true,
          data,
        });
      })
      .catch((data) => {
        const { status, message } = data;
        res.status(status).send({
          success: false,
          message,
        });
      });
  }

  getByID(req, res) {
    AuthorsService.getByID(req)
      .then(({ status, ...data }) => {
        res.status(status).send({
          success: true,
          ...data,
        });
      })
      .catch(({ status, message }) => {
        res.status(status).send({
          success: false,
          message,
        });
      });
  }

  list(req, res) {
    AuthorsService.list(req)
      .then(({ status, ...data }) => {
        res.status(status).send({
          success: true,
          ...data,
        });
      })
      .catch(({ status, message }) => {
        res.status(status).send({
          success: false,
          message,
        });
      });
  }

  update(req, res) {
    AuthorsService.update(req)
      .then(({ status, ...data }) => {
        res.status(status).send({
          success: true,
          ...data,
        });
      })
      .catch(({ status, message }) => {
        res.status(status).send({
          success: false,
          message,
        });
      });
  }

  remove(req, res) {
    AuthorsService.remove(req)
      .then(({ status }) => {
        res.status(status).send({
          success: true,
        });
      })
      .catch(({ status, message }) => {
        res.status(status).send({
          success: false,
          message,
        });
      });
  }
}

module.exports = new AuthorsController();
