// Load data from local storage
function loadData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

// Save data to local storage
function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// ✅ Add Student
function addStudent() {
    let studentID = document.getElementById("studentID").value;
    let studentName = document.getElementById("studentName").value;

    if (studentID === "" || studentName === "") {
        alert("Please enter student details!");
        return;
    }

    let students = loadData("students");
    students.push({ id: studentID, name: studentName });
    saveData("students", students);

    alert("Student added successfully!");
    document.getElementById("studentID").value = "";
    document.getElementById("studentName").value = "";
}

// ✅ Add Book
function addBook() {
    let bookTitle = document.getElementById("bookTitle").value;
    let bookAuthor = document.getElementById("bookAuthor").value;

    if (bookTitle === "" || bookAuthor === "") {
        alert("Please enter book details!");
        return;
    }

    let books = loadData("books");
    books.push({ title: bookTitle, author: bookAuthor, issued: false });
    saveData("books", books);

    alert("Book added successfully!");
    document.getElementById("bookTitle").value = "";
    document.getElementById("bookAuthor").value = "";
}

// ✅ Issue Book
function issueBook() {
    let studentID = document.getElementById("issueStudentID").value;
    let bookTitle = document.getElementById("issueBookTitle").value;

    let students = loadData("students");
    let books = loadData("books");

    let studentExists = students.some(student => student.id === studentID);
    let bookIndex = books.findIndex(book => book.title === bookTitle && !book.issued);

    if (!studentExists) {
        alert("Student not found!");
        return;
    }
    
    if (bookIndex === -1) {
        alert("Book not available or already issued!");
        return;
    }

    books[bookIndex].issued = true;
    saveData("books", books);

    alert("Book issued successfully!");
    document.getElementById("issueStudentID").value = "";
    document.getElementById("issueBookTitle").value = "";
}

// ✅ Return Book
function returnBook() {
    let studentID = document.getElementById("returnStudentID").value;
    let bookTitle = document.getElementById("returnBookTitle").value;

    let books = loadData("books");
    let bookIndex = books.findIndex(book => book.title === bookTitle && book.issued);

    if (bookIndex === -1) {
        alert("Book is not issued!");
        return;
    }

    books[bookIndex].issued = false;
    saveData("books", books);

    alert("Book returned successfully!");
    document.getElementById("returnStudentID").value = "";
    document.getElementById("returnBookTitle").value = "";
}

// ✅ Display Student List
function displayStudents() {
    let students = loadData("students");
    let studentList = document.getElementById("studentList");
    studentList.innerHTML = "";

    if (students.length === 0) {
        studentList.innerHTML = "<li>No students found.</li>";
        return;
    }

    students.forEach(student => {
        let li = document.createElement("li");
        li.textContent = `ID: ${student.id} - Name: ${student.name}`;
        studentList.appendChild(li);
    });
}

// ✅ Display Available Books
function displayBooks() {
    let books = loadData("books");
    let bookList = document.getElementById("bookList");
    bookList.innerHTML = "";

    if (books.length === 0) {
        bookList.innerHTML = "<li>No books available.</li>";
        return;
    }

    books.forEach(book => {
        let li = document.createElement("li");
        li.textContent = `Title: ${book.title} - Author: ${book.author} - ${book.issued ? "Issued" : "Available"}`;
        bookList.appendChild(li);
    });
}
