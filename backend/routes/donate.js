const router = require("express").Router();
const Donate = require("../model/donatemodel");
const auth = require("../middleware/auth");

router.get("/", (req, res) => {
  Donate.find()
    .then((donate) => res.json(donate))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/:id", (req, res) => {
  Donate.findById(req.params.id)
    .then((donate) => res.json(donate))
    .catch((err) => res.json("Error: +err"));
});

router.post("/", auth, (req, res) => {
  const newDonate = new Donate({
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
    B_section: req.body.B_section,
    Book_Name: req.body.Book_Name,
    addedBy: req.body.addedBy
  });

  newDonate
    .save()
    .then((donate) => res.json("New Donate post Added"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.delete("/:id", auth, (req, res) => {
  Donate.findByIdAndDelete(req.params.id)
    .then(() => res.json("Donate post deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.put("/:id", auth, (req, res) => {
  Donate.findByIdAndUpdate(req.params.id, { $set: req.body })
    .then(() => res.json("Donate post updated"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
