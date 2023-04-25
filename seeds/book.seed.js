const mongoose = require("mongoose");
const { connect } = require("../db.js");
const { Book } = require("../models/Book.js");

const bookList = [
  {
    title: "Harry Potter",
    author: "J.K. Rowling",
    pages: 543
  },
  {
    title: "1984",
    author: "George Orwell",
    pages: 328
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    pages: 281
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    pages: 180,
    rating: 8
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    pages: 279,
    rating: 5
  }
];

connect().then(() => {
  console.log("Conexion desde el seed satisfactoria");

  Book.collection.drop().then(() => {
    console.log("Limpieza de la coleccion realizada");
  });

  const documents = bookList.map((book) => new Book(book));

  Book.insertMany(documents)
    .then(() => {
      console.log("Datos insertados correctamente");
    })
    .catch((error) => console.log(error))
    .finally(() => mongoose.disconnect());
});
