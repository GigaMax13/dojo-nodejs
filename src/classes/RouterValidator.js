import Joi from 'joi';

export default class RouterValidator {
  static validateRoute(req, res, next) {
    const data = {};
    const schema = this;

    Object.keys(schema).forEach((key) => {
      data[key] = req[key];
    });

    const validation = Joi.validate(data, schema);

    if (!validation.error) {
      next();
    } else {
      res.status(400).send({
        success: false,
        messages: validation.error.details.map((error) => {
          const {
            message,
            path,
          } = error;

          return {
            message: message.replace(/["']/g, ''),
            path,
          };
        }),
      });
    }
  }

  static validate(schema) {
    return this.validateRoute.bind(schema);
  }
}
