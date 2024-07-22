import { prisma } from "../prisma.js"
import { UserFields } from "../utils/user.util.js"
import  asyncHandler  from 'express-async-handler';

//@desc     Get user profile
//@route    Get /api/auth/profile
//@access   Profile
export const getUserProfile = asyncHandler(async (req, res) => {
    const user = await prisma.user.findUnique({
        where:{
            id: req.user.id
        },
        select: UserFields
    })
    res.json(user)
})