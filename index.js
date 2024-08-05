// Storage functions
function getItems() {
    const storedItems = localStorage.getItem('todoItems');
    return storedItems ? JSON.parse(storedItems) : [];
}

function saveItems(items) {
    localStorage.setItem('todoItems', JSON.stringify(items));
}

function clearItems() {
    localStorage.removeItem('todoItems');
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('itemForm');
    const itemInput = document.getElementById('itemInput');
    const itemList = document.querySelector('.item-list');
    const clearButton = document.getElementById('clear-list');
    const feedback = document.querySelector('.feedback');

    // Load existing items from localStorage
    loadItems();

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let itemName = itemInput.value.trim();
        const addButton = document.getElementById('add-item');

        itemName = String(itemName);  
        if (!isValidItem(itemName)) {
            showFeedback('Please enter a valid task name', 'error');
        } else {
            addItem(itemName, false);
            itemInput.value = '';
            showFeedback('Task added successfully', 'success');
            updateIndexes();
            addButton.textContent = 'Add Item';
        }
    });

    clearButton.addEventListener('click', () => {
        if (confirm("Are you sure you want to clear all items?")) {
            clearItems();
            itemList.innerHTML = '';
            showFeedback('All items cleared', 'success');
        }
    });

    function deleteItem(icon) {
        if (confirm("Are you sure you want to delete this item?")) {
            const item = icon.parentElement.parentElement;
            itemList.removeChild(item);
            updateLocalStorage();
            updateIndexes();
            showFeedback('Item deleted', 'success');
        }
    }

    function editItem(icon) {
        const item = icon.parentElement.parentElement;
        const name = item.querySelector('.item-name').innerText;
        itemInput.value = name;
        itemList.removeChild(item);
        updateLocalStorage();
        updateIndexes();
        itemInput.focus();
        const addButton = document.getElementById('add-item');
        addButton.textContent = 'Edit Item';
        showFeedback('Edit the item and add again', 'info');
    }

    function toggleComplete(icon) {
        const item = icon.parentElement.parentElement;
        const itemName = item.querySelector('.item-name');
        const itemIndex = item.querySelector('.item-index');

        item.classList.toggle('completed');
        itemName.classList.toggle('completed');
        itemIndex.classList.toggle('completed');

        updateLocalStorage();
        showFeedback('Item completion toggled', 'success');
    }

    function loadItems() {
        const storedItems = getItems();
        storedItems.forEach(item => addItem(item.name, item.completed, item.index));
        updateIndexes();
    }

    function addItem(name, completed, index) {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');

        if (completed) {
            itemDiv.classList.add('completed');
        }

        const itemInfo = document.createElement('div');
        itemInfo.className = 'item-info';

        const itemIndex = document.createElement('span');
        itemIndex.className = 'item-index';
        if (completed) {
            itemIndex.classList.add('completed');
        }
        itemIndex.textContent = index !== undefined ? index : itemList.children.length + 1;

        const itemNameSpan = document.createElement('span');
        itemNameSpan.classList.add('item-name');
        if (completed) {
            itemNameSpan.classList.add('completed');
        }
        itemNameSpan.textContent = name;

        itemInfo.appendChild(itemIndex);
        itemInfo.appendChild(itemNameSpan);

        const iconsDiv = document.createElement('div');
        iconsDiv.className = 'item-icons';

        const completeIcon = document.createElement('i');
        completeIcon.className = 'far fa-check-circle text-success complete-item';
        completeIcon.onclick = function() { toggleComplete(completeIcon); };

        const editIcon = document.createElement('i');
        editIcon.className = 'far fa-edit text-secondary edit-item';
        editIcon.onclick = function() { editItem(editIcon); };

        const deleteIcon = document.createElement('i');
        deleteIcon.className = 'far fa-times-circle text-danger delete-item';
        deleteIcon.onclick = function() { deleteItem(deleteIcon); };

        iconsDiv.appendChild(completeIcon);
        iconsDiv.appendChild(editIcon);
        iconsDiv.appendChild(deleteIcon);

        itemDiv.appendChild(itemInfo);
        itemDiv.appendChild(iconsDiv);
        itemList.appendChild(itemDiv);

        updateLocalStorage();
        updateIndexes();
    }

    function updateIndexes() {
        const indexes = document.querySelectorAll('.item-index');
        Array.from(indexes).map((index, i) => {
            index.textContent =(i-1) + 1;
        });
    }

    function updateLocalStorage() {
        const items = Array.from(document.querySelectorAll('.item')).map((item, index) => {
            const name = item.querySelector('.item-name').textContent;
            const completed = item.classList.contains('completed');
            return { name, completed, index: index + 1 };
        });
        saveItems(items);
    }

    function showFeedback(message, type) {
        feedback.textContent = message;
        feedback.style.display = 'block';
        feedback.className = 'feedback';
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
});
