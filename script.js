// Ensure Firebase is properly initialized
const firebaseConfig = {
    apiKey: "AIzaSyDLhmv78bYAFvR7vI5aTncPhQoCGx9dDbU",
    authDomain: "student-records-1a789.firebaseapp.com",
    databaseURL: "https://student-records-1a789-default-rtdb.firebaseio.com",
    projectId: "student-records-1a789",
    storageBucket: "student-records-1a789.appspot.com",
    messagingSenderId: "710157485149",
    appId: "1:710157485149:web:8e5bdb1559d2853ca439b4",
    measurementId: "G-NH0R0JQ1XX"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Store students globally
let allStudents = [];

// Function to fetch students from Firebase
function fetchStudents() {
    const studentsRef = database.ref("students");

    studentsRef.once("value").then((snapshot) => {
        if (snapshot.exists()) {
            let students = snapshot.val();
            console.log("Fetched Data:", students);

            allStudents = Object.values(students); // Convert object to array
            displayStudents(allStudents); // Display all students
        } else {
            console.log("No student data found!");
            document.getElementById("notFound").style.display = "block";
        }
    }).catch((error) => {
        console.error("Error fetching data:", error);
    });
}

// Function to display students in the table
function displayStudents(students) {
    let tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = ""; // Clear table before inserting new data

    if (students.length === 0) {
        document.getElementById("notFound").style.display = "block"; // Show "No records found"
    } else {
        document.getElementById("notFound").style.display = "none"; // Hide "No records found"

        students.forEach((student) => {
            let row = `
                <tr>
                    <td>${student["Student Number"] ?? "N/A"}</td>
                    <td>${student["Name"] ?? "N/A"}</td>
                    <td>${student["Admission Number"] ?? "N/A"}</td>
                    <td>${student["Age"] ?? "N/A"}</td>
                    <td>${student["Major"] ?? "N/A"}</td>
                    <td>${student["Course ID"] ?? "N/A"}</td>
                    <td>${student["TOTAL"] ?? "N/A"}</td>
                    <td>${student["GRADE"] ?? "N/A"}</td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    }
}

// Function to search for students
function searchData() {
    let searchTerm = document.getElementById("search").value.toLowerCase().trim();

    if (searchTerm === "") {
        displayStudents(allStudents);
        return;
    }

    let filteredStudents = allStudents.filter(student => {
        return Object.values(student).some(value =>
            value && value.toString().toLowerCase().includes(searchTerm)
        );
    });

    displayStudents(filteredStudents);
}

// Run the fetch function when the page loads
window.onload = () => {
    fetchStudents();

    // Attach event listener to search input field
    document.getElementById("search").addEventListener("keyup", searchData);
};
