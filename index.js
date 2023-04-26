const express = require("express");

// Conexion a la BBDD
const { connect } = require("./db.js");
try {
  connect();
} catch (error) {
  console.log(`Ha ocurrido un error al conectar: ${error}`);
}

// Modelos
const { Book } = require("./models/Book.js");

// Router de Express
const PORT = 3000;
const server = express();
const router = express.Router();

// Configuracion del servidor
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

// Rutas
router.get("/", (req, res) => {
  res.send("Library API");
});

router.get("/book", (req, res) => {
  Book.find()
    .then((book) => res.json(book))
    .catch((err) => res.status(500).json(err));
});

router.post("/book", async (req, res) => {
  try {
    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      pages: req.body.pages,
      rating: req.body.rating,
    });

    const createdBook = await book.save();
    return res.status(200).json(createdBook);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/book/:id", (req, res) => {
  const id = req.params.id;

  Book.findById(id)
    .then((book) => {
      if (book) {
        res.json(book);
      } else {
        res.status(404).json({});
      }
    })
    .catch((error) => res.status(500).json(error));
});

router.get("/book/title/:title", async (req, res) => {
  const title = req.params.title;

  try {
    const book = await Book.find({ title: new RegExp("^" + title.toLowerCase(), "i") });
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

server.use("/", router);
server.listen(PORT, () => {
  console.log(`Servidor funcionando en puerto ${PORT}`);
});
