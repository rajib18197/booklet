import booksView from "./views/booksView.js";
import typesView from "./views/typesView.js";
import BusinessLogic from "./model.js";

const form = document.querySelector(".form");
const btnRegister = document.querySelector(".btn--register");

class App extends BusinessLogic {
  constructor() {
    super();
    this._initialTypesViewRender();
    typesView.addHandlerClick(this._selectedTypes.bind(this));
    btnRegister.addEventListener("click", this._showForm);
    form.addEventListener("submit", this._newBook.bind(this));
  }

  _showForm() {
    form.classList.remove("hidden");
    this.style.display = "none";
  }

  _hideForm() {
    form.style.display = "none";

    btnRegister.style.display = "block";
    setTimeout(() => {
      form.style.display = "";
      form.classList.add("hidden");
    }, 1000);
  }

  _newBook(e) {
    e.preventDefault();

    this.createNewBook();

    // 1) Render the Type of books in the previews
    typesView.render(this.booksList);

    // 2) Render all Books of a specific type in the Table
    booksView.render(this.booksList[this.curBookTypeIndex]);
  }

  _selectedTypes(text) {
    const selectedBookTypeIndex = this.booksListTypeSelected(text);
    booksView.render(this.booksList[selectedBookTypeIndex]);
    typesView.render(this.booksList);
  }

  _initialTypesViewRender() {
    this.getBooksListDataFromLocalStorage();
    typesView.render(this.booksList);
  }
}

new App();
