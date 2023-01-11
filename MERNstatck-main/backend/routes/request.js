const router = require("express").Router();
const Request = require("../model/requestmodel");
const auth = require("../middleware/auth");

router.get("/", (req, res) => {
  Request.find()
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/:id", (req, res) => {
  Request.findById(req.params.id)
    .then((request) => res.json(request))
    .catch((err) => res.json("Error: +err"));
});

router.post("/", auth, (req, res) => {
   const newRequest = new Request({
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
    B_section: req.body.B_section,
    Book_Name: req.body.Book_Name,
    addedBy: req.body.addedBy
  });

  newRequest
    .save()
    .then((request) => res.json("New Request post Added"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.delete("/:id", auth, (req, res) => {
  Request.findByIdAndDelete(req.params.id)
    .then(() => res.json("Request post deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.put("/:id", auth, (req, res) => {
  Request.findByIdAndUpdate(req.params.id, { $set: req.body })
    .then(() => res.json("Request post updated"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
