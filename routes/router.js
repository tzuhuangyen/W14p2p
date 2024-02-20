const express = require("express");
const router = express.Router();
// import this model inside the routes.js file.

const Model = require("../models/model");

router.post("/post", async (req, res) => {
  const data = new Model({
    username: req.body.username,
    password: req.body.password,
  });
  try {
    const dtaToSave = await data.save();
    res.status(200).json(dtaToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// router.post("/post", (req, res) => {
//   res.send("post api");
// });

router.get("/getAll", async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/getOne/:id", async (req, res) => {
  try {
    const data = await Model.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const options = {
      new: true,
    };

    const updateResult = await Model.findByIdAndUpdate(id, updateData, options);
    res.send(updateResult);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Model.findByIdAndDelete(id);
    res.send(`Document with ${data.username} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
module.exports = router;
