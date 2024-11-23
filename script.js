const myLibrary = [];

function Book(name,author,page,url) {
  this.name = name;
  this.author = author;
  this.page = page;
  this.url = url
  this.read = false;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

const book1 = new Book('The Great Gatsby','F. Scott Fitzgerald',218,'images/great_gatsby.jpg')
const book2 = new Book('To Kill a Mockingbird','Harper Lee',281,'images/kill a mocking bird.jpg')
const book3 = new Book('1984','George Orwell',328,'images/1984.jpg')
const book4 = new Book('Pride and Prejudice','Jane Austen',432,'images/pride and prejuidice.jpg')

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);

// console.table(myLibrary)
// document.addEventListener('DOMContentLoaded', () => {
//     const book1_display = document.querySelector('.book1');
//     const book1_image = document.createElement('img');
//     book1_image.src = 'images/great_gatsby.jpg';
//     book1_image.alt = 'The Great Gatsby';
//     book1_display.appendChild(book1_image);
//     // const book1_title = book1.name;
//     const book1_title = document.createElement('h2');
//     book1_title.innerText = book1.name;
//     book1_display.appendChild(book1_title);

// });

// Display book in array
const book_shelf = document.querySelector('.book-shelf');

function showLibrary() {
    myLibrary.forEach((book) => {
        const book_display = document.createElement('div');
        book_shelf.appendChild(book_display);
        const book_image = document.createElement('img');
        book_image.src = book.url;
        book_image.alt = book.name;
        book_display.appendChild(book_image);
        // Create remove button
        const removeBtn = document.createElement('div');
        removeBtn.classList.add("remove-button");
        removeBtn.style.width = '10px'; removeBtn.style.height = '10px'; removeBtn.style.backgroundColor = '#F6F7F8'; removeBtn.style.borderRadius = '50%'; removeBtn.style.position = 'absolute'; removeBtn.style.right = '0'; removeBtn.style.top = '20px';
        book_display.appendChild(removeBtn);
        const book_title = document.createElement('h2');
        book_title.innerText = book.name;
        book_display.appendChild(book_title);
        const book_author = document.createElement('p');
        book_author.innerText = book.author;
        book_display.appendChild(book_author);
        const book_page = document.createElement('p');
        book_page.innerText = `${book.page} pages`;
        book_display.appendChild(book_page);
        })
};

showLibrary();

// Show modal to add book
const showBtn = document.querySelector(".add-new-book");
const dialog = document.getElementById("dialog");
const jsCloseBtn = dialog.querySelector(".cancel");

showBtn.addEventListener("click", () => {
    dialog.showModal();
  });

jsCloseBtn.addEventListener("click", (e) => {
    e.preventDefault();
    dialog.close();
  });  

const confirmBtn = dialog.querySelector(".confirm");

// Get info of import book

confirmBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const bookNameInput = dialog.querySelector("#book-name");
    const bookName = bookNameInput.value;
    const authorNameInput = dialog.querySelector("#author-name");
    const authorName = authorNameInput.value;
    const pageNumberInput = dialog.querySelector("#page-number");
    const pageNumber = pageNumberInput.value;
    const coverPathInput = dialog.querySelector("#book-cover");
    const coverPath = coverPathInput.value;
    const newBook = new Book(bookName,authorName,pageNumber,coverPath);
    myLibrary.push(newBook);
    book_shelf.innerHTML='';
    showLibrary();
} )