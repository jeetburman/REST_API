const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createCategory = async (req,res)=>{
    try{
        if(!req.body.name){

            return res.status(422).json({
                error : "name is needed"
            })
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