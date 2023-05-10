import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const BxTrackBooks = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    no_of_pages: 10,
    published_at: "",
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const response = await fetch("http://localhost:8000/books");
    const data = await response.json();
    setBooks(data);
  };

  const createBook = async () => {
    const response = await fetch("http://localhost:8000/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    });
    const data = await response.json();
    setBooks([...books, data]);
    setNewBook({
      title: "",
      author: "",
      no_of_pages: 10,
      published_at: "",
    });
  };

  const updateBook = async (id) => {
    const response = await fetch(`http://localhost:8000/books/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    });
    const data = await response.json();
    setBooks(books.map((book) => (book.id === id ? data : book)));
    setNewBook({
      title: "",
      author: "",
      no_of_pages: 10,
      published_at: "",
    });
  };

  const deleteBook = async (id) => {
    await fetch(`http://localhost:8000/books/${id}`, {
      method: "DELETE",
    });
    setBooks(books.filter((book) => book.id !== id));
  };

  
  const classes = useStyles();
  return (
    <div>
      <Table style={{ marginTop: 100 }}>
        <TableHead>
          <TableRow>
            <TableCell style={{color:'#FF6D60', fontWeight:'bold'}}>Title</TableCell>
            <TableCell style={{color:'#FF6D60', fontWeight:'bold'}}>Author</TableCell>
            <TableCell style={{color:'#FF6D60', fontWeight:'bold'}}>No. of Pages</TableCell>
            <TableCell style={{color:'#FF6D60', fontWeight:'bold'}}>Published At</TableCell>
            <TableCell style={{color:'#FF6D60', fontWeight:'bold'}}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book.id}>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.no_of_pages}</TableCell>
              <TableCell>{book.published_at}</TableCell>
              <TableCell>
                <Button onClick={() => setNewBook(book)}>Edit</Button>
                <Button onClick={() => deleteBook(book.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Typography style={{ marginTop: 50, textAlign: "center", color:'#19A7CE'}} variant="h4">
        {newBook.id ? "Edit Book" : "Create Book"}
      </Typography>
      <div className={classes.formContainer}>
        <form className={classes.form}>
          <label style={{ marginRight: 110, color:'#E76161' }}>Title:</label>
          <TextField
            type="text"
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          />
          <br />
          <br />
          <label style={{ marginRight: 90, color:'#E76161' }}>Author:</label>
          <TextField
            type="text"
            value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          />
          <br />
          <br />
          <label style={{ marginRight: 50, color:'#E76161' }}>No. of Pages:</label>
          <TextField
            type="number"
            value={newBook.no_of_pages}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (value >= 10) {
                setNewBook({ ...newBook, no_of_pages: value });
              }
            }}
          />

          <br />
          <br />
          <label style={{ marginRight: 50, color:'#E76161' }}>Published At:</label>
          <TextField
            type="text"
            value={newBook.published_at}
            onChange={(e) =>
              setNewBook({ ...newBook, published_at: e.target.value })
            }
          />
          <br />
          <br />
          {newBook.id ? (
            <Button  style={{ width: 370 }} variant="contained" onClick={() => updateBook(newBook.id)}>
              Update Book
            </Button>
          ) : (
            <Button
              style={{ width: 370 }}
              variant="contained"
              onClick={createBook}
            >
              Add New Book
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

const useStyles = makeStyles(() => ({
  formContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "60vh",
  },
}));

export default BxTrackBooks;
