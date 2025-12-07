const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createCategory = async (req,res)=>{
    try{
        if(!req.body.name){

            return res.status(422).json({
                error : "name is needed"
            })
        }
        if(await prisma.category.findUnique({ where : { name : req.body.name } })){
            return res.status(409).json({error : `${req.body.name} category already exists`})
        }
        const newCategory = await prisma.category.create({
            data : {
                name : req.body.name
            }
        })
    }catch(e){
        return res.status(500).json({
            e : e.message
        })
    }
}

exports.getCategories = async (req,res)=>{
    try{
        const categories = await prisma.category.findMany()

        return res.status(200).json(categories)
    }catch(e){
        return res.status(500).json({e : e.message})
    }
}

exports.updateCategory = async(req,res)=>{
    try{
        const categoryExists = await prisma.category.findUnique({ where: { id : parseInt(req.params.id) }});
        if(!categoryExists){
            return res.status(404).json({ e : 'Category not Found!'})
        }
        if(!req.body.name){
            return res.status(422).json({ e : 'Name is required!'})
        }
        if(await prisma.category.findUnique({ where: {name: req.body.name}})){
            return res.status(409).json({ e : `${req.body.name} category already exists!`})
        }
        const updatedCategory = await prisma.category.update({
            data: {
                name : req.body.name,
            },
            where:{
                id: parseInt(req.params.id)
            }
        })
        return res.status(200).json({ msg : "updated" + updatedCategory})
    }catch(e){
        return res.status(500).json({e : e.message})
    }
}

exports.deleteCategory = async (req,res)=>{
    try{
        const categoryExists = await prisma.category.findUnique({ where: { id : parseInt(req.params.id) }});
        if(!categoryExists){
            return res.status(404).json({ e : 'Category not Found!'})
        }
        if(!req.body.name){
            return res.status(422).json({ e : 'Name is required!'})
        }
        await prisma.category.delete({
            where: {
                id: parseInt(req.params.id)
            }
        })
        return res.status(204).send()
    }catch(e){
        return res.status(500).json({e : e.message})
    }

}