import {
  fetchCards,
  fetchCategories,
  fetchEditCategory,
  fetchCreateCategory,
  fetchDeleteCategory,
} from "../service/api.service.js";
import { createCategory } from "./components/createCategory.js";
import { createEditCategory } from "./components/createEditCategory.js";
import { createHeader } from "./components/createHeader.js";
import { CreatePairs } from "./components/createPairs.js";
import { showAlert } from "./components/showAlert.js";
import { createElement } from "./helper/createElement.js";

const initApp = async () => {
  const headerParent = document.querySelector(".header");
  const appElem = document.querySelector("#app");
  const headerObj = createHeader(headerParent);
  const categoryObj = createCategory(appElem);
  const editCategoryObj = createEditCategory(app);
  const pairsObj = new CreatePairs(app);

  const allSectionUnmount = () => {
    [categoryObj, editCategoryObj, pairsObj].forEach((obj) => obj.unmount());
  };

  const postHandker = async () => {
    const data = editCategoryObj.parseData();
    const dataCategories = await fetchCreateCategory(data);

    if (dataCategories.error) {
      showAlert(dataCategories.error.message);
      return;
    }

    showAlert(`Новая категория ${data.title} была добавлена`);
    allSectionUnmount();
    headerObj.updateHeaderTitle("Категории");
    categoryObj.mount(dataCategories);
  };

  const patchHandker = async () => {
    const data = editCategoryObj.parseData();
    const dataCategories = await fetchEditCategory(
      editCategoryObj.btnSave.dataset.id,
      data
    );

    if (dataCategories.error) {
      showAlert(dataCategories.error.message);
      return;
    }

    showAlert(`Категория ${data.title} обновлена`);
    allSectionUnmount();
    headerObj.updateHeaderTitle("Категории");
    categoryObj.mount(dataCategories);
  };

  const renderIndex = async (e) => {
    e?.preventDefault();
    allSectionUnmount();
    const categories = await fetchCategories();
    headerObj.updateHeaderTitle("Категории");

    if (categories.error) {
      const errorText = createElement("p", {
        className: "server-error",
        textContent: "Server error, please try again later",
      });
      appElem.append(errorText);
      return;
    }

    categoryObj.mount(categories);
  };

  renderIndex();

  headerObj.headerLogoLink.addEventListener("click", renderIndex);

  headerObj.headerBtn.addEventListener("click", () => {
    allSectionUnmount();
    headerObj.updateHeaderTitle("Новая категория");
    editCategoryObj.btnSave.addEventListener("click", postHandker);
    editCategoryObj.btnSave.removeEventListener("click", patchHandker);
    editCategoryObj.mount();
  });

  categoryObj.categoryList.addEventListener("click", async ({ target }) => {
    const categoryItem = target.closest(".category__item");

    if (target.closest(".category__edit")) {
      const dataCards = await fetchCards(categoryItem.dataset.id);
      allSectionUnmount();
      headerObj.updateHeaderTitle("Редактирование");
      editCategoryObj.mount(dataCards);
      editCategoryObj.btnSave.addEventListener("click", patchHandker);
      editCategoryObj.btnSave.removeEventListener("click", postHandker);
      return;
    }

    if (target.closest(".category__del")) {
      if (confirm("Вы уверены, что хотите удалить категорию?")) {
        const result = await fetchDeleteCategory(categoryItem.dataset.id);

        if (result.error) {
          showAlert(result.error.message);
        }

        showAlert("Категория удалена");
        categoryItem.remove();
      }
      return;
    }

    if (categoryItem) {
      const dataCards = await fetchCards(categoryItem.dataset.id);
      allSectionUnmount();
      headerObj.updateHeaderTitle(dataCards.title);
      pairsObj.mount(dataCards);
    }
  });

  pairsObj.buttonReturn.addEventListener("click", renderIndex);
};

initApp();
