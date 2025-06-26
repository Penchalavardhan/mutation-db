document.addEventListener("DOMContentLoaded", function () {
    let loginButton = document.getElementById("loginButton");

    if (loginButton) {
        loginButton.addEventListener("click", loginUser);
    }
});

function loginUser() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    console.log(username);
    console.log(password);

   if (username && password) {
        localStorage.setItem("loggedInUser", username);
        window.location.href = "search.html"; // Redirect to search page
    } else {
        document.getElementById("errorMessage").textContent = "Please enter username and password!";
    }

   // window.location.href = "search.html";
}

// Load dataset.json
let mutations = []; // Declare mutations globally

fetch("dataset.json")
    .then(response => response.json())
    .then(data => {
        mutations = data;
    })
    .catch(error => console.error("Error loading dataset:", error));

function searchData() {
    let query = document.getElementById("search").value.toLowerCase();

    if (!Array.isArray(mutations)) {
        console.error("Dataset not loaded yet.");
        return;
    }

    let results = mutations.filter(mutation =>
        Object.values(mutation).some(val =>
            typeof val === "string" && val.toLowerCase().includes(query)
        )
    );

    displayResults(results);
}


//Display results in a table
function displayResults(results) {
    let table = "<table border='1'><tr>";

    if (results.length > 0) {
        Object.keys(results[0]).forEach(key => table += `<th>${key}</th>`);
        table += "</tr>";
        results.forEach(row => {
            table += "<tr>";
            Object.values(row).forEach(val => table += `<td>${val}</td>`);
            table += "</tr>";
        });
    } else {
        table += "<tr><td colspan='100%'>No results found</td></tr>";
    }

    table += "</table>";
    document.getElementById("results").innerHTML = table;
}

