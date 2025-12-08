const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.createProduct = async (req,res)=>{
    try{
        if(!req.body.name){
            return res.status(422).json({error : 'Product name required!'})
        }
        if(!req.body.price){
            return res.status(422).json({error : 'Please add price of product!'})
        }else{
            if(req.body.price !== 'number' || req.body.price <= 0){
                res.status(422).json({error : 'Invalid price entered!'})
            }
            if(!req.body.categoryId){
                return res.status(422).json({error : 'Please specify the product category'})
            }
            if(!await prisma.category.findunique({where : {id: parseInt(req.body.categoryId)}})){
                return res.status(404).json({error : 'Category ID not Found!'})
            }
            const newProduct = await prisma.product.create({
                data : req.body
            })
            return res.status(201).json({msg : 'Product created successfully'})
        }
    }catch(e){
        return res.status(500).json({
            e : e.message
        })
    }
}

exports.getProduct = async (req,res)=>{
    try{
        const productList = await prisma.product.findMany({
            include : {
                category : {
                    select : {
                        // id : true,
                        name : true
                    }
                }
            }
        });
        return res.status(200).json({msg : productList})
    }catch(e){
        return res.status(500).json({
            e : e.message
        })
    }
}

exports.getProductById = async (req,res)=>{
    try{
        const productAsked = await prisma.product.findUnique({
            where : {
                id : parseInt(req.params.id)
            },
            include : {
                category : {
                    select : {
                        name : true
                    }
                }
            }
        });
        if(!productAsked){
            return res.status(404).json({
                error : 'Product with ID specified does not exist!'
            })
        }
        return res.status(200).json({msg : productAsked})
    }catch(e){
        return res.status(500).json({
            e : e.message
        })
    }
}

// Needs review!
exports.updateProduct = async (req,res)=>{
    try{
        const updatedProduct = req.body.name;
        if(!updatedProduct){
            return res.status(404).json({ msg : 'Name is required for updation!'})
        }
        const existingProduct = await prisma.product.findUnique({
            where : {
                id : updatedProduct
            }
        })
        if(existingProduct){
            return res.status(422).json({
                msg : 'Product already exists!'
            })
        }
        const finalUpdation = await prisma.product.update({
            data : req.body,
            where : {
                id : parseInt(req.params.id)
            }
        })
        return res.status(200).json({msg : finalUpdation})

    }catch(e){
        return res.status(500).json({
            e : e.message
        })
    }
}

exports.deleteProduct = async (req,res)=>{
    try{
        const selectedValue = parseInt(req.params.id)
        const productWithId = await prisma.product.findUnique({where : {id : selectedValue}})
        if(!productWithId){
            return res.status(404).json({
                msg : 'The product with specified ID does not exist!'
            })
        }
        await prisma.product.delete({where: {id : selectedValue}})
    }catch(e){
        return res.status(500).json({
            e : e.message
        })
    }
}

exports.getProductsByCategoryId = async (req,res)=>{
    const categoryID = parseInt(req.params).categoryId;
    categoryExistence = await prisma.category.findUnique({
        where : {
            id : categoryID
        }
    })
    if(!categoryExistence){
        return res.status(404).json({
            msg : 'Category does not exist!'
        })
    }
    const productList = await prisma.product.findMany({
        where : {
            id : categoryID
        }
    })
    return res.status(200).json({
        Products : productList
    })
}