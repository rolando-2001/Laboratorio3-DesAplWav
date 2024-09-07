import { Router } from "express";


const router = Router();

router.get('/listpro', async (req, res) => {
    try {
        res.render('producto/list');
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/addpro', (req, res) => {
    res.render('producto/addpro');

});


router.post('/addpro"', async(req, res)=>{
    try{
        res.redirect('/list');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});


//--------ACTUALIZAR --------------------------------------------//

router.get('/editpro', (req,res)=>{
    res.render('producto/aditpro');
});

router.post('/editpro', async(req, res)=>{
    try{
        res.redirect('/list');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});


export default router;