let express = require("express");
let router = express.Router();
let Controllers = require("../controllers");
const models = require("../models");

router.get('/', (req, res) => {
    Controllers.userController.getUsers(res);
})

router.post('/create', (req, res) => {
    Controllers.userController.createUser(req.body, res);
})

router.put("/:id", (req, res) => {
  Controllers.userController.updateUser(req, res);
});

router.delete("/:id", (req, res) => {
  Controllers.userController.deleteUser(req, res);
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await models.User.findOne({ username, password });
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  res.json({ userId: user._id, username: user.username })
})

module.exports = router;