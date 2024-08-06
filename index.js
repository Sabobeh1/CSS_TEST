    const form = document.getElementById('itemForm');
    const itemInput = document.getElementById('itemInput');
    const itemList = document.querySelector('.item-list');
    const clearButton = document.getElementById('clear-list');
    const feedback = document.querySelector('.feedback');

    // Array to hold tasks
    let tasks = [];

    // Load existing items from localStorage
    loadItems();

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let itemName = itemInput.value.trim();
        const addButton = document.getElementById('add-item');

        // Ensure the input is treated as a string
        itemName = String(itemName);  
        if (!isValidItem(itemName)) {
            showFeedback('Please enter a valid task name', 'error');
        } else {
            addTask(itemName, false);
            itemInput.value = '';
            showFeedback('Task added successfully', 'success');
            updateIndexes();
            addButton.textContent = 'Add Item';
        }
    });

    clearButton.addEventListener('click', () => {
        if (confirm("Are you sure you want to clear all items?")) {
            clearItems();
            showFeedback('All items cleared', 'success');
        }
    });

    function addTask(name, completed) {
        const task = { name, completed, index: tasks.length };
        tasks.push(task);
        updateLocalStorage();
        renderTasks();
    }

    function editTask(index) {
        const task = tasks[index];
        itemInput.value = task.name;
        tasks.splice(index, 1);
        updateLocalStorage();
        renderTasks();
        itemInput.focus();
        const addButton = document.getElementById('add-item');
        addButton.textContent = 'Edit Item';
        showFeedback('Edit the item and add again', 'info');
    }

    function deleteTask(index) {
        if (confirm("Are you sure you want to delete this item?")) {
            tasks.splice(index, 1);
            updateLocalStorage();
            renderTasks();
            showFeedback('Item deleted', 'success');
        }
    }

    function toggleComplete(index) {
        const task = tasks[index];
        task.completed = !task.completed;
        updateLocalStorage();
        renderTasks();
        showFeedback('Item completion toggled', 'success');
    }

    function loadItems() {
        const storedItems = JSON.parse(localStorage.getItem('todoItems'));
        if (storedItems) {
            tasks = storedItems;
            renderTasks();
        }
    }

    function clearItems() {
        tasks = [];
        updateLocalStorage();
        renderTasks();
    }

    function renderTasks() {
        itemList.innerHTML = '';
        tasks.forEach((task, index) => {
            addItem(task.name, task.completed, index);
        });
    }

    function addItem(name, completed, index) {
        const itemDivClass = completed ? 'item completed' : 'item';
        const itemIndexClass = completed ? 'item-index completed' : 'item-index';
        const itemNameClass = completed ? 'item-name completed' : 'item-name';

        const itemHTML = `
            <div class="${itemDivClass}">
                <div class="item-info">
                    <span class="${itemIndexClass}">${index}</span>
                    <span class="${itemNameClass}">${name}</span>
                </div>
                <div class="item-icons">
                    <i class="far fa-check-circle text-success complete-item"></i>
                    <i class="far fa-edit text-secondary edit-item"></i>
                    <i class="far fa-times-circle text-danger delete-item"></i>
                </div>
            </div>
        `;

        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = itemHTML;
        const newItem = itemDiv.firstElementChild;

        // Adding event listeners to the icons
        const completeIcon = newItem.querySelector('.complete-item');
        completeIcon.onclick = function() { toggleComplete(index); };

        const editIcon = newItem.querySelector('.edit-item');
        editIcon.onclick = function() { editTask(index); };

        const deleteIcon = newItem.querySelector('.delete-item');
        deleteIcon.onclick = function() { deleteTask(index); };

        itemList.appendChild(newItem);
    }

    function updateIndexes() {
        tasks.forEach((task, i) => {
            task.index = i;
        });
    }

    function updateLocalStorage() {
        localStorage.setItem('todoItems', JSON.stringify(tasks));
    }

    function showFeedback(message, type) {
        feedback.textContent = message;
        feedback.style.display = 'block';
        feedback.className = 'feedback'; // Reset class
        if (type === 'success') {
            feedback.style.backgroundColor = '#d4edda';
            feedback.style.color = '#155724';
            feedback.style.border = '1px solid #c3e6cb';
        } else if (type === 'error') {
            feedback.style.backgroundColor = '#f8d7da';
            feedback.style.color = '#721c24';
            feedback.style.border = '1px solid #f5c6cb';
        } else {
            feedback.style.backgroundColor = '#bee5eb';
            feedback.style.color = '#0c5460';
            feedback.style.border = '1px solid #abdde5';
        }
        setTimeout(() => feedback.style.display = 'none', 3000);
    }

    function isValidItem(item) {
        return item.length > 0 && /^[a-zA-Z]+[a-zA-Z0-9\s]*$/i.test(item);
    }

