class TypesView {
  #parentElement = document.querySelector(".previews");

  render(data) {
    const markup = this._generateTypes(data);
    console.log(data);
    this.#parentElement.innerHTML = "";
    this.#parentElement.insertAdjacentHTML("beforeend", markup);
  }

  addHandlerClick(handler) {
    this.#parentElement.addEventListener("click", function (e) {
      const target = e.target.closest(".preview-type");
      console.log(target);

      if (!target) return;

      const targetElText = target.dataset.booksType;
      console.log(targetElText);
      handler(targetElText);
    });
  }

  _generateTypes(booksList) {
    const html = booksList
      .map((list, index) => {
        console.log(list);
        // console.log(list.lists[index].percentage);
        const totalPerc =
          list.lists.reduce((acc, cur) => {
            console.log(acc);
            return acc + cur.percentage;
          }, 0) / list.lists.length;
        console.log(totalPerc);
        const totalPrice = list.lists.reduce((acc, cur) => acc + cur.price, 0);
        return `
				<li class="preview-type preview--${list.type} ${
          list.selected ? `preview-type__${list.type}` : ""
        }" data-books-type=${list.type}>
					<h2 class="preview-type__title">Focusing heavily on ${list.type}</h2>
					<div class="preview-type__details">
						<span class="preview-type__icon">⚡️</span>
						<span class="preview-type__value">${list.lists.length}</span>
						<span class="preview-type__unit">NB</span>
					</div>
					<div class="preview-type__details">
						<span class="preview-type__icon">৳</span>
						<span class="preview-type__value">${totalPrice}</span>
						<span class="preview-type__unit">BDT</span>
					</div>
					<div class="preview-type__details">
						<span class="preview-type__icon">✔️</span>
						<span class="preview-type__value">${totalPerc.toFixed(2)}%</span>
						<span class="preview-type__unit">PER/NB</span>
					</div>
					<div class="preview-type__details">
						<span class="preview-type__icon">✔️</span>
						<span class="preview-type__value">78%</span>
						<span class="preview-type__unit">HY</span>
					</div>
				</li>
			`;
      })
      .join("");

    return html;
  }
}

export default new TypesView();
