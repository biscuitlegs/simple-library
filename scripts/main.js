function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'already read' : 'not read yet'}.`
    }
}

Book.prototype.invertRead = function() {
    this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    addBookToArray(newBook);
    addBookToTable(newBook);

    resetDeleteBookButtons();
    const newBookDeleteButton = deleteBookButtons[deleteBookButtons.length - 1];
    newBookDeleteButton.addEventListener('click', removeBookFromLibrary);

    resetInvertReadButtons();
    const newInvertReadButton = invertReadButtons[invertReadButtons.length - 1];
    newInvertReadButton.addEventListener('click', invertBookRead);
}

function addBookToArray(book) {
    books.push(book);
}

function addBookToTable({ title, author, pages, read }) {
    tableBody.insertAdjacentHTML('beforeend',
                                `<tr>
                                    <td>
                                        <button class="btn btn-danger delete-book-button" data-book-index=${books.length - 1}>&cross;</button>
                                    </td>
                                    <td>${title}</td>
                                    <td>${author}</td>
                                    <td>${pages}</td>
                                    <td>
                                        <button class="btn btn-light invert-read-button" data-book-index=${books.length - 1}>&#8635;</button>
                                        <span>${read}</span>
                                    </td>
                                </tr>`
                                );
}

function removeBookFromLibrary(e) {
    const bookIndex = e.target.dataset.bookIndex;
    removeBookFromTable(books[bookIndex]);
    removeBookFromArray(books[bookIndex]);
    resetDeleteBookButtons();
    resetInvertReadButtons();
}

function removeBookFromArray(book) {
    books.splice(books.indexOf(book), 1);
}

function removeBookFromTable(book) {
    const tableRow = deleteBookButtons[books.indexOf(book)].parentElement.parentElement;
    tableBody.removeChild(tableRow);
}

function resetDeleteBookButtons() {
    deleteBookButtons = document.querySelectorAll('.delete-book-button');
    deleteBookButtons.forEach((button, index) => button.dataset.bookIndex = index);
}

function resetInvertReadButtons() {
    invertReadButtons = document.querySelectorAll('.invert-read-button');
    invertReadButtons.forEach((button, index) => button.dataset.bookIndex = index);
}

function invertBookRead(e) {
    const bookIndex = e.target.dataset.bookIndex;
    const book = books[bookIndex];
    book.invertRead();
    e.target.nextElementSibling.textContent = book.read;
}


const books = [];

const newBookButton = document.querySelector('.new-book-button');
const addBookButton = document.querySelector('.add-book-button');
const newBookForm = document.querySelector('.new-book-form');
const newBookFormTitle = document.querySelector('#title');
const newBookFormAuthor = document.querySelector('#author');
const newBookFormPages = document.querySelector('#pages');
const newBookFormRead = document.querySelector('#read');
const tableBody = document.querySelector('.table-body');

let deleteBookButtons;
let invertReadButtons;


newBookButton.addEventListener('click', () => newBookForm.classList.toggle('invisible'));

addBookButton.addEventListener('click', (e) => {
    e.preventDefault();

    addBookToLibrary(
        title.value,
        author.value,
        Number(pages.value),
        newBookFormRead.checked ? true : false
    );
});

addBookToLibrary('Dracula', 'Bram Stoker', 418, false);
addBookToLibrary('Frankenstein', 'Mary Shelley', 280, true);
addBookToLibrary('The Republic', 'Plato', 472, true);
