// logic for cart
// import cart from model
const carts = require('../models/cartSchema');


// logic for add to cart
exports.addToCart=async(req,res)=>{
    // get product details
    const {id,title,price,image,quantity} = req.body;
    try{
        //check if product already in cart
    const products = await carts.findOne({id})
    if(products){
        // product is present in cart , update the quantity and  price accordingly
        products.quantity+=1

        // update the grand total
        products.grandTotal = products.price*products.quantity

        //save changes to the db
        products.save()

        // send response back to the client
        res.status(401).json("Product details updated")
    }
    else{
        // add new product to cart
        const newProduct = new carts({id,title,price,image,quantity,grandTotal:price})

        // to save the new product in the cart
         newProduct.save()

        //send response back to client
        res.status(200).json("product added successfully")
    }

    }
    catch(error){
        res.status(401).json(error)
    }

}


// get cart products
exports.getCart = async(req,res)=>{
    const {id}=req.params
    try{
        const removeProduct=await carts.deleteOne({id})
        // get all cart product after deleting particular product
        if(removeProduct){
            const allCart=await carts.find()
            res.status(200).json(allCart)
        }
    }   
    catch(error){
        res.status(404).json(error)
    }
}


// delete product from cart
exports.deleteCartProduct=async(req,res)=>{
    //logic
    // get id from request
    const {id}=req.params
    // remove product from cart
    try{
        const removeProduct=await carts.deleteOne({id})
       
        if(removeProduct.deleteCount!=0){
             // get all carts product after deleting particular product
            const allItems=await carts.find()
            res.status(200).json(allItems)
        }
    }   
    catch(error){
        res.status(404).json(error)
    }
   
}


//increment of product quantity in cart
exports.incrementProductCount = async(req,res)=>{

    //logic
    // get id from request
    const {id}=req.params

    try{

        const product = await carts.findOne({id})
        if(product){
            product.quantity+=1;// increment the quantity
            product.grandTotal=product.price*product.quantity;
            // save changes to the db
          await  product.save()
            // after the product have been saved, update the client into the client side
            const allCart = await carts.find()
            res.status(200).json(allCart)


        }
        else{
            res.status(401).json("Product not found")
        }

    }
    catch(error){
        res.status(404).json(error)
    }
}


//decrement of product quantity in cart
exports.decrementProductCount = async(req,res)=>{

    //logic
    // get id from request
    const {id}=req.params

    try{

        const product = await carts.findOne({id})
        if(product){
            product.quantity-=1;// decrement the quantity
            if(product.quantity==0){
                //remove product from the cart 
                await carts.deleteOne({id})
                // awaiting product will be send back to the client
                const allCart = await carts.find()
                res.status(200).json(allCart)
            }
            else{
                product.grandTotal=product.price*product.quantity;
            // save changes to the db
           await product.save()
            // after the product have been saved, update the client into the client side
            const allCart = await carts.find()
            res.status(200).json(allCart)
            }
            
        }
        else{
            res.status(401).json("Product not found")
        }

    }
    catch(error){
        res.status(404).json(error)
    }
}