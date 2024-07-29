
//================================= form with table using array of objects===================//
var form = document.querySelector('form');
var tbody = document.querySelector('tbody');
var users = [];

form.onsubmit = function(e) {
    e.preventDefault(); // Stops the form from submitting normally
    var user = {
        name: e.target.elements[0].value,
        password: e.target.elements[1].value
    };
    users.push(user);
    updateTable();
};

function updateTable() {
    var data = "";
    for(var i = 0; i < users.length; i++){
        data += `
            <tr> 
                <td>${users[i].name}</td>
                <td>${users[i].password}</td>
            </tr>`;
    }
    tbody.innerHTML = data; // Update the table content
}



