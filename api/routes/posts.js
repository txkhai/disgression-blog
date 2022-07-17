const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

router.post("/", async(req, res) => {
    const user = await User.findById(req.body.userId);
    const username = user.username;
    try{
        const newPost = new Post({
            title: req.body.title,
            desc: req.body.desc,
            username: username,
        });

        const post = await newPost.save();
        res.status(200).json(post);
    }catch(err){
        res.status(500).json(err);
    }
});

router.put("/:id", async(req, res) => {
    const post = await Post.findById(req.params.id);
    const username = post.username;
    const user = await User.findOne({ username: username });
    const userId = user._id;
    if(userId == req.body.userId){
        try{
            const updatePost = await Post.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json(updatePost);
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(401).json("You can only update your post!");
    }
});

router.delete("/:id", async(req, res) => {
    const post = await Post.findById(req.params.id);
    const username = post.username;
    const user = await User.findOne({ username: username });
    const userId = user._id;
    if(userId == req.body.userId){
        try{
            await Post.findByIdAndDelete(req.params.id);
            res.status(200).json("Post has been deleted...");
        }catch(err){
            res.status(500).json(err)
        }
    }else{
        res.status(401).json("You can only delete your post!");
    }
});

router.get("/:id", async(req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    }catch(err){
        res.status(500).json(err);
    }
})

router.get("/", async(req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try{
        let posts;
        if(username){
            posts = await Post.find({ username: username });
        }else if(catName){
            posts = await Post.find({
                catagories: {
                    $in: [catName],
                },
            });
        }else{
            posts = await Post.find();
        }
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;