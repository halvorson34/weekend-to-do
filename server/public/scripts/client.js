console.log("JS");

$(document).ready(function () {
  setupClickListeners();

  getTasks();

  clickTaskComplete();
});

function clickTaskComplete() {
  console.log("Task Complete Clicked");
  $(".taskList").on("click", ".js-btn-taskComplete", function (event) {
    console.log("In task complete button click");
    const taskUpdateId = event.target.dataset.id;
    console.log(`Task to complete id: ${taskUpdateId}`);
    const taskToBeCompleted = {
      taskCompleted: "Y",
    };
    updateCompleted(taskUpdateId, taskToBeCompleted);
  });
}

function setupClickListeners() {
  $(".js-btn-add").on("click", function () {
    console.log("in addButton on click");

    let taskToSend = {
      task: $(".todoInput").val(),
      complete: $(".completeInput").val(),
    };

    console.log(taskToSend);

    $.ajax({
      method: "POST",
      url: "/list",
      data: taskToSend,
    })
      .then(function (response) {
        console.log(response);
        getTasks();
      })
      .catch(function (response) {
        console.log(response);
      });

    $(".todoInput").val("");
    $(".completeInput").val("");

    saveTask(taskToSend);
  });
}

function getTasks() {
  console.log("in getTasks");

  $.ajax({
    method: "GET",
    url: "/list",
  })
    .then(function (response) {
      const taskToSend = response;
      console.log("array of tasks sent", taskToSend);
      renderTasks(taskToSend);
    })
    .catch(function (error) {
      console.log("Error in GET", error);
    });
}

function updateCompleted(id, taskData) {
  $.ajax({
    method: "PUT",
    url: `/list/${id}`,
    data: taskData,
  })
    .then((response) => {
      console.log("Update:", response);
      $(".js-btn-taskComplete").addClass("hide");
      getTasks();
    })
    .catch((err) => {
      console.log("Error in update:", err);
      alert("There was an error updating task complete");
    });
}

function saveTask(newTask) {
  console.log("In saveTask", newTask);
}

function renderTasks(taskArray) {
  $(".taskList").empty();

  for (let task of taskArray) {
    let taskCompleteButton = `<button class="js-btn-taskComplete" data-id="${task.id}">Complete</button>`;
    if (task.complete === true) {
      taskCompleteButton = `<button class="js-btn-taskComplete hide" data-id="${task.id}">Complete</button>`;
    }
    $(".taskList").append(`
        <tr>
            <td>${task.task}</td>
            <td>${task.complete}</td>
            <td>${taskCompleteButton}</td>
            <td><button class="js-btn-delete" data-id="${task.id}">Delete</button></td>
        </tr>
        `);
  }
}

function saveTask(newTask) {
  console.log("in saveTask", newTask);
}
