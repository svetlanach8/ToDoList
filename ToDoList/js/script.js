'use strict';

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

let toDoData;
let isError = false;

let createStorage = function () {
  localStorage.setItem('case', JSON.stringify(toDoData));
};

const render = function () {
  todoList.innerHTML = '';
  todoCompleted.innerHTML = '';
  toDoData.forEach(function (item) {
    const li = document.createElement('li');
    li.classList.add('todo-item');

    li.innerHTML = '<span class="text-todo">' + item.text + '</span>' +
      '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      '</div>';

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    };

    li.querySelector('.todo-complete').addEventListener('click', function () {
      item.completed = !item.completed;
      createStorage();
      render();
    });

    li.querySelector('.todo-remove').addEventListener('click', function (event) {
      let removeIndex = toDoData.findIndex(function (itemIndex) {
        return itemIndex == item;
      });
      toDoData.splice(removeIndex, 1);
      createStorage();
      render();
    });
  })
}

if (localStorage.getItem('case')) {
  toDoData = JSON.parse(localStorage.getItem('case'));
  render();
} else {
  toDoData = [];
}

todoControl.addEventListener('submit', function (event) {
  event.preventDefault();

  isError = false;

  if (headerInput.value === '') {
    isError = true;
  }

  if (!isError) {
    const newToDo = {
      text: headerInput.value,
      completed: false,
    }

    toDoData.push(newToDo);
    headerInput.value = '';
    render();
    createStorage();
  } else {
    alert('Заполните поле')
  }
})
