const express = require('express');
const router = express.Router();


let books = [
  { id: 1, title: 'BxTracks', author: 'BxTracks Owner', no_of_pages: 200, published_at: 'New Year 2016' },
  { id: 2, title: 'Thoughts', author: 'Muhammad Yaseen', no_of_pages: 306, published_at: '2022-02-01' },
];

router.get('/', (req, res) => {
  res.json(books);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find((book) => book.id === id);

  if (!book) {
    res.status(404).json({ error: 'Book not found' });
  } else {
    res.json(book);
  }
});

router.post('/', (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
    no_of_pages: req.body.no_of_pages,
    published_at: req.body.published_at,
  };

  books.push(newBook);
  res.status(201).json(newBook);
});


router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find((book) => book.id === id);
  
    if (!book) {
      res.status(404).json({ error: 'Book not found' });
    } else {
      book.title = req.body.title || book.title;
      book.author = req.body.author || book.author;
      book.no_of_pages = req.body.no_of_pages || book.no_of_pages;
      book.published_at = req.body.published_at || book.published_at;
  
      res.json(book);
    }
  });
  
  router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const bookIndex = books.findIndex((book) => book.id === id);
  
    if (bookIndex === -1) {
      res.status(404).json({ error: 'Book not found' });
    } else {
      const deletedBook = books.splice(bookIndex, 1);
      res.json(deletedBook[0]);
    }
  });
  
  module.exports = router;
  