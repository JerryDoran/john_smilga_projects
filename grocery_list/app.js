const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

let editElement;
let editFlag = false;
let editId = '';

// functions
const displayAlert = (text, action) => {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);

  // remove alert
  setTimeout(() => {
    alert.textContent = '';
    alert.classList.remove(`alert-${action}`);
  }, 1000);
};

// local storage
const addToLocalStorage = (id, value) => {
  const grocery = {
    id,
    value
  };
  let items = getGroceryListFromLocalStorage();
  console.log(items);
  items.push(grocery);
  localStorage.setItem('groceryList', JSON.stringify(items));
};

const removeFromLocalStorage = (id) => {
  let items = getGroceryListFromLocalStorage();

  items = items.filter((item) => item.id !== id);

  localStorage.setItem('groceryList', JSON.stringify(items));
};

const editLocalStorage = (id, value) => {
  let items = getGroceryListFromLocalStorage();
  items = items.map((item) => {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  });
  localStorage.setItem('groceryList', JSON.stringify(items));
};

const getGroceryListFromLocalStorage = () => {
  return localStorage.getItem('groceryList')
    ? JSON.parse(localStorage.getItem('groceryList'))
    : [];
};

const setBackToDefault = () => {
  grocery.value = '';
  editFlag = false;
  editId = '';
  submitBtn.textContent = 'add';
};

const clearItems = () => {
  const items = Array.from(document.querySelectorAll('.grocery-item'));

  if (items.length) {
    items.forEach((item) => list.removeChild(item));
  }
  container.classList.remove('show-container');
  displayAlert('empty list', 'success');
  setBackToDefault();
  localStorage.removeItem('groceryList');
};

const deleteItem = (e) => {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  list.removeChild(element);
  if (list.children.length === 0) {
    container.classList.remove('show-container');
  }
  displayAlert('item removed', 'success');
  setBackToDefault();
  removeFromLocalStorage(id);
};

const editItem = (e) => {
  const element = e.currentTarget.parentElement.parentElement;
  editElement = e.currentTarget.parentElement.previousElementSibling;
  grocery.value = editElement.innerHTML;
  editFlag = true;
  editId = element.dataset.id;
  submitBtn.textContent = 'edit';
};

const addItem = (e) => {
  e.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime().toString();
  createListItem(id, value);
  if (value && !editFlag) {
    // display alert
    displayAlert('item added to the list', 'success');

    // show container
    container.classList.add('show-container');

    // add to local storage
    addToLocalStorage(id, value);

    setBackToDefault();
  } else if (value && editFlag) {
    editElement.innerHTML = value;
    displayAlert('value changed', 'success');
    editLocalStorage(editId, value);
    setBackToDefault();
  } else {
    displayAlert('please enter value', 'danger');
  }
};

const createListItem = (id, value) => {
  const element = document.createElement('article');
  element.classList.add('grocery-item');
  const attr = document.createAttribute('data-id');
  attr.value = id;
  element.setAttributeNode(attr);
  element.innerHTML = `
    <p class="title">${value}</p>
    <div class="btn-container">
      <button type="button" class="edit-btn">
        <i class="fas fa-edit"></i>
      </button>
      <button type="button" class="delete-btn">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  `;
  const deleteBtn = element.querySelector('.delete-btn');
  const editBtn = element.querySelector('.edit-btn');

  deleteBtn.addEventListener('click', deleteItem);
  editBtn.addEventListener('click', editItem);
  // append child
  list.appendChild(element);
};

const setupItems = () => {
  let items = getGroceryListFromLocalStorage();
  if (items.length > 0) {
    items.forEach((item) => {
      createListItem(item.id, item.value);
    });
  }
  container.classList.add('show-container');
};

form.addEventListener('submit', addItem);
clearBtn.addEventListener('click', clearItems);

window.addEventListener('DOMContentLoaded', setupItems);
