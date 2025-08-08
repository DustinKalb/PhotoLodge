let express = require("express");
let router = express.Router();
let Controllers = require("../controllers");
const multer = require("multer");
const storage = require("../utils/storage");
const upload = multer({ storage });

router.get('/', (req, res) => {
    Controllers.postController.getPosts(res);
})

router.post('/create', (req, res) => {
    Controllers.postController.createPost(req.body, res);
})

router.put("/:id", (req, res) => {
  Controllers.postController.updatePost(req, res);
});

router.delete("/:id", (req, res) => {
  Controllers.postController.deletePost(req, res);
});

router.get("/user/:uid", (req, res) => {
    Controllers.postController.getUserPosts(req, res);
})

router.get("/folder/:fid", (req, res) => {
    Controllers.postController.getFolderPosts(req, res);
})

router.post("/upload", upload.single("image"), (req, res) => {
  // req.file.path will be the Cloudinary URL
  res.json({ imageUrl: req.file.path });
});

module.exports = router;