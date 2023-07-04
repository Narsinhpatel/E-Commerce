const express = require('express');
const { getAllproduct, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReviews } = require('../controllers/productController');
const { isAuthenticatedUser, authorizedUser } = require('../middleware/auth');

const router = express.Router();


router.route("/products").get(getAllproduct);
router.route("/admin/products/new").post(isAuthenticatedUser, authorizedUser("admin"), createProduct);
router.route("/admin/products/:id").put(isAuthenticatedUser, authorizedUser("admin"), updateProduct).delete(isAuthenticatedUser, authorizedUser("admin"), deleteProduct);

router.route("/products/:id").get(getProductDetails);

router.route("/review").put(isAuthenticatedUser,createProductReview)
router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser,deleteReviews)

module.exports = router