document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoDate = document.getElementById('todo-date');
    const todoList = document.getElementById('todo-list');

    // ページが読み込まれたときにローカルストレージからタスクを読み込む
    loadTodos();

    todoForm.addEventListener('submit', function (e) {
        e.preventDefault();
        addTodo();
    });

    function addTodo() {
        const todoText = todoInput.value.trim();
        const todoDateValue = todoDate.value;

        if (todoText !== '' && todoDateValue !== '') {
            const todo = {
                text: todoText,
                date: todoDateValue,
                completed: false
            };
            saveTodoToLocal(todo);
            renderTodo(todo);
            todoInput.value = '';
            todoDate.value = '';
        }
    }

    function renderTodo(todo) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${todo.text} - ${todo.date}</span>
            <button class="delete-btn">Delete</button>
        `;
        if (todo.completed) {
            li.classList.add('completed');
        }
        todoList.appendChild(li);

        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', function () {
            todoList.removeChild(li);
            removeTodoFromLocal(todo);
        });

        li.addEventListener('click', function () {
            li.classList.toggle('completed');
            todo.completed = !todo.completed;
            updateTodoInLocal(todo);
        });
    }

    function saveTodoToLocal(todo) {
        let todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function loadTodos() {
        let todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.forEach(todo => renderTodo(todo));
    }

    function removeTodoFromLocal(todo) {
        let todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos = todos.filter(t => t.text !== todo.text || t.date !== todo.date);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function updateTodoInLocal(todo) {
        let todos = JSON.parse(localStorage.getItem('todos')) || [];
        const index = todos.findIndex(t => t.text === todo.text && t.date === todo.date);
        if (index !== -1) {
            todos[index] = todo;
            localStorage.setItem('todos', JSON.stringify(todos));
        }
    }
});
