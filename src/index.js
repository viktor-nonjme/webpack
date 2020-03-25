import "./pages/index.css";

import Api from "./modules/api";
import Card from "./modules/card";
import CardList from "./modules/cardList";
import { errors } from "./modules/errors";
import Owner from "./modules/owner";
import PopupAvatar from "./modules/popupAvatar";
import PopupEdit from "./modules/popupEdit";
import PopupImage from "./modules/popupImage";
import Root from "./modules/root";
import Spinner from "./modules/spinner";
import UserInfo from "./modules/userInfo";
import Validation from "./modules/validation";
import PopupPlace from "./modules/popupPlace";

//url сервера
const serverUrl =
  NODE_ENV === "development"
    ? "http://praktikum.tk/cohort8"
    : "https://praktikum.tk/cohort8";

//Апи
const api = new Api({
  url: serverUrl,
  headers: {
    authorization: "4ae09ffa-715b-4c73-a26a-12d26e6bab8e",
    "Content-Type": "application/json"
  }
});

const spinner = new Spinner(document.querySelector(".spinner"));

const owner = new Owner();

const userInfoDom = document.querySelector(".user-info");

const userInfo = new UserInfo(userInfoDom, api, owner);

const card = new Card(api, owner);

const validation = new Validation(errors.ru);

const cardList = new CardList(
  document.querySelector(".places-list"),
  card,
  api,
  spinner
);

const edit = new PopupEdit(
  document.querySelector(".popup_type_edit"),
  validation,
  userInfo,
  api
);

const place = new PopupPlace(
  document.querySelector(".popup_type_place"),
  validation,
  cardList,
  api
);

const avatar = new PopupAvatar(
  document.querySelector(".popup_type_avatar"),
  validation,
  userInfo,
  api
);

const image = new PopupImage(document.querySelector(".popup_type_image"));

userInfo.getUserInfo("/users/me");

cardList.render("/cards");

userInfoDom.addEventListener("click", event => {
  avatar.open(event);
  edit.open(event);
  place.open(event);
});

cardList.container.addEventListener("click", event => {
  card.like(event);
  card.remove(event);
});

avatar.form.addEventListener("input", event => {
  avatar.validation.validate(event);
});
avatar.form.addEventListener("submit", event => {
  avatar.submit("/users/me/avatar", event);
});

edit.form.addEventListener("input", event => {
  edit.validation.validate(event);
});
edit.form.addEventListener("submit", event => {
  edit.submit("/users/me", event);
});

place.form.addEventListener("input", event => {
  place.validation.validate(event);
});

place.form.addEventListener("submit", event => {
  place.submit("/cards", event);
});

const root = new Root(document.querySelector(".root"));

root.container.addEventListener("click", event => {
  image.open(event);
  image.close(event);
  avatar.close(event);
  place.close(event);
  edit.close(event);
});
