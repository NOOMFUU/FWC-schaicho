$(document).ready(function () {
    loadTodos();
});

function createNewTask() {
    const todoText = prompt("Enter a new TO DO:");
    if (todoText && todoText.trim() !== "") {
        addTodo(todoText.trim());
        saveTodos();
    }
}

function addTodo(text) {
    const $todoDiv = $("<div></div>");

    const $textSpan = $("<span></span>").text(text).addClass("task-text");

    const $closeBtn = $("<span></span>").html("&times;").addClass("close-btn");

    $closeBtn.click(function () {
        $todoDiv.remove();
        saveTodos();
    });

    $todoDiv.append($textSpan);
    $todoDiv.append($closeBtn);

    $("#ft_list").prepend($todoDiv);
}

function saveTodos() {
    const todos = [];
    $("#ft_list").children("div").each(function () {
        const taskText = $(this).find(".task-text").text();
        todos.push(taskText);
    });

    const todosString = encodeURIComponent(JSON.stringify(todos));
    document.cookie = `todoList=${todosString}; path=/`;
}

function loadTodos() {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();

        if (cookie.startsWith("todoList=")) {
            const todosData = cookie.substring("todoList=".length);

            if (todosData) {
                try {
                    const todos = JSON.parse(decodeURIComponent(todosData));

                    for (let j = todos.length - 1; j >= 0; j--) {
                        addTodo(todos[j]);
                    }
                } catch (e) {
                    console.error("Error parsing cookies:", e);
                }
            }
            break;
        }
    }
}
