// defining the Book type to be used in the books array
type Book = {
  id: number;
  name: string;
  author: string;
  edition: string;
};

// creating the array to hold the books
const books: Book[] = [];

// selecting the book tab;e
const bookTableBody = document.getElementById(
  'book-table-body'
) as HTMLTableSectionElement;

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
const addBookForm = document.getElementById('add-book-form') as HTMLFormElement;

// getting the input value from the form
addBookForm.addEventListener('submit', function (e: Event) {
  e.preventDefault(); // preventing the default form reload

  // get form values
  const bookId = (document.getElementById('book-id') as HTMLInputElement).value;
  const bookName = (document.getElementById('book-name') as HTMLInputElement)
    .value;
  const bookAuthor = (
    document.getElementById('book-author') as HTMLInputElement
  ).value;
  const bookEdition = (
    document.getElementById('book-edition') as HTMLInputElement
  ).value;

  // validating that the bookID is a number
  if (isNaN(Number(bookId))) {
    alert('Please enter a valid number for the book ID');
    return;
  }

  // validating if all fields are entered
  if (!bookId || !bookName || !bookAuthor || !bookEdition) {
    alert(
      'All fields are mandatory. Please fill all the fields before continuing'
    );
    return;
  }

  // creating a book object with the collected data
  const newBook: Book = {
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
const searchButton = document.getElementById(
  'search-book-button'
) as HTMLButtonElement;
const updateBookIdInput = document.getElementById(
  'update-book-id'
) as HTMLInputElement;
const updateFields = document.getElementById('update-fields') as HTMLDivElement;
const updateBookName = document.getElementById(
  'update-book-name'
) as HTMLInputElement;
const updateBookAuthor = document.getElementById(
  'update-book-author'
) as HTMLInputElement;
const updateBookEdition = document.getElementById(
  'update-book-edition'
) as HTMLInputElement;
const updateBookButton = document.getElementById(
  'update-book-button'
) as HTMLButtonElement;

// getting the input from the user for updating the book
searchButton.addEventListener('click', function (e: Event) {
  e.preventDefault(); // prevent form submission
  const bookId = Number(updateBookIdInput.value);

  // find the book by ID
  const foundBook = books.find((book: Book) => book.id === bookId);

  if (foundBook) {
    updateBookName.value = foundBook.name;
    updateBookAuthor.value = foundBook.author;
    updateBookEdition.value = foundBook.edition;

    // Reveal the hidden fields for updating
    updateFields.style.display = 'block';
    updateBookButton.style.display = 'inline-block';
  } else {
    alert('Book not found. Please check the ID and try again.');
  }
});

// updating the book after the changes are made
updateBookButton.addEventListener('click', function () {
  const bookId = Number(updateBookIdInput.value);
  const foundBook = books.find((book: Book) => book.id === bookId);

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
const searchBookForm = document.getElementById(
  'search-book-form'
) as HTMLFormElement;
const searchBookNameInput = document.getElementById(
  'search-book-name'
) as HTMLInputElement;
const searchResultId = document.getElementById(
  'search-result-id'
) as HTMLSpanElement;
const searchResultName = document.getElementById(
  'search-result-name'
) as HTMLSpanElement;
const searchResultAuthor = document.getElementById(
  'search-result-author'
) as HTMLSpanElement;
const searchResultEdition = document.getElementById(
  'search-result-edition'
) as HTMLSpanElement;

// adding event listener to the Search Book form
searchBookForm.addEventListener('submit', function (e: Event) {
  e.preventDefault(); // prevent form submission
  const searchBookName = searchBookNameInput.value.trim().toLowerCase();

  const foundBook = books.find(
    (book: Book) => book.name.toLowerCase() === searchBookName
  );

  if (foundBook) {
    searchResultId.textContent = foundBook.id.toString();
    searchResultName.textContent = foundBook.name;
    searchResultAuthor.textContent = foundBook.author;
    searchResultEdition.textContent = foundBook.edition;
  } else {
    searchResultId.textContent = 'Not found';
    searchResultName.textContent = 'Not found';
    searchResultAuthor.textContent = 'Not found';
    searchResultEdition.textContent = 'Not found';
  }
});

// selecting necessary DOM elements for the Delete section
const deleteBookForm = document.getElementById(
  'delete-book-form'
) as HTMLFormElement;
const deleteBookNameInput = document.getElementById(
  'delete-book-name'
) as HTMLInputElement;

// adding event listener to the Delete Book form
deleteBookForm.addEventListener('submit', function (e: Event) {
  e.preventDefault(); // prevent form submission
  const deleteBookName = deleteBookNameInput.value.trim().toLowerCase();

  const bookIndex = books.findIndex(
    (book: Book) => book.name.toLowerCase() === deleteBookName
  );

  if (bookIndex !== -1) {
    books.splice(bookIndex, 1); // remove the book from the array
    alert('Book deleted successfully!');
    displayBooks();
  } else {
    alert('Book not found. Please check the name and try again.');
  }
});
