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
  book.index = myLibrary.length-1;
}

const book1 = new Book('The Great Gatsby','F. Scott Fitzgerald',218,'images/great_gatsby.jpg')
const book2 = new Book('To Kill a Mockingbird','Harper Lee',281,'images/kill a mocking bird.jpg')
const book3 = new Book('1984','George Orwell',328,'images/1984.jpg')
const book4 = new Book('Pride and Prejudice','Jane Austen',432,'images/pride and prejuidice.jpg')

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);

// Display book in array
const book_shelf = document.querySelector('.book-shelf');

function showLibrary() {
    myLibrary.forEach((book) => {
        const book_display = document.createElement('div');
        book_display.style.position = 'relative';
        book_shelf.appendChild(book_display);
        const book_image = document.createElement('img');
        book_image.src = book.url;
        book_image.alt = book.name;
        book_display.appendChild(book_image);
        // Finish status
        const finishStatus = document.createElement('div');
        finishStatus.style.backgroundColor = 'Black';
        finishStatus.style.color = 'White';
        finishStatus.style.fontSize = '13px';
        finishStatus.style.textAlign = 'center';
        finishStatus.style.padding = '5px';
        if (book.read == false) {
          finishStatus.innerText = "Unfinish";
        } else {
          finishStatus.innerText = "Finish";
        }
        book_display.appendChild(finishStatus);
        // Create remove button
        const removeBtn = document.createElement('div');
        removeBtn.style.width = '20px'; removeBtn.style.height = '20px'; 
        removeBtn.style.backgroundColor = '#F6F7F8'; removeBtn.style.borderRadius = '50%'; 
        removeBtn.style.position = 'absolute'; removeBtn.style.right = '15px'; removeBtn.style.top = '15px';
        removeBtn.style.opacity = '50%';
        removeBtn.style.display = 'flex'; removeBtn.style.justifyContent = 'center'; removeBtn.style.alignItems = 'center';
        const removeSymbol = document.createElement('span'); removeSymbol.textContent = 'x'; removeSymbol.style.display = 'none'; 
        removeBtn.addEventListener('mouseenter', () => { removeBtn.style.opacity = '100%'; removeSymbol.style.display = 'block'; removeSymbol.style.color ='grey';}); 
        removeBtn.addEventListener('mouseleave', () => { removeBtn.style.opacity = '50%'; removeSymbol.style.display = 'none'; });
        removeBtn.classList.add('remove-button');
        removeBtn.dataset.index = book.index;
        removeBtn.addEventListener('click', (e) => {
            const bookIndex = e.target.closest('.remove-button').dataset.index;
            myLibrary.splice(bookIndex,1);
            removeBtn.dataset.index = bookIndex-1;
            book_shelf.innerHTML='';
            showLibrary();
        })
        
        removeBtn.appendChild(removeSymbol);
        book_display.appendChild(removeBtn);
        //Display book infos
        const book_title = document.createElement('h2');
        book_title.innerText = book.name;
        book_display.appendChild(book_title);
        const book_author = document.createElement('p');
        book_author.innerText = book.author;
        book_display.appendChild(book_author);
        const book_page = document.createElement('p');
        book_page.innerText = `${book.page} pages`;
        book_display.appendChild(book_page);
        const readBlock = document.createElement('div');
        // Tạo label 
        const readLabel = document.createElement('label'); 
        readLabel.for = "read-status"; 
        readLabel.textContent = "Read:"; 
        readBlock.appendChild(readLabel); 
        // Tạo checkbox 
        const readCheckbox = document.createElement('input'); 
        readCheckbox.type = "checkbox"; 
        readCheckbox.id = "read-status";
        readCheckbox.checked = book.read; 
        
        // Thêm sự kiện để thay đổi trạng thái read của sách 
        readCheckbox.addEventListener('change', (e) => { 
          book.read = e.target.checked;
          book_shelf.innerHTML='';
            showLibrary(); 
        })
        readBlock.appendChild(readCheckbox);
        readBlock.style.display = "flex";
        readBlock.style.gap = "10px"; 
        book_display.appendChild(readBlock);
    });
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
    addBookToLibrary(newBook);
    book_shelf.innerHTML='';
    showLibrary();
} )