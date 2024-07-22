import express from 'express'

import { protect } from '../middleware/auth.middleware.js'
import {
	createNewPost,
	getPost,
	deletePost,
	putPost
} from './post.controller.js'

const router = express.Router()

router.route('/').post(protect, createNewPost).get(protect, getPost)
router.route('/:id').delete(protect, deletePost).put(protect, putPost)

export default router
