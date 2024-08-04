document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('itemForm');
    const itemInput = document.getElementById('itemInput');
    const itemList = document.querySelector('.item-list');
    const clearButton = document.getElementById('clear-list');
    const feedback = document.querySelector('.feedback');

    // Load existing items from localStorage
    loadItems();

    // Form submission to add a new item
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const itemName = itemInput.value.trim();
        if (itemName.length === 0) {
            showFeedback('Please enter a valid value', 'error');
        } else {
            addItem(itemName);
            itemInput.value = '';
            showFeedback('Item added successfully', 'success');
        }
    });

    // Clear all items
    clearButton.addEventListener('click', () => {
        if (confirm("Are you sure you want to clear all items?")) {
            localStorage.clear();
            itemList.innerHTML = '';
            showFeedback('All items cleared', 'success');
        }
    });

    function loadItems() {
        const storedItems = JSON.parse(localStorage.getItem('todoItems'));
        if (storedItems) {
            storedItems.forEach(item => addItem(item.name, item.completed));
        }
    }

    function addItem(name, completed = false) {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');
        if (completed) {
            itemDiv.classList.add('completed');
        }
        itemDiv.innerHTML = `
            <span class="item-name">${name}</span>
            <div class="item-icons">
                <i class="far fa-check-circle text-success complete-item" onclick="toggleComplete(this)"></i>
                <i class="far fa-edit text-secondary edit-item" onclick="editItem(this)"></i>
                <i class="far fa-times-circle text-danger delete-item" onclick="deleteItem(this)"></i>
            </div>
        `;
        itemList.appendChild(itemDiv);
        updateLocalStorage();
    }

    window.deleteItem = function(icon) {
        const item = icon.parentElement.parentElement;
        itemList.removeChild(item);
        updateLocalStorage();
        showFeedback('Item deleted', 'success');
    };

    window.editItem = function(icon) {
        const item = icon.parentElement.parentElement;
        const name = item.getElementsByClassName('item-name')[0].innerText;
        itemInput.value = name;
        itemList.removeChild(item);
        updateLocalStorage();
        itemInput.focus();
        showFeedback('Edit the item and add again', 'info');
    };

    window.toggleComplete = function(icon) {
        const item = icon.parentElement.parentElement;
        item.classList.toggle('completed');
        updateLocalStorage();
        showFeedback('Item completion toggled', 'success');
    };

    function updateLocalStorage() {
        const items = [];
        document.querySelectorAll('.item').forEach(item => {
            items.push({
                name: item.querySelector('.item-name').textContent,
                completed: item.classList.contains('completed')
            });
        });
        localStorage.setItem('todoItems', JSON.stringify(items));
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
});
