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
        // Ensure the input is treated as a string
        itemName = String(itemName);  
        if (!isValidItem(itemName)) {
            showFeedback('Please enter a valid task name', 'error');
        } else {
            addItem(itemName);
            itemInput.value = '';
            showFeedback('Task added successfully', 'success');
            updateIndexes();
        }
    });
        // Function to validate input
        function isValidItem(item) {
            return item.length > 0 && /^[a-zA-z\s]+$/i.test(item);
        }

    // Clear all items
    clearButton.addEventListener('click', () => {
        if (confirm("Are you sure you want to clear all items?")) {
            localStorage.clear();
            itemList.innerHTML = '';
            showFeedback('All items cleared', 'success');
        }
    });

    window.deleteItem = function(icon) {
        if (confirm("Are you sure you want to delete this item?")) {
            const item = icon.parentElement.parentElement;
            itemList.removeChild(item);
            updateLocalStorage(); // Make sure this function correctly updates the local storage after an item is removed
            updateIndexes();
            showFeedback('Item deleted', 'success');
        }
    };

    function loadItems() {
        const storedItems = JSON.parse(localStorage.getItem('todoItems'));
        if (storedItems) {
            storedItems.forEach(item => addItem(item.name, item.completed));
            updateIndexes();
        }
    }
    function addItem(name, completed = false) {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');

        const itemInfo = document.createElement('div');
        itemInfo.className = 'item-info';

        // Create and append the index element
        const itemIndex = document.createElement('span');
        itemIndex.className = 'item-index';

        const itemNameSpan = document.createElement('span');
        itemNameSpan.classList.add('item-name');
        if (completed) {
            itemNameSpan.classList.add('completed');
        }
        itemNameSpan.textContent = name;

        itemInfo.appendChild(itemIndex); // Initially leave this blank, will set in updateIndexes()
        itemInfo.appendChild(itemNameSpan);

        const iconsDiv = document.createElement('div');
        iconsDiv.className = 'item-icons';
        iconsDiv.innerHTML = `
            <i class="far fa-check-circle text-success complete-item" onclick="toggleComplete(this)"></i>
            <i class="far fa-edit text-secondary edit-item" onclick="editItem(this)"></i>
            <i class="far fa-times-circle text-danger delete-item" onclick="deleteItem(this)"></i>
        `;

        itemDiv.appendChild(itemInfo);
        itemDiv.appendChild(iconsDiv);
        itemList.appendChild(itemDiv);

        updateLocalStorage();
        updateIndexes();  // Update indexes whenever a new item is added
    }

    function updateIndexes() {
        const indexes = document.querySelectorAll('.item-index');
        indexes.forEach((index, i) => {
            index.textContent = (i-1) + 1;  // Correctly number each item
        });
    }

    window.editItem = function(icon) {
        const item = icon.parentElement.parentElement;
        const name = item.getElementsByClassName('item-name')[0].innerText;
        itemInput.value = name;
        itemList.removeChild(item);
        updateLocalStorage();
        updateIndexes();  // Update indexes after an item is removed for editing
        itemInput.focus();
        showFeedback('Edit the item and add again', 'info');
    };

    window.toggleComplete = function(icon) {
        const itemName = icon.closest('.item').querySelector('.item-name');
        const itemIndex= icon.closest('.item').querySelector('.item-index');
        icon.closest('.item').classList.toggle('completed');
        itemIndex.classList.toggle('completed');
        itemName.classList.toggle('completed');
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
