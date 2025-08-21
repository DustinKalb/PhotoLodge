"use strict";
let Models = require("../models");
const cloudinary = require("../utils/cloudinary");

const getPosts = (res) => {
    Models.Post.find({})
        .then(data => res.send({result: 200, data: data}))
        .catch(err => {
            console.log(err);
            res.send({result: 500, error: err.message})
        });
}

const createPost = (data, res) => {
    console.log(data)
    new Models.Post(data).save()
        .then(data => res.send({result: 200, data: data}))
        .catch(err => {
            console.log(err);
            res.send({result: 500, error: err.message})
        });
};

const updatePost = (req, res) => {
  console.log(req.body);
  Models.Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const deletePost = async (req, res) => {
  try {
    const post = await Models.Post.findById(req.params.id);

    const filename = post.imageUrl.split("/").pop().replace(/\.[^/.]+$/, "");
    const publicId = `photolodge-app/${filename}`;

    await cloudinary.uploader.destroy(publicId);

    await Models.Post.findByIdAndDelete(req.params.id);

    res.send({ result: 200, message: "Post and image deleted" });
  } catch (err) {
    console.log(err);
    res.send({ result: 500, error: err.message });
  }
};

const getUserPosts = (req, res) => {
  Models.Post.find({ userId: req.params.uid })
    .populate({ path: "userId" })
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const getFolderPosts = (req, res) => {
  Models.Post.find({ folderId: req.params.fid })
    .populate({ path: "folderId" })
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

module.exports = {
    getPosts,
    createPost,
    updatePost,
    deletePost,
    getUserPosts,
    getFolderPosts,
};