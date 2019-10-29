import Joi from 'joi';
import RouterValidator from '../../classes/RouterValidator';

export default class AuthorsSchema extends RouterValidator {
  static get create() {
    const schema = {
      body: Joi.object().keys({
        name: Joi.string().required(),
        genre: Joi.string().required(),
        nationality: Joi.string().required(),
      }),
    };

    return this.validate(schema);
  }

  static get authorByID() {
    const schema = {
      params: Joi.object().keys({
        id: Joi.string().required(),
      }),
    };

    return this.validate(schema);
  }

  static get update() {
    const schema = {
      params: Joi.object().keys({
        id: Joi.string().required(),
      }),
      body: Joi.object().keys({
        name: Joi.string(),
        genre: Joi.string(),
        nationality: Joi.string(),
      }).required().min(1),
    };

    return this.validate(schema);
  }
}
