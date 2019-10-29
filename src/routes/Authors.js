import express from 'express';

import AuthorsSchema from './schemas/AuthorsSchema';
import AuthorsController from '../controllers/AuthorsController';

const route = express.Router({ mergeParams: true });

/* POST /authors */
route.post('/', AuthorsSchema.create, AuthorsController.create);

/* GET /authors/:id */
route.get('/:id', AuthorsSchema.authorByID, AuthorsController.getByID);

/* GET /authors */
route.get('/', AuthorsController.list);

/* PATCH /authors/:id */
route.patch('/:id', AuthorsSchema.update, AuthorsController.update);

/* DELETE /authors/:id */
route.delete('/:id', AuthorsSchema.authorByID, AuthorsController.remove);

export default route;
