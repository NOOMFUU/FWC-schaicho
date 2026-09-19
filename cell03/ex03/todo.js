window.onload = function() {
    loadTodos();
};

function createNewTask() {
    const todoText = prompt("Enter a new TO DO:");
    if (todoText && todoText.trim() !== "") {
        addTodo(todoText.trim());
        saveTodos(); 
    }
}

function addTodo(text) {
    const ft_list = document.getElementById("ft_list");
    const todoDiv = document.createElement("div");

    const textSpan = document.createElement("span");
    textSpan.textContent = text;
    textSpan.className = "task-text"; 

    const closeBtn = document.createElement("span");
    closeBtn.innerHTML = "&times;";
    closeBtn.className = "close-btn";

    closeBtn.onclick = function () {
        todoDiv.remove(); 
        saveTodos(); 
    };

    todoDiv.appendChild(textSpan);
    todoDiv.appendChild(closeBtn);

    ft_list.insertBefore(todoDiv, ft_list.firstChild);
}

function saveTodos() {
    const todos = [];
    const ft_list = document.getElementById("ft_list");
    const todoDivs = ft_list.children;
    
    for (let i = 0; i < todoDivs.length; i++) {
        const taskText = todoDivs[i].querySelector(".task-text").textContent;
        todos.push(taskText);
    }

    const todosString = encodeURIComponent(JSON.stringify(todos));
    
    const date = new Date();
    date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
    document.cookie = `todoList=${todosString}; expires=${date.toUTCString()}; path=/`;
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