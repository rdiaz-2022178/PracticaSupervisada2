import express from 'express'
import { add, find, test } from './assigned.controller.js'
import { isStudent, validateJwt } from '../middlewares/validate.js'

const api = express.Router()

api.get('/test', test)
api.post('/add', [validateJwt,isStudent], add)
api.get('/find/:id', [validateJwt,isStudent], find)

export default api

