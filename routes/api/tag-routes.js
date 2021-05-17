const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  Tag.findAll({
    include: [
      {
        module: Product,
        attributes: ["id", "product_name"],
      },
    ],
  })
    .then((dbTag) => res.json(dbTag))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  // find all tags
  // be sure to include its associated Product data
});

router.get("/:id", (req, res) => {
  Tag.findOne({
    where: { id: req.params.id },
  })
    .then((dbTag) => {
      if (!dbTag) {
        res.status(404).json({ message: "NO TAG FOUND WITH THIS ID" });
      }
      res.json(dbTag);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  // find a single tag by its `id`
  //FIXME: be sure to include its associated Product data
});

router.post("/", (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name,
    //FIXME: Add product information here
  });
  // create a new tag
});

router.put("/:id", (req, res) => {
  //FIXME: update a tag's name by its `id` value
});

router.delete("/:id", (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbTag) => {
      if (!dbTag) {
        res.status(404).json({ message: "NO TAG FOUND WITH THIS ID" });
      }
      res.json(dbTag);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  // delete on tag by its `id` value
});

module.exports = router;
