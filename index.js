

const bookList = bookData;
const favorites = [];

const mainSection = document.querySelector('.mainSection');
const addform = document.querySelector('.addForm');
const searchInput = document.querySelector('.search');
const searchButton = document.querySelector('.searchButton');
const favorite = document.querySelector('.favButton')
const sortButton = document.querySelector('.sortButton');


addform.addEventListener('submit', function (e) {
  e.preventDefault();
  const authorInput = document.querySelector('input.author');
  const languageInput = document.querySelector('input.language');
  const subjectInput = document.querySelector('input.subject');
  const titleInput = document.querySelector('input.title');

  bookList.push({ author: authorInput.value, language: languageInput.value, subject: subjectInput.value, title: titleInput.value });
  renderBook({ author: authorInput.value, language: languageInput.value, subject: subjectInput.value, title: titleInput.value });
  renderAllBook(bookList)
});

sortButton.addEventListener('click', () => renderAllBook(sortBooks(bookList)))
searchButton.addEventListener("click", () => renderAllBook(searchBook(bookList)));

const searchBook = (books) => {
  const query = searchInput.value.toLowerCase();
  return books.filter(book => book.title.toLowerCase().includes(query));
}


const sortBooks = (books) => {
  console.log("I am sorting!")
  return books.sort((a, b) => a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1);
}

const updateComment = (book, textarea) => {
  book.comments = book.comments || [];
  book.comments.push(textarea);
  // renderBook(book);
  // renderBook(book)
}

const favBook = (book) => {
  favorites.push(book);
  renderAllBook(bookList)
}



const renderBook = (book) => {
  const { author, language, subject, title } = book;
  const libraryList = document.createElement('ul');
  const bookTitle = document.createElement('li');
  bookTitle.textContent = title;
  const favBtn = document.createElement("button");
  favBtn.textContent ="\u2764";
  favBtn.addEventListener('click', () => favBook(book));

  const bookDescription = document.createElement('p');
  bookDescription.textContent = `By ${author}`;

  const commentcont = document.createElement('div');
  commentcont.textContent = 'User Comments:'
  const cominput = document.createElement('div');
  const textarea = document.createElement('textarea')
  const postbtn = document.createElement('button');
  postbtn.textContent = 'Post'
  // cominput.className = 'commentinput';
  cominput.style.display = 'none';
  cominput.append(textarea, postbtn)
  const commentbtn = document.createElement("button")
  commentbtn.className = "commentbtn"

  commentbtn.textContent = "comment"
  // commentbtn.append(cominput)
  commentbtn.addEventListener('click', function () {
    cominput.style.display = 'block';
  });
  // commentbtn.addEventListener('dblclick', function () {
  //   cominput.style.display = 'none';
  // });
  postbtn.addEventListener("click", function () {
    // Check the comment is not empty
    if (textarea.value.length == 0) {
      alert("Please enter a comment before posting")
    } else if (textarea.value.length > 280) {
      alert("Comment must be less than 280 characters")
    } else {
      const comment = document.createElement("div");
      comment.innerText = textarea.value;
      updateComment(book, comment)
      commentcont.append(comment);
      textarea.value = "";
      cominput.style.display = "none";
     
    }});
  bookTitle.prepend(favBtn)
  libraryList.append(bookTitle, bookDescription, commentcont, cominput, commentbtn);
  mainSection.append(libraryList);

  return libraryList;
};

const renderAllBook = (books) => {
  const elements = books.map(renderBook);
  mainSection.replaceChildren(...elements);
};

renderAllBook(bookList);
