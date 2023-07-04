const express=require('express');
const { RegisterUser, LoginUser, logout, forgotPassword, getUserDetails, updatePassword, updateProfile, getAllUser, getSingleUser, updateRole, deleteUser } = require('../controllers/userController');
const { isAuthenticatedUser, authorizedUser } = require('../middleware/auth');
const router=express.Router();


router.route("/register").post(RegisterUser);
router.route("/login").post(LoginUser);
router.route("/logout").get(logout);
router.route("/password/update").put(isAuthenticatedUser,updatePassword); 
router.route("/profile/update").put(isAuthenticatedUser,updateProfile);
router.route("/me").get(isAuthenticatedUser,getUserDetails);
router.route("/admin/users").get(isAuthenticatedUser,authorizedUser("admin"),getAllUser);
router.route("/admin/user/:id").get(isAuthenticatedUser,authorizedUser("admin"),getSingleUser).put(isAuthenticatedUser,authorizedUser("admin"),updateRole).delete(isAuthenticatedUser,authorizedUser("admin"),deleteUser )
 
module.exports=router;