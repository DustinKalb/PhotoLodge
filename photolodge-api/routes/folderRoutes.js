let express = require("express");
let router = express.Router();
let Controllers = require("../controllers");

router.get('/', (req, res) => {
    Controllers.folderController.getFolders(res);
})

router.post('/create', (req, res) => {
    Controllers.folderController.createFolder(req.body, res);
})

router.put("/:id", (req, res) => {
  Controllers.folderController.updateFolder(req, res);
});

router.delete("/:id", (req, res) => {
  Controllers.folderController.deleteFolder(req, res);
});

router.get("/user/:uid", (req, res) => {
    Controllers.folderController.getUserFolders(req, res);
})

module.exports = router;