
// logic for wishlist
// import wishlist collection
const wishlists = require('../models/wishlistSchema');


// logic for add to wishlist
exports.addToWishlist=async(req,res)=>{
    // get product details
    // res.body={
    //     id:5000
    //     title:'arr'
    //     price: '688'
    // }
    const {id,title,price,image} = req.body;
    //logic
    try{
        //check if product already in wishlist
    const item = await wishlists.findOne({id})
    if(item){
        res.status(401).json("Product already available in wishlist")
    }
    else{
        // add new product to wishlist
        const newProduct = new wishlists({id,title,price,image})
        // to store the new product in the wishlist
        await newProduct.save()
        //send response back to client
        res.status(200).json("product added successfully")
    }
    }
    catch(error){
        res.status(401).json(error)
    }

}


// get all wishlist products
exports.getWishlistItems=async(req,res)=>{
    //logic
    try{
        const allWishlist = await wishlists.find()
        res.status(200).json(allWishlist) // wishlists product details
    }
    catch(error){
        res.status(404).json(error)

    }
}


// delete product from wishlist
exports.deleteWishlistItems=async(req,res)=>{
    //logic
    // get id from request
    const {id}=req.params
    try{
        const removeProduct=await wishlists.deleteOne({id})
        // get all wishlists product after deleting particular product
        if(removeProduct){
            const allItems=await wishlists.find()
            res.status(200).json(allItems)
        }
    }   
    catch(error){
        res.status(404).json(error)
    }
}