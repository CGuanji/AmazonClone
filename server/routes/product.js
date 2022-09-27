const router= require("express").Router();
const Product = require("../models/product");

const upload = require("../middlewares/upload-photo");

//Post single product
router.post("/products", upload.single("photo"), async(req,res)=>{
    //console.log("log in");
    try{
        let product= new Product();
        product.title=req.body.title;
        product.description=req.body.description;
        product.photo=req.file.location;
        product.stockQuantity= req.body.stockQuantity;

        await product.save();
        res.json({
            status: true,
            message:"Successfully Saved"
        });
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        });
    }
});


//Get Request, get all products
router.get("/products",async(req,res)=>{
    try{
        let products = await Product.find();

        res.json({
            products: products
        });

    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
          });
    }
});

//Get single product
router.get("/products/:id",async(req,res)=>{
    try{
        let product = await Product.findOne({_id:req.params.id});

        res.json({
            product: product
        });

    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
          });
    }
});

//put request
router.put("/products/:id",upload.single("photo"),async(req,res)=>{
    try{
        let product = await Product.findByIdAndUpdate({_id: req.params.id},{
            $set:{
                title: req.body.title,
                price: req.body.price,
                category:req.body.categoryID,
                photo:req.file.location,
                stockQuantity:req.body.stockQuantity,
                description: req.body.description,
                owner:req.body.ownerID
            },
        },
        {upsert:true}
        );
        res.json({
            success:true,
            updatedProduct: product
        });
    }
    catch(err){
        res.status(500).json({
            success:true,
            message:err.message
        });
    }
    

});


//Delete request - delete a single product
router.delete("/products/:id",async(req,res)=>{
    try{
        let deleteProduct= await Product.findOneAndDelete({_id:req.params.id});
        if(deleteProduct){
            res.json({

                status:true,
                message: "successfully deleted"
            })
        }
    }
    catch(err){
        res.status(500).json({
            success:false,
            message: err.message
        });
    }
});


module.exports= router;