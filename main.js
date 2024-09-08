// creating the array to hold the books
const books = [];

// selecting the booklist
const bookList = document.getElementById('book-list');

// function to loop through the books array and add the list items
function displayBooks() {
  bookList.innerHTML = ''; // clears the book list in the DOM

  // loop through the books array
  books.forEach(function (book) {
    const listItem = document.createElement('li');
    listItem.textContent = `${book.name} by ${book.author} (${book.edition})`;

    // append the new list item to the ul element
    bookList.appendChild(listItem);
  });
}

// selecting the add-book form and assigning it to a variable
const addBookForm = document.getElementById('add-book-form');

// getting the input value from the form
addBookForm.addEventListener('submit', function (e) {
  e.preventDefault(); // preventing the default form reload
  const bookId = document.getElementById('book-id').value;
  const bookName = document.getElementById('book-name').value;
  const bookAuthor = document.getElementById('book-author').value;
  const bookEdition = document.getElementById('book-edition').value;

  // validating that the bookID is a number
  if (isNaN(bookId)) {
    alert('Please enter a valid number for the book ID');
    return;
  }

  // validating if all fields are entered
  if (
    bookId === '' ||
    bookName === '' ||
    bookAuthor === '' ||
    bookEdition === ''
  ) {
    alert(
      'All fields are mandatory. Please fill all the fields before continuing'
    );
    return;
  }

  // converting the ID to a number
  const bookIdNumber = Number(bookId);

  // creating a book object with the collected data
  const newBook = {
    id: bookIdNumber,
    name: bookName,
    author: bookAuthor,
    edition: bookEdition,
  };

  // pushing the new book to the books array
  books.push(newBook);

  // calling the displaybook function after adding a new book
  displayBooks();
});

// selecting the necessary DOM elements for the Update section
const searchButton = document.getElementById('search-book-button');
const updateBookIdInput = document.getElementById('update-book-id');
const updateFields = document.getElementById('update-fields');
const updateBookName = document.getElementById('update-book-name');
const updateBookAuthor = document.getElementById('update-book-author');
const updateBookEdition = document.getElementById('update-book-edition');
const updateBookForm = document.getElementById('update-book-form');
const updateBookButton = document.getElementById('update-book-button');

//getting the input from the user for updating the book
searchButton.addEventListener('click', function (e) {
  e.preventDefault(); // prevent form submission
  const bookId = Number(updateBookIdInput.value); // convert the input by the user to a number
  const foundBook = books.find(function (book) {
    return book.id === bookId; // checking if the bookid matches the user input
  });

  if (foundBook) {
    // Populate the fields with the existing data
    updateBookName.value = foundBook.name;
    updateBookAuthor.value = foundBook.author;
    updateBookEdition.value = foundBook.edition;

    // Reveal the hidden fields for updating
    updateFields.style.display = 'block';

    // reveal the update button
    updateBookButton.style.display = 'inline-block';
  } else {
    // If no book is found, alert the user
    alert('Book not found. Please check the ID and try again.');
  }
});

// updating the book after the changes are made
updateBookButton.addEventListener('click', function () {
  const bookId = Number(updateBookIdInput.value); // Convert input to a number again
  const foundBook = books.find(function (book) {
    return book.id === bookId;
  });

  if (foundBook) {
    // Update the book details with the new values
    foundBook.name = updateBookName.value;
    foundBook.author = updateBookAuthor.value;
    foundBook.edition = updateBookEdition.value;

    // Refresh the book list
    displayBooks();

    // Optionally, hide the update section after updating
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
  const searchBookName = searchBookNameInput.value.trim().toLowerCase(); // getting the book name and converting to lowercase for case-insensitive search

  // Searching for the book in the books array
  const foundBook = books.find(function (book) {
    return book.name.toLowerCase() === searchBookName; // case-insensitive comparison
  });

  if (foundBook) {
    // Populate the spans with the found book's details
    searchResultId.textContent = foundBook.id;
    searchResultName.textContent = foundBook.name;
    searchResultAuthor.textContent = foundBook.author;
    searchResultEdition.textContent = foundBook.edition;
  } else {
    // If no book is found, clear the spans and show a message
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
  const deleteBookName = deleteBookNameInput.value.trim().toLowerCase(); // getting the book name and converting to lowercase for case-insensitive search

  // Finding the index of the book to delete
  const bookIndex = books.findIndex(function (book) {
    return book.name.toLowerCase() === deleteBookName; // case-insensitive comparison
  });

  if (bookIndex !== -1) {
    // If the book is found, remove it from the array
    books.splice(bookIndex, 1); // remove the book from the array
    alert('Book deleted successfully!');
  } else {
    // If no book is found, show a message
    alert('Book not found. Please check the name and try again.');
  }

  // Refresh the book list after deletion
  displayBooks();
});
