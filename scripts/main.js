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
    books.push(new Book(title, author, pages, read))
}

const books = [];

addBookToLibrary('Harry Potter and the Philosopher\'s Stone', 'J.K. Rowling', '250', true);
addBookToLibrary('Harry Potter and the Chamber of Secrets', 'J.K. Rowling', '300', false);

const tableBody = document.querySelector('.table-body');

books.forEach(book => {
    tableBody.insertAdjacentHTML('beforeend',
                                `<tr>
                                    <td>${book.title}</td>
                                    <td>${book.author}</td>
                                    <td>${book.pages}</td>
                                    <td>${book.read}</td>
                                </tr>`
                                )
})