import express from 'express';

// import controllers/middleware 
import { deleteSelf, getUserData, searchVerifiedUsers, getAllFollowers, getVipFollowers, checkIfFollowing, getVipData, getFollowing, followUser, getFollowers, editBio, addFavourite, getFavourites } from '../controllers/user_controllers.js';
import { authenticateToken, checkAdmin, checkVerified } from '../middleware/auth_middleware.js';

const router = express.Router();

// // admin protected route to delete a specific user 
// router.delete('/admin/delete/:user', authenticateToken, checkAdmin, deleteUser)

//  get logged in user data 

// route for VIPS to return list of ALL followers 
router.get('/followers', authenticateToken, getAllFollowers)

// get all following (for home branch list)
router.get('/following', authenticateToken, getFollowing)

router.get('/followers', authenticateToken, getFollowers)

// route for VIPs to return all followers who are verified (to create a chat with)
router.get('/vip/followers', authenticateToken, getVipFollowers)

// route for users to authenticate whether they are following VIP (to view chats)
router.get('/checkfollowing/:user', authenticateToken, checkIfFollowing)

// retrieve VIP user data --> for user profile rendering 
router.get('/vipdata/:user', authenticateToken, getVipData)

// check if user is verified (put in useEffect for conditional rendering on VIP accounts)
router.get('/checkvip', authenticateToken, checkVerified)

router.post('/follow/:followee', authenticateToken, followUser)

router.post('/edit', authenticateToken, editBio)

//////

// main search route for all users to find verified people to follow
router.get('/search/:user', authenticateToken,  searchVerifiedUsers)

// route to get a logged in user's data 
router.get ('/data', authenticateToken, getUserData)


// route for logged in user to delete their account
router.delete('/account/delete', authenticateToken, deleteSelf)

//  route to add a chat to a user's 'favourites' page
router.post('/favourite/new/:chat', authenticateToken, addFavourite)

router.get('/favourites/get', authenticateToken, getFavourites)





// export the router 
 export default router 


