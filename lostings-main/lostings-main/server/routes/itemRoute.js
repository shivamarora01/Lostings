const express = require("express");
const { createItem, getLostItems, getFoundItems, deleteItem, updateItem ,getItem, getMyLostItems, getMyFoundItems} = require("../controllers/itemController");
const {isAuthenticatedUser} = require("../middleware/auth");
const router = express.Router();
const expressFormidable =require("express-formidable");

router.route("/item/new").post(isAuthenticatedUser,expressFormidable({maxFieldsSize:5*1024*1024}),createItem);
router.route("/items/lost").get(getLostItems);
router.route("/items/found").get(getFoundItems);
router
  .route("/item/:id").get(getItem)
  .put(isAuthenticatedUser,  updateItem)
  .delete(isAuthenticatedUser, deleteItem);
router.route("/items/me/lost").get(isAuthenticatedUser,getMyLostItems);
router.route("/items/me/found").get(isAuthenticatedUser,getMyFoundItems);

module.exports = router;