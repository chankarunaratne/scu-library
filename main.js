// creating the array to hold the books
const books = [];

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
      'All fields are mandotary. Please fill all the fields before continuing'
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

  // selecting the booklist
  const bookList = document.getElementById('book-list');

  // function to loop through the books array and add the list items
  function displayBooks() {
    bookList.innerHTML = ''; // clears the book list in the DOM

    // loop through the books array
    books.forEach(function (book) {
      const listItem = document.createElement('li');
      listItem.textContent = `${book.name} by ${book.author} ${book.edition}`;

      // append the new list item to the ul element
      bookList.appendChild(listItem);
    });
  }

  // calling the displaybook function after adding a new book
  displayBooks();
});
