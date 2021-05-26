function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'already read' : 'not read yet'}.`
    }
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    addBookToArray(newBook);
    addBookToTable(newBook);

    //Grab all delete buttons and reset their data-book-index values correctly
    deleteBookButtons = document.querySelectorAll('.delete-book-button');
    deleteBookButtons.forEach((button, index) => button.dataset.bookIndex = index);

    const newBookDeleteButton = deleteBookButtons[deleteBookButtons.length - 1];
    newBookDeleteButton.addEventListener('click', (e) => {
        const bookIndex = e.target.dataset.bookIndex;
        removeBookFromTable(books[bookIndex]);
        removeBookFromArray(books[bookIndex]);
        deleteBookButtons = document.querySelectorAll('.delete-book-button');
        deleteBookButtons.forEach((button, index) => button.dataset.bookIndex = index);
    });
    
}

function addBookToTable({ title, author, pages, read }) {
    tableBody.insertAdjacentHTML('beforeend',
                                `<tr>
                                    <td>
                                        <button class="delete-book-button" data-book-index=${books.length - 1}>&cross;</button>
                                    </td>
                                    <td>${title}</td>
                                    <td>${author}</td>
                                    <td>${pages}</td>
                                    <td>${read}</td>
                                </tr>`
                                );
}

function addBookToArray(book) {
    books.push(book);
}

function removeBookFromArray(book) {
    books.splice(books.indexOf(book), 1);
}

function removeBookFromTable(book) {
    const tableRow = deleteBookButtons[books.indexOf(book)].parentElement.parentElement;
    tableBody.removeChild(tableRow);
}

const books = [];
const tableBody = document.querySelector('.table-body');
let deleteBookButtons;


const newBookButton = document.querySelector('.new-book-button');
const addBookButton = document.querySelector('.add-book-button');
const newBookForm = document.querySelector('.new-book-form');
const newBookFormTitle = document.querySelector('#title');
const newBookFormAuthor = document.querySelector('#author');
const newBookFormPages = document.querySelector('#pages');
const newBookFormRead = document.querySelectorAll('.read');


newBookButton.addEventListener('click', () => newBookForm.classList.toggle('invisible'));
addBookButton.addEventListener('click', (e) => {
    e.preventDefault();

    addBookToLibrary(
        title.value,
        author.value,
        Number(pages.value),
        newBookFormRead[0].checked ? Boolean(newBookFormRead[0].value) : !Boolean(newBookFormRead[0].value) //Change to checkbox
    );
});

addBookToLibrary('Harry Potter and the Philosopher\'s Stone', 'J.K. Rowling', 250, true);
addBookToLibrary('Harry Potter and the Chamber of Secrets', 'J.K. Rowling', 300, false);