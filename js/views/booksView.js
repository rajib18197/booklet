class BooksView {
  #parentElement = document.querySelector(".books");

  render(data) {
    const markup = this._generateBooks(data);
    console.log(data);
    // console.log(markup);
    this.#parentElement.innerHTML = "";
    this.#parentElement.insertAdjacentHTML("beforeend", markup);
  }

  _generateBooks(books) {
    return `
    <div class="books__information" data-type=${books.type}>
      <div class="books__header">
        <h2 class="heading-secondary">${books.type}</h2>
        <p>Finished Books</p>
      </div>
      <div class="features">
        ${books.lists
          .map((book, i) => {
            return `
            <div class="feature-box" data-id=${book.id}>
            <!--+-+-+-+-+- Features Description +-+-+-+-+-+-->
            <div class="feature-box__description">
              <h2 class="heading-secondary feature-box__heading">
                ${book.bookName}
              </h2>
              <p class="feature-box__text">
                Our Team can help to create your own projects keeping it on time
                and in budget. Our Team can help to create your own projects
                keeping it on time. Our Team can help create your own projects
                keeping it on time and in budget.
              </p>
              <!--+-+-+-+- Messages of Peoples -+-+-+-+-+--->
              <div class="feature-box__peoples-messaging">
                <!--+-+-+-+- Person Photo 1 -+-+-+-+-+--->
                <figure class="feature-box__photo">
                  <figcaption class="feature-box__tag">
                    <span>@Total</span> of ${book.totalPages} pages
                  </figcaption>
                </figure>
                <!--+-+-+-+- Person Photo 2 -+-+-+-+-+--->
                <figure class="feature-box__photo">
                  <figcaption class="feature-box__tag">
                    <span>@Read</span> Of ${book.readPages} Pages till now.
                  </figcaption>
                </figure>

                <figure class="feature-box__photo">
                  <figcaption class="feature-box__tag">
                    <span>@Completed Percentage</span> ${book.percentage}%.
                  </figcaption>
                </figure>
              </div>
            </div>
            <!--+-+-+-+-+-+-+ Features Aside +-+-+-+-+-+-+--->
            <div class="feature-box__aside">
              <!--+-+-+-+- Message Box -+-+-+-+-+--->
              <div class="feature-box__talk">
                <p class="feature-box__remainder">Author Name: ${book.authorName}</p>
                <p class="feature-box__amount feature-box__amount--m">
                  $8300.00
                </p>
                <p class="feature-box__message">
                  I Have read this books ${book.finishedCount} times till now. It's a very knowlege
                  heavy book.
                </p>
                <p class="feature-box__sender">Regards, Davis</p>
              </div>

              <!--+-+-+-+- Amount Due Box -+-+-+-+-+--->
              <div class="feature-box__due">
                <p class="feature-box__due--amount">$8300.00</p>
                <p class="feature-box__date">Payment expected on 31/01/2021.</p>
              </div>
              <figure class="feature-box__photo">
                <figcaption class="feature-box__tag">
                  <span>@Status</span> ${book.status}
                </figcaption>
              </figure>
            </div>
          </div>
              `;
          })
          .join("")}
        </div>  
    </div>  
    <div class="btn-actions">
      <button class="btn btn--table">Table Lists</button>
      <button class="btn btn--clear">Clear All Books</button>
      <button class="btn btn--completed">Completed</button>
      <button class="btn btn--incompleted">InCompleted</button>
    </div>
      `;
  }
}

export default new BooksView();
