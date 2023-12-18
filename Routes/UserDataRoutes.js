const router = require('express').Router()
const passport = require('passport');
const postControllers = require("../controllers/UserDataControllers")
const { validatePostData } = require('../middelwears/validatePost');

router.post('/postData',validatePostData, passport.authenticate('jwt', { session: false }), postControllers.postData);
router.get('/getData', passport.authenticate('jwt', { session: false }), postControllers.getData);
router.put('/updateData/:postId', passport.authenticate('jwt', { session: false }), postControllers.updateData);
router.delete('/deleteData/:postId', passport.authenticate('jwt', { session: false }), postControllers.DeleteData);
router.get('/getByloc/:latitude/:longitude', passport.authenticate('jwt', { session: false }), postControllers.getByLocation);
router.get('/getPostCounts', passport.authenticate('jwt', { session: false }), postControllers.getPostCounts);
module.exports = router