const inputbox = document.getElementById("task");
const listcontainer = document.getElementById("task-list");
const completedCounter = document.getElementById("completed-count");
const uncompletedCounter = document.getElementById("uncompleted-count");

function updateCounters() {
  const total = listcontainer.querySelectorAll("li").length;
  const completed = listcontainer.querySelectorAll("li.completed").length;
  completedCounter.textContent = completed;
  uncompletedCounter.textContent = total - completed;
}

function addtask() {
  const task = inputbox.value.trim();
  if (!task) {
    alert("Write your task");
    return;
  }

  const li = document.createElement("li");
  li.innerHTML = `
    <label>
      <input type="checkbox">
      <span class="task-text"></span>
    </label>
    <span class="edit-btn">Edit</span>
    <span class="delete-btn">Delete</span>
  `;
  
  li.querySelector(".task-text").textContent = task;
  listcontainer.appendChild(li);
  inputbox.value = "";

  const checkbox = li.querySelector("input[type='checkbox']");
  const editBtn = li.querySelector(".edit-btn");
  const deleteBtn = li.querySelector(".delete-btn");
  const taskSpan = li.querySelector(".task-text");

  checkbox.addEventListener("change", function () {
    li.classList.toggle("completed", checkbox.checked);
    updateCounters();
  });

  editBtn.addEventListener("click", function () {
    const update = prompt("Edit task", taskSpan.textContent);
    if (update !== null && update.trim() !== "") {
      taskSpan.textContent = update.trim();
      li.classList.remove("completed");
      checkbox.checked = false;
      updateCounters();
    }
  });

  deleteBtn.addEventListener("click", function () {
    if (confirm("Are you sure you want to delete this task?")) {
      li.remove();
      updateCounters();
    }
  });

  updateCounters();
}


inputbox.addEventListener("keydown", function (e) {
  if (e.key === "Enter") addtask();
});

updateCounters();