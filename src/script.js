import { createHeader } from "./components/createHeader.js";

const initApp = () => {
  const headerParent = document.querySelector(".header");
  const appElem = document.querySelector("#app");
  const headerObj = createHeader(headerParent);

  const returnIndex = (e) => {
    e.preventDefault();
    headerObj.updateHeaderTitle("Categories");
  };

  headerObj.headerLogoLink.addEventListener("click", returnIndex);

  headerObj.headerBtn.addEventListener("click", () => {
    headerObj.updateHeaderTitle("New category");
  });
};

initApp();
