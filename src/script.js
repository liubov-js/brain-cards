import { fetchCategories } from "../service/api.service.js";
import { createCategory } from "./components/createCategory.js";
import { createHeader } from "./components/createHeader.js";
import { createElement } from "./helper/createElement.js";

const initApp = async () => {
  const headerParent = document.querySelector(".header");
  const appElem = document.querySelector("#app");
  const headerObj = createHeader(headerParent);
  const categoryObj = createCategory(appElem);

  const renderIndex = async (e) => {
    e?.preventDefault();
    const categories = await fetchCategories();

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
    categoryObj.unmount();
    headerObj.updateHeaderTitle("New category");
  });
};

initApp();
