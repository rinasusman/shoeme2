const express = require('express');
const adminRoute = express();


const adminController = require("../controllers/adminController")

const auth = require("../middleware/auth");
const store = require('../helpers/multer')

adminRoute.set('view engine', 'ejs');
adminRoute.set('views', './views/admin');


adminRoute.get('/', adminController.loginload);
adminRoute.post('/adminLogin', adminController.homeload);

adminRoute.get('/dashboard', auth.adminLogin, adminController.dashboardload);

// ================ user management ================//
adminRoute.get('/userlist', auth.adminLogin, adminController.userlistload);
adminRoute.post("/blockUnblockUser", auth.adminLogin, adminController.userBlockUnblock);
adminRoute.post("/userorderList", auth.adminLogin, adminController.userorderList);
adminRoute.post("/updateStatus", auth.adminLogin, adminController.updateStatus)
//======================================================//

//============== category management ==================//
adminRoute.get('/categorylist', auth.adminLogin, adminController.catlistload);
adminRoute.get('/catCreate', auth.adminLogin, adminController.createCategory);
adminRoute.post('/addCategory', auth.adminLogin, store.single('image'), adminController.addNewCategory);
adminRoute.get('/categoryEdit/:id', auth.adminLogin, adminController.editCategoryPageLoad);
adminRoute.post('/editCategory', auth.adminLogin,  store.single('image'),adminController.editCategory);
adminRoute.get('/categoryUnlist/:id', auth.adminLogin, adminController.unlistCategory);
adminRoute.get('/categoryList/:id', auth.adminLogin, adminController.listCategory);

//======================================================//

// ================ product management ================//
adminRoute.get('/productlist', auth.adminLogin, adminController.prodlistload);
adminRoute.get('/prodCreate', auth.adminLogin, adminController.createProduct);
adminRoute.post('/addProduct', auth.adminLogin, store.array('image', 3), adminController.addNewProduct);
adminRoute.get('/productEdit/:id', auth.adminLogin, adminController.editProductPageload);
adminRoute.post('/editProduct', auth.adminLogin, store.array('image', 3), adminController.editProduct);
adminRoute.get('/productUnlist/:id', auth.adminLogin, adminController.unlistProduct);
adminRoute.get('/productList/:id', auth.adminLogin, adminController.listProduct);
//======================================================//

adminRoute.get('/adminLogout', adminController.handleLogout);



module.exports = adminRoute;