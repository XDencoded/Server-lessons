import 'colors'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './app/auth/auth.routes.js'
import userRoutes from './app/user/user.routes.js'
import carRoutes from './app/cars/cars.routes.js'
import equipmentRoutes from './app/equipments/equipments.routes.js'
import morgan from 'morgan'
import { prisma } from './app/prisma.js'
import { errorHandler, notFound } from './app/middleware/error.middleware.js'


dotenv.config()

const app = express()

async function main() {
	if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))
	
	app.use(cors())
	app.use(express.json())

	app.use('/api/auth', authRoutes)
	app.use('/api/user', userRoutes)
	app.use('/api/cars', carRoutes)
	app.use('/api/equipments', equipmentRoutes)

	app.use(notFound)
	app.use(errorHandler)

	const PORT = process.env.PORT || 5000

	app.listen(
		PORT,
		console.log(
			`🚀 Server running in ${process.env.NODE_ENV} mode on port: ${PORT}`.blue
				.bold
		)
	)
}
main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect
		process.exit(1)
	})
