"use strict";
// creating the array to hold the books
const books = [];
// selecting the book tab;e
const bookTableBody = document.getElementById('book-table-body');
function displayBooks() {
    bookTableBody.innerHTML = ''; // clears the table body
    // loop through the books array
    books.forEach(function (book) {
        const row = document.createElement('tr'); // create a new row
        // create cells for book properties
        const idCell = document.createElement('td');
        idCell.textContent = book.id.toString();
        const nameCell = document.createElement('td');
        nameCell.textContent = book.name;
        const authorCell = document.createElement('td');
        authorCell.textContent = book.author;
        const editionCell = document.createElement('td');
        editionCell.textContent = book.edition;
        // append cells to the row
        row.appendChild(idCell);
        row.appendChild(nameCell);
        row.appendChild(authorCell);
        row.appendChild(editionCell);
        // append the row to the table body
        bookTableBody.appendChild(row);
    });
}
// selecting the add-book form and assigning it to a variable
const addBookForm = document.getElementById('add-book-form');
// getting the input value from the form
addBookForm.addEventListener('submit', function (e) {
    e.preventDefault(); // preventing the default form reload
    // get form values
    const bookId = document.getElementById('book-id').value;
    const bookName = document.getElementById('book-name')
        .value;
    const bookAuthor = document.getElementById('book-author').value;
    const bookEdition = document.getElementById('book-edition').value;
    // validating that the bookID is a number
    if (isNaN(Number(bookId))) {
        alert('Please enter a valid number for the book ID');
        return;
    }
    // validating if all fields are entered
    if (!bookId || !bookName || !bookAuthor || !bookEdition) {
        alert('All fields are mandatory. Please fill all the fields before continuing');
        return;
    }
    // creating a book object with the collected data
    const newBook = {
        id: Number(bookId),
        name: bookName,
        author: bookAuthor,
        edition: bookEdition,
    };
    // pushing the new book to the books array
    books.push(newBook);
    // calling the displayBooks function after adding a new book
    displayBooks();
});
// selecting the necessary DOM elements for the Update section
const searchButton = document.getElementById('search-book-button');
const updateBookIdInput = document.getElementById('update-book-id');
const updateFields = document.getElementById('update-fields');
const updateBookName = document.getElementById('update-book-name');
const updateBookAuthor = document.getElementById('update-book-author');
const updateBookEdition = document.getElementById('update-book-edition');
const updateBookButton = document.getElementById('update-book-button');
// getting the input from the user for updating the book
searchButton.addEventListener('click', function (e) {
    e.preventDefault(); // prevent form submission
    const bookId = Number(updateBookIdInput.value);
    // find the book by ID
    const foundBook = books.find((book) => book.id === bookId);
    if (foundBook) {
        updateBookName.value = foundBook.name;
        updateBookAuthor.value = foundBook.author;
        updateBookEdition.value = foundBook.edition;
        // Reveal the hidden fields for updating
        updateFields.style.display = 'block';
        updateBookButton.style.display = 'inline-block';
    }
    else {
        alert('Book not found. Please check the ID and try again.');
    }
});
// updating the book after the changes are made
updateBookButton.addEventListener('click', function () {
    const bookId = Number(updateBookIdInput.value);
    const foundBook = books.find((book) => book.id === bookId);
    if (foundBook) {
        foundBook.name = updateBookName.value;
        foundBook.author = updateBookAuthor.value;
        foundBook.edition = updateBookEdition.value;
        displayBooks();
        updateFields.style.display = 'none';
        updateBookButton.style.display = 'none';
    }
});
// selecting the necessary DOM elements for the Search section
const searchBookForm = document.getElementById('search-book-form');
const searchBookNameInput = document.getElementById('search-book-name');
const searchResultId = document.getElementById('search-result-id');
const searchResultName = document.getElementById('search-result-name');
const searchResultAuthor = document.getElementById('search-result-author');
const searchResultEdition = document.getElementById('search-result-edition');
// adding event listener to the Search Book form
searchBookForm.addEventListener('submit', function (e) {
    e.preventDefault(); // prevent form submission
    const searchBookName = searchBookNameInput.value.trim().toLowerCase();
    const foundBook = books.find((book) => book.name.toLowerCase() === searchBookName);
    if (foundBook) {
        searchResultId.textContent = foundBook.id.toString();
        searchResultName.textContent = foundBook.name;
        searchResultAuthor.textContent = foundBook.author;
        searchResultEdition.textContent = foundBook.edition;
    }
    else {
        searchResultId.textContent = 'Not found';
        searchResultName.textContent = 'Not found';
        searchResultAuthor.textContent = 'Not found';
        searchResultEdition.textContent = 'Not found';
    }
});
// selecting necessary DOM elements for the Delete section
const deleteBookForm = document.getElementById('delete-book-form');
const deleteBookNameInput = document.getElementById('delete-book-name');
// adding event listener to the Delete Book form
deleteBookForm.addEventListener('submit', function (e) {
    e.preventDefault(); // prevent form submission
    const deleteBookName = deleteBookNameInput.value.trim().toLowerCase();
    const bookIndex = books.findIndex((book) => book.name.toLowerCase() === deleteBookName);
    if (bookIndex !== -1) {
        books.splice(bookIndex, 1); // remove the book from the array
        alert('Book deleted successfully!');
        displayBooks();
    }
    else {
        alert('Book not found. Please check the name and try again.');
    }
});
