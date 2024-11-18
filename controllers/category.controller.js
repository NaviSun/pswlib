import Categorys from "../models/Categorys.js"


export const createCategory = async (req, res) =>{
    const condidate = await Categorys.findOne({name: req.body.categoryName})
    if(condidate){
        res.status(201).redirect('/auth/compendium/category')
    }
    try {
        await new Categorys({
            name: req.body.categoryName
        }).save()
        res.status(201).redirect('/auth/compendium/category')
    } catch (e) {
        console.log(e.message);
      }
   
}