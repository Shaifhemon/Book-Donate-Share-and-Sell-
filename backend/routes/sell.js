const router = require("express").Router();
const Sell = require("../model/sellmodel");
const auth = require("../middleware/auth");

router.get("/", (req, res) => {
  Sell.find()
    .then((sell) => res.json(sell))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/:id", (req, res) => {
  Sell.findById(req.params.id)
    .then((sell) => res.json(sell))
    .catch((err) => res.json("Error: +err"));
});

router.post("/", auth, (req, res) => {
  const newSell = new Sell({
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
    B_section: req.body.B_section,
    Book_Name: req.body.Book_Name,
    Price:req.body.Price,
    addedBy: req.body.addedBy
  });

  newSell
    .save()
    .then((sell) => res.json("New Sell post Added"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.delete("/:id", auth, (req, res) => {
  Sell.findByIdAndDelete(req.params.id)
    .then(() => res.json("Sell post deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.put("/:id", auth, (req, res) => {
  Sell.findByIdAndUpdate(req.params.id, { $set: req.body })
    .then(() => res.json("Sell post updated"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
