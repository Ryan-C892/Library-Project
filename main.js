// Modal Selectors
const formModal = document.getElementById("formModal");
const newBookForm = document.getElementById("newBookForm");

// Book Class
class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

// EventHandler Class: Handle Events
class EventHandler {
    static displayBooks() {
        //const library = [
        //    {
        //        title: 'Don Quixote',
        //        author: 'Miguel de Cervantes',
        //        pages: 800,
        //        read: true
        //    },
        //    {
        //        title: 'This Is Why I Hate You',
        //        author: 'Onision',
        //        pages: 156,
        //        read: false
        //    },
        //    {
        //        title: 'The Count of Monte Cristo',
        //        author: 'Alexandre Dumas',
        //        pages: 1276,
        //        read: true
        //    },
        //    {
        //        title: 'Salammbô',
        //        author: 'Gustave Flaubert',
        //        pages: 288,
        //        read: false
        //    },
        //    {
        //        title: 'The Great Gatsby',
        //        author: 'F. Scott Fitzgerald',
        //        pages: 240,
        //        read: true
        //    }
        //];
        //const books = library;
        const books = Storage.getBooks();
        books.forEach((book) => EventHandler.addBookToLibrary(book));
    }
    // Add to Library
    static addBookToLibrary(book) {
        const list = document.getElementById("list");
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td><a href="#" class="readBtn">${book.read}</a></td>
            <td><a href="#" class="remove">Remove</a></td>
        `;

        list.appendChild(row);
    }
    // Show Validation
    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `${className}`;
        div.appendChild(document.createTextNode(message));
        const newBookForm = document.getElementById("newBookForm");
        const label = document.getElementById("form-label");
        newBookForm.insertBefore(div, label);
        // Vanish
        setTimeout(() => document.querySelector('.validate').remove(), 5000);
        setTimeout(() => document.querySelector('.success').remove(), 5000);
    }
    // Show that Book was removed
    static showAlertRemoved(message, className) {
        const div = document.createElement('div');
        div.className = `${className}`;
        div.appendChild(document.createTextNode(message));
        const libraryContainer = document.querySelector(".library-container");
        const library = document.querySelector("#library");
        libraryContainer.insertBefore(div, library);
        // Vanish
        setTimeout(() => document.querySelector('.book-removed').remove(), 5000);
    }
    // Change Read from true to false and vise versa
    static changeRead(el) {
        if(el.classList.contains('readBtn')) {
            if (el.innerHTML == "true") {
                el.innerHTML = "false"
                console.log("Haven't Read.");
            } else if(el.innerHTML == "false") {
                el.innerHTML = "true"
                console.log("Have Read.");
            } 
        }
    }
    // Remove Book from Library
    static removeBook(el) {
        if(el.classList.contains('remove')) {
            el.parentElement.parentElement.remove();
            EventHandler.showAlertRemoved('Book Removed.', 'book-removed');
        }
    }
    // Clear Form Entry
    static clearForm() {
        document.getElementById("title").value = '';
        document.getElementById("author").value = '';
        document.getElementById("pages").value = '';
        document.getElementById("read").value = false;
    }
}
// Storage Class: Handles Storage
class Storage {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBooks(book) {
        const books = Storage.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBooks(pages) {
        const books = Storage.getBooks();
        books.forEach((book, index) => {
            if(book.pages === pages) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}
// Display Books
document.addEventListener('DOMContentLoaded', EventHandler.displayBooks);

// Add a Book
newBookForm.addEventListener('submit', (e)=> {
    e.preventDefault();
    //Get Form Input Values
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").value;
    // Validation
    if(title === '' || author === '' || pages === '') {
        EventHandler.showAlert('Please fill in all fields', 'validate');
    } else {
        // Book
        const book = new Book(title, author, pages, read);
        console.log(book);
        // Add Book to EventHandler
        EventHandler.addBookToLibrary(book);
        // Add Book to Storage
        Storage.addBooks(book);
        // Success
        EventHandler.showAlert('Success!', 'success');
        //Clear Form
        EventHandler.clearForm();
    }
});

// Change Read
document.getElementById("list").addEventListener('click', (e)=> {
    EventHandler.changeRead(e.target);
});

// Remove Book
document.getElementById("list").addEventListener('click', (e)=> {
    // Remove Book from EventHandler
    EventHandler.removeBook(e.target);
    // Remove Book from Storage
    Storage.removeBooks(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
});

// Checkbox Event Listener
checkbox = document.getElementById("read");
checkbox.addEventListener('change', (event)=> {
    if (event.target.checked) {
        checkbox.value = true;
        console.log("True!");
    } else {
        checkbox.value = false;
        console.log("False!");
    }
});

// Modal Event Listener
const addBook = document.getElementById("addBook");
const closeBtn = document.getElementById("closeBtn");

window.addEventListener('load', ()=> {
    formModal.classList.add("hide");
    checkbox.value = false;
});

addBook.addEventListener("click", ()=> {
    formModal.classList.remove("hide");
});

closeBtn.addEventListener("click", ()=> {
    formModal.classList.add("hide");
});
