import express from 'express'
import { add, addTeacher, deleted, login, test, update } from './user.controller.js'
import { isStudent, isTeacher, validateJwt } from '../middlewares/validate.js'

const api = express.Router()

api.get('/test', test)
api.post('/add', add)
api.post('/addTeacher', [validateJwt, isTeacher], addTeacher)
api.post('/login', login)
api.delete('/delete/:id', [validateJwt, isStudent], deleted)
api.put('/update/:id', [validateJwt, isStudent], update)

export default api