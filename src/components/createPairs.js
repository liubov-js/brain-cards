import { createElement } from "../helper/createElement.js";
import { shufflePairs } from "../helper/shufflePairs.js";
import { showAlert } from "./showAlert.js";

export class CreatePairs {
  #index = 1;

  constructor(app) {
    this.app = app;
    this.dataCards = [];

    this.pairs = createElement("section", {
      className: "card section-offset",
    });

    this.container = createElement("div", {
      className: "container card__container",
    });

    this.buttonReturn = createElement("button", {
      className: "card__return",
      ariaLabel: "Возврат к категориям",
    });

    this.buttonCard = createElement("button", {
      className: "card__item",
    });

    this.front = createElement("span", {
      className: "card__front",
      textContent: "1",
    });

    this.back = createElement("span", {
      className: "card__back",
      textContent: "2",
    });

    this.buttonCard.append(this.front, this.back);
    this.container.append(this.buttonReturn, this.buttonCard);
    this.pairs.append(this.container);

    this.flipCard = this.flipCard.bind(this);
  }

  flipCard() {
    this.buttonCard.classList.add("card__item_flipped");
    this.buttonCard.removeEventListener("click", this.flipCard);

    setTimeout(() => {
      this.buttonCard.classList.remove("card__item_flipped");

      setTimeout(() => {
        this.#index++;

        if (this.#index === this.dataCards.length) {
          this.front.textContent = "The end";
          showAlert("Вернемся к категориям", 2000);

          setTimeout(() => {
            this.buttonReturn.click();
          }, 2000);
          return;
        }

        this.front.textContent = this.dataCards[this.#index][0];
        this.back.textContent = this.dataCards[this.#index][1];
        setTimeout(() => {
          this.buttonCard.addEventListener("click", this.flipCard);
        }, 200);
      }, 100);
    }, 1000);
  }

  cardController(data) {
    this.dataCards = [...data];
    this.#index = 0;

    this.front.textContent = this.dataCards[this.#index][0];
    this.back.textContent = this.dataCards[this.#index][1];

    this.buttonCard.addEventListener("click", this.flipCard);
  }

  mount(data) {
    this.app.append(this.pairs);
    const shuffledPairs = shufflePairs(data.pairs);
    this.cardController(shuffledPairs);
  }

  unmount() {
    this.pairs.remove();
    this.buttonCard.removeEventListener("click", this.flipCard);
  }
}
