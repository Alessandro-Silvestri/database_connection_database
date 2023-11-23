function fetchAndDisplayUsers() {
    fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then(data => {
            console.log(data); // Log the received data directly
            displayUsers(data); // Call the displayUsers function to render the data on the page
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function displayUsers(users) {
    const userDataDiv = document.getElementById('userData');
    userDataDiv.innerHTML = ''; // Clear previous data

    const userList = document.createElement('ul');
    
    // Iterate through each user and create list items to display their data
    users.forEach(user => {
        const listItem = document.createElement('li');
        listItem.textContent = `ID: ${user.id}, Username: ${user.username}, Email: ${user.email}`;
        userList.appendChild(listItem);
    });

    // Append the list of users to the userDataDiv
    userDataDiv.appendChild(userList);
}
