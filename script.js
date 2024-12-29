let todos = [
  {
    id: 1,
    title: "Html ni organish",
    isComplated: true,
  },
  {
    id: 2,
    title: "Css ni organish",
    isComplated: true,
  },
  {
    id: 3,
    title: "JS ni organish",
    isComplated: false,
  },
];

const list = document.querySelector(".todo-list");
const input = document.querySelector(".search-bar input");
const sendButton = document.querySelector("#send-button");
const darkModeToggle = document.querySelector("#dark-mode-toggle");

function renderTodos() {
  list.innerHTML = "";

  todos.forEach((t, index) => {
    list.innerHTML += `
      <li data-id="${t.id}">
        <input type="checkbox" ${
          t.isComplated ? "checked" : ""
        } onchange="toggleTodo(${index}, this)" />
        <span class="${t.isComplated ? "completed" : ""}">${t.title}</span>
        <input type="text" class="edit-input" value="${
          t.title
        }" style="display: none;" onkeydown="saveEdit(event, ${index})" />
        <div class="actions">
          <i class="fas fa-pen" onclick="editTodo(${index}, this)"></i>
          <i class="fas fa-trash" onclick="deleteTodo(${index})"></i>
        </div>
      </li>
    `;
  });
}

function toggleTodo(index, checkbox) {
  todos[index].isComplated = checkbox.checked;
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

function addTodo() {
  const title = input.value.trim();
  if (title) {
    todos.push({
      id: todos.length + 1,
      title,
      isComplated: false,
    });
    input.value = "";
    renderTodos();
  } else {
    alert("Please enter a valid todo!");
  }
}

function editTodo(index, editButton) {
  const todoItem = editButton.closest("li");
  const span = todoItem.querySelector("span");
  const editInput = todoItem.querySelector(".edit-input");

  span.style.display = "none";
  editInput.style.display = "inline-block";
  editInput.focus();
}

function saveEdit(event, index) {
  if (event.key === "Enter") {
    const newValue = event.target.value.trim();
    if (newValue) {
      todos[index].title = newValue;
      renderTodos();
    } else {
      alert("Todo text cannot be empty!");
    }
  }
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

sendButton.addEventListener("click", addTodo);
darkModeToggle.addEventListener("click", toggleDarkMode);

renderTodos();
