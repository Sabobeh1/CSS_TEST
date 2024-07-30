
//================================= form with table using array of objects using map and array methods===================//
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
    let sh= users.map(function(user){
       return `
       <tr> 
             <td>${user.name}</td>
             <td>${user.password}</td>
        </tr>`;
    }).join('')
    tbody.innerHTML = sh; // Update the table content
}
