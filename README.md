# To-Do List Application

This is a simple to-do list application that allows users to add, edit, complete, and delete tasks. The tasks are stored in the browser's local storage, so they persist even after the page is refreshed.

## Features

- **Add Task**: Users can add new tasks to the list.
- **Edit Task**: Users can edit existing tasks.
- **Complete Task**: Users can mark tasks as complete. Completed tasks are displayed with a line-through and grey color.
- **Delete Task**: Users can delete tasks from the list.
- **Clear All Tasks**: Users can clear all tasks from the list.
- **Local Storage**: Tasks are stored in local storage, so they persist across browser sessions.

## How to Use

1. **Adding a Task**:
   - Type the task name in the input field.
   - Click the "Add Item" button or press Enter to add the task to the list.

2. **Editing a Task**:
   - Click the edit icon (pencil) next to the task you want to edit.
   - The task name will appear in the input field for editing.
   - Edit the task name and click the "Edit Item" button to save changes.

3. **Completing a Task**:
   - Click the complete icon (check-circle) next to the task you want to mark as complete.
   - The task name and index will be displayed with a line-through and grey color.
   - Click the complete icon again to mark the task as incomplete.

4. **Deleting a Task**:
   - Click the delete icon (times-circle) next to the task you want to delete.
   - Confirm the deletion in the popup dialog.

5. **Clearing All Tasks**:
   - Click the "Clear List" button to remove all tasks from the list.
   - Confirm the action in the popup dialog.

## Technical Details

- **HTML**: The structure of the application.
- **CSS**: Styling for the application, including styles for completed tasks.
- **JavaScript**: Handles adding, editing, completing, and deleting tasks. Manages storing tasks in local storage and updating the UI.

### Local Storage Functions

- **getItems**: Retrieves tasks from local storage.
- **saveItems**: Saves tasks to local storage.
- **clearItems**: Clears all tasks from local storage.

### JavaScript Functions

- **initializeApp**: Initializes the application and sets up event listeners.
- **handleFormSubmit**: Handles the form submission for adding or editing tasks.
- **handleClearButton**: Handles the clearing of all tasks.
- **deleteItem**: Deletes a specific task.
- **editItem**: Edits a specific task.
- **toggleComplete**: Toggles the completion status of a task.
- **loadItems**: Loads tasks from local storage.
- **addItem**: Adds a new task to the list.
- **updateIndexes**: Updates the index numbers for tasks.
- **updateLocalStorage**: Updates the tasks in local storage.
- **showFeedback**: Displays feedback messages to the user.
- **isValidItem**: Validates the task name input.

## Feedback

- Success and error messages are displayed to guide the user.