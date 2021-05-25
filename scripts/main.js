function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'already read' : 'not read yet'}.`
    }
}

const tableBody = document.querySelector('.table-body');

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read)
    books.push(newBook);
    addBookToTable(newBook);
}

function addBookToTable({ title, author, pages, read }) {
    tableBody.insertAdjacentHTML('beforeend',
                                `<tr>
                                    <td>${title}</td>
                                    <td>${author}</td>
                                    <td>${pages}</td>
                                    <td>${read}</td>
                                </tr>`
                                );
}

const books = [];

addBookToLibrary('Harry Potter and the Philosopher\'s Stone', 'J.K. Rowling', 250, true);
addBookToLibrary('Harry Potter and the Chamber of Secrets', 'J.K. Rowling', 300, false);

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
        newBookFormRead[0].checked ? Boolean(newBookFormRead[0].value) : !Boolean(newBookFormRead[0].value)
    );
});