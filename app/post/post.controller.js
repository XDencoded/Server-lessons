import { prisma } from '../prisma.js'
import asyncHandler from 'express-async-handler'

//@desc     Create new post
//@route    POST /api/post
//@access   Private
export const createNewPost = asyncHandler(async (req, res) => {
	const { title, text } = req.body

	const post = await prisma.post.create({
		data: {
			title,
			text
		}
	})
	res.json(post)
})

//@desc     Update post
//@route    PUT /api/post/:id
//@access   Private
export const putPost = asyncHandler(async (req, res) => {
	const { title, text } = req.body

	try {
		const post = await prisma.post.update({
			where: {
				id: +req.params.id
			},
			data: {
				title,
				text
			}
		})
		res.json(post)
	} catch (error) {
		res.status(404)
		throw new Error('Post not found')
	}
})

//@desc     Delete post
//@route    DELETE /api/post/:id
//@access   Private
export const deletePost = asyncHandler(async (req, res) => {
	try {
		const post = await prisma.post.delete({
			where: {
				id: +req.params.id
			}
		})
		res.json({
			message: 'Post delete',
			deleteEquipment: post
		})
	} catch (error) {
		res.status(404)
		throw new Error('Post not found')
	}
})



// @desc    Get post
// @route   GET /api/post
// @access  Private
export const getPost = asyncHandler(async (req, res) => {
	const post = await prisma.post.findMany({
		orderBy: {
			createdAt: 'desc'
		}
	})
	res.json(post)
})
