// to define routes for client requests


//1 import express
const express = require('express')

//4 import product controller
const ProductController = require ('../controllers/productController')

//import wishlist controller
const WishlistController = require('../controllers/wishlistController')

// import cart controller
const cartController = require('../controllers/cartController')

//2 using express create object for router class to setup path
const router = new express.Router()

//3 use router object to resolve client request

    //get all request api request
    router.get('/products/all-products',ProductController.getAllProducts)

    // get a particular product details
    router.get('/products/view-product/:id',ProductController.viewProduct)

    //add new product to the wishlist
    router.post('/wishlists/add-to-wishlist',WishlistController.addToWishlist)

    // view all wishlist items
    router.get('/wishlists/view-all-wishlists',WishlistController.getWishlistItems)

    //delete particular product from wishlist
    router.delete('/wishlists/delete-wishlist-product/:id',WishlistController.deleteWishlistItems)

    //add to cart
    router.post('/carts/add-to-cart',cartController.addToCart)

    // get cart products
    router.get('/carts/get-cart',cartController.getCart)

    //delete items from cart
    router.delete('/carts/delete-product/:id',cartController.deleteCartProduct)

    //increase product count in cart
    router.get('/carts/increment-product/:id',cartController.incrementProductCount)

    //decrease product count
    router.get('/carts/decrement-product/:id',cartController.decrementProductCount)
//5 export routes
module.exports=router    
