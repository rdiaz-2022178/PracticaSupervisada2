import express from 'express'
import { add, deleted, find, test, update } from './course.controller.js'
import { validateJwt, isTeacher, isStudent } from '../middlewares/validate.js';

const api = express.Router()

api.get('/test', test)
api.post('/add', [validateJwt, isTeacher], add)
api.put('/update/:id', [validateJwt, isTeacher], update)
api.delete('/delete/:id', [validateJwt, isTeacher], deleted)
api.get('/find/:id', [validateJwt, isTeacher], find)

export default api