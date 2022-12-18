"use strict";

class BookData {
  constructor(bookName, author, isbn) {
    this.bookName = bookName;
    this.author = author;
    this.isbn = isbn;
  }
}
const addBookContainer = document.querySelector(".add-book");
const addBookBtn = document.querySelector(".btn--add");
const formBook = document.querySelector(".form-book");
const formContainer = document.querySelector(".form");
const inputBookName = document.querySelector(".book__input--name");
const inputBookAuthor = document.querySelector(".book__input--author");
const inputBookISBN = document.querySelector(".book__input--isbn");
const booklistsContainer = document.querySelector(".booklists");

class App {
  _bookLists = [];

  constructor() {
    this._getBooksFromLocalStorage();
    addBookBtn.addEventListener("click", this._showForm);
    formContainer.addEventListener("submit", this._addNewBook.bind(this));
    booklistsContainer.addEventListener(
      "click",
      this._selectedAction.bind(this)
    );
  }

  _selectedAction(e) {
    console.log(e.target);
    if (e.target.classList.contains("booklist__btn--update")) {
      const selectedBookISBN = e.target.closest(".booklist").dataset.isbn;
      console.log(selectedBookISBN);
      const selectedBook = this._bookLists.find((book) => {
        return book.isbn === selectedBookISBN;
      });
      this._updateBook(selectedBook);
      e.target.closest(".booklist").remove();
      this._removeLocalStorage(selectedBook);
    }

    if (e.target.classList.contains("booklist__btn--delete")) {
      const selectedBookISBN = e.target.closest(".booklist").dataset.isbn;
      console.log(selectedBookISBN);
      const selectedBook = this._bookLists.find((list) => {
        return list.isbn === selectedBookISBN;
      });
      console.log(selectedBook);
      this._deleteBook(selectedBook);
    }
  }

  _showForm() {
    addBookContainer.classList.add("hidden");
    formBook.classList.remove("hidden");
  }

  _hideForm() {
    addBookContainer.classList.remove("hidden");
    formBook.classList.add("hidden");
  }

  _addNewBook(e) {
    e.preventDefault();

    const bookName = inputBookName.value;
    const author = inputBookAuthor.value;
    const isbnNo = inputBookISBN.value;

    const newBook = new BookData(bookName, author, isbnNo);
    console.log(newBook);
    this._bookLists.push(newBook);

    UI.renderBook(newBook);
    formContainer.reset();
    this._hideForm();
    this._saveToLocalStorage();
  }

  _updateBook(book) {
    this._showForm();
    inputBookName.value = book.bookName;
    inputBookAuthor.value = book.author;
    inputBookISBN.value = book.isbn;
  }

  _deleteBook(book) {
    this._bookLists = this._bookLists.filter((list) => {
      return list.isbn !== book.isbn;
    });
    console.log(this._bookLists);
    booklistsContainer.querySelectorAll("li").forEach((li) => {
      li.remove();
    });
    UI.renderAllBooks(this._bookLists);
    this._saveToLocalStorage();
  }

  _saveToLocalStorage() {
    localStorage.setItem("bookLists", JSON.stringify(this._bookLists));
  }

  _getBooksFromLocalStorage() {
    this._bookLists = JSON.parse(localStorage.getItem("bookLists")) || [];
    UI.renderAllBooks(this._bookLists);
  }

  _removeLocalStorage(book) {
    this._bookLists = this._bookLists.filter((list) => {
      return list.isbn !== book.isbn;
    });
    console.log(this._bookLists);
    this._saveToLocalStorage();
  }
}

class UI {
  static renderBook(book) {
    const markup = `
      <li class="booklist" data-isbn=${book.isbn}>
        <p class="booklist__name">${book.bookName}</p>
        <p class="booklist__author">${book.author}</p>
        <p class="booklist__isbn">#${book.isbn}</p>
        <div class="booklist__actions">
          <button class="booklist__btn booklist__btn--update">
            update book
          </button>
          <button class="booklist__btn booklist__btn--delete">
            delete book
          </button>
        </div>
      </li>
    `;
    booklistsContainer.insertAdjacentHTML("beforeend", markup);
  }

  static renderAllBooks(lists) {
    lists.forEach((list) => {
      // console.log(UI.renderBook);
      UI.renderBook(list);
    });
  }
}

new App();
