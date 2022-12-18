const form = document.querySelector(".form");
const inputType = document.querySelector(".form__input--type");
const inputBookName = document.querySelector(".form__input--bookname");
const inputPages = document.querySelector(".form__input--pages");
const inputAuthor = document.querySelector(".form__input--author");
const inputCount = document.querySelector(".form__input--finishedCount");
const inputPrice = document.querySelector(".form__input--price");
const inputStatus = document.querySelectorAll(".form__radio-input");

///////////////////////////////////////////////////////////////////////
/////////// Books Information Data
class Book {
  date = new Date();
  id = (Date.now() + "").slice(-10);
  // prettier-ignore
  constructor(bookName, authorName,totalPages,readPages,finishedCount,price,status) {
    this.bookName = bookName;
    this.authorName = authorName;
    this.totalPages = totalPages;
    this.readPages = readPages;
    this.finishedCount = finishedCount;
    this.price = price;
    this.status = status;
    this.calcParcentage();
  }

  calcParcentage() {
    this.percentage = +((this.readPages / this.totalPages) * 100).toFixed(2);
    return this.percentage;
  }
}

class Programming extends Book {
  type = "programming";
  // prettier-ignore
  constructor(bookName, authorName,totalPages,readPages,finishedCount,price,status){
    super(bookName, authorName,totalPages,readPages,finishedCount,price,status);
  }
}

class SelfHelp extends Book {
  type = "self-help";
  // prettier-ignore
  constructor(bookName, authorName,totalPages,readPages,finishedCount,price,status){
    super(bookName, authorName,totalPages,readPages,finishedCount,price,status);
  }
}

class Mathematics extends Book {
  type = "Mathematics";
  // prettier-ignore
  constructor(bookName, authorName,totalPages,readPages,finishedCount,price,status){
    super(bookName, authorName,totalPages,readPages,finishedCount,price,status);
  }
}

///////////////////////////////////////////////////////////////////////
///////////////// Application Data and business Logic which manipulates the data;

export default class BusinessLogic {
  // [{type: 'Programming', done: false, lists: [{type: 'Self-Help', bookName: 'You can win', authorName: 'Shiv khera', totalPages: 150, readPages: 32, finishedCoun: 1, status: 'In-Progress'}]}]
  booksList = [];
  // Current Book Type Index which is currently shows on the UI.
  curBookTypeIndex = 0;

  // constructor() {}

  _getInputData() {
    const bookType = inputType.value;
    const bookName = inputBookName.value;
    const authorName = inputAuthor.value;
    const totalPages = +inputPages.value.split("/")[0];
    const readPages = +inputPages.value.split("/")[1];
    const finishedCount = +inputCount.value;
    const price = +inputPrice.value;
    const status = [...inputStatus].filter((radioBtn) => radioBtn.checked)[0]
      .value;

    // prettier-ignore
    return {bookType, bookName, authorName, totalPages, readPages, finishedCount, price, status}
  }

  createNewBook() {
    // 1) Get Input Data
    // prettier-ignore
    const {bookType, bookName, authorName, totalPages, readPages, finishedCount, price, status} = this._getInputData();

    // 2) Create A New Book
    let newBook;
    if (bookType === "Programming") {
      // prettier-ignore
      newBook = new Programming(bookName,authorName,totalPages,readPages,finishedCount,price,status);
    }

    if (bookType === "Self-Help") {
      // prettier-ignore
      newBook = new SelfHelp(bookName,authorName,totalPages,readPages,finishedCount,price,status);
    }

    if (bookType === "Mathematics") {
      // prettier-ignore
      newBook = new Mathematics(bookName,authorName,totalPages,readPages,finishedCount,price,status);
    }

    console.log(newBook);

    // 3) when user add a new book, whether that book [type] is already exist in the [bookslist] array or Not
    const hasBookTypeExist = this.booksList.findIndex((el, i) => {
      return el.type.toLowerCase() === newBook.type.toLowerCase();
    });

    console.log(hasBookTypeExist);
    console.log(this.curBookTypeIndex);

    let bookInfo;

    // 4) If currently input [new Book type] already existed in the [booksList Array] then just add a [new book] to the [lists array] and don't create a new [type] object in the array.
    if (hasBookTypeExist !== -1) {
      this.booksList[hasBookTypeExist].lists.push(newBook);
      this._booksListUnselected(this.booksList);
      this.booksList[hasBookTypeExist].selected = true;
      this.curBookTypeIndex = hasBookTypeExist;
    }

    // 5) If currently input [new Book type] does not exist in the [booksList Array] then create a new [type] object in the array with bookInfo data.
    if (hasBookTypeExist === -1) {
      this._booksListUnselected(this.booksList);

      bookInfo = { type: bookType, selected: true, lists: [newBook] };
      this.booksList.push(bookInfo);
      this.curBookTypeIndex = this.booksList.length - 1;
    }

    console.log(this.booksList[this.curBookTypeIndex]);
    console.log(this.booksList);

    form.reset();
    this._hideForm();
    this._persistBooksListData();
  }

  booksListTypeSelected(text) {
    const selectedBookTypeIndex = this.booksList.findIndex((books) => {
      const check = books.type.toLowerCase() === text.toLowerCase();
      console.log(check);
      return check;
    });
    console.log(selectedBookTypeIndex);

    this._booksListUnselected(this.booksList);
    this.booksList[selectedBookTypeIndex].selected = true;
    return selectedBookTypeIndex;
  }

  _booksListUnselected(lists) {
    lists.forEach((list) => {
      list.selected = false;
    });
  }

  _persistBooksListData() {
    localStorage.setItem("booksList", JSON.stringify(this.booksList));
  }

  getBooksListDataFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem("booksList"));
    console.log(data);

    if (!data) return;

    this.booksList = data;
    this._booksListUnselected(this.booksList);
  }
}
