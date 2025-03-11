import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/todo.js"
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const todosList = document.querySelector(".todos__list");

const addTodoPopup = new PopupWithForm({ 
  popupSelector: "#add-todo-popup", 
  handleFormSubmit: () => {}
});

addTodoPopup.setEventListeners();

// The logic in this function should all be handled in the Todo class.
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  const todoElement = todo.getView();
  return todoElement;
};

const section = new Section ({
  items: initialTodos,
  renderer: (item) => {
    const todo = generateTodo(item);
    todosList.append(todo)
  },
  containerSelector: ".todos__list"
});

section.renderItems();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  // Create a date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const id = uuidv4();
  const values = { name, date, id };
  const todoElement = generateTodo(values);
  section.addItem(todoElement); 
  addTodoPopup.close();
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();