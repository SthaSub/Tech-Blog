const router = require('express').Router();
const { Post } = require('../../models');

router.post('/',async (req, res)=>{

    try {
        const postData = await Post.create({
            description: req.body.post,
            title:req.body.title,
            user_id: req.session.user_id 
         });
         const posts = postData.get({ plain: true });
         res.status(200).json({posts});
    } catch (error) {
        res.status(400).json(error);
    }
    });

router.get('/edit/:id',async (req, res)=>{
    try {
        const postData = await Post.findByPk(req.params.id);
        const post = postData.get({plain:true});
        res.status(200).render('edit-post',{post});
    } catch (error) {
        res.status(400).json(error);
    }
});

router.put('/:id', async (req, res)=>{
    try {
        const postData = await Post.update({
            title: req.body.editTitle,
            description: req.body.editPost
        },{
            where:{
                id:req.params.id
            }
        });

        res.status(200).json(postData);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.delete('/:id', async (req,res)=>{
    try {
        const postData = await Post.destroy({
            where:{
                id:req.params.id
            }
        });
        res.status(200).json(postData);
    } catch (error) {
        res.status(400).json(error);
    }
});
module.exports = router;