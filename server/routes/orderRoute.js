
const express=require("express")

const router=express.Router();
const { isAuthenticatedUser, authorizedUser } = require('../middleware/auth');
const { newOrder, getSingleOrder, myOrder, getAllOrder, updateOrder, deleteOrder } = require("../controllers/orderController");

router.route("/order/new").post(isAuthenticatedUser,newOrder);
router.route("/order/me").get(isAuthenticatedUser,myOrder) 
router.route("/order/:id").get(isAuthenticatedUser,getSingleOrder)
router.route("/admin/orders").get(isAuthenticatedUser,authorizedUser("admin"),getAllOrder);
router.route("/admin/order/:id").put(isAuthenticatedUser,authorizedUser("admin"),updateOrder)
.delete(isAuthenticatedUser,authorizedUser("admin"),deleteOrder);



module.exports=router;