function updateTime() {
  const timeDisplay = document.getElementById("time-display");
  const now = new Date();
  const timeString = now.toLocaleTimeString();
  timeDisplay.textContent = `Current time: ${timeString}`;
}

setInterval(updateTime, 1000);

updateTime();


const btn = document.querySelector("#form-btn");
const contactBtn = document.querySelector("#contact-btn");
const showBtn = document.querySelector("#showbutton");
const showData = document.querySelector(".book-list");
const mainPage = document.querySelector("#first");
const form = document.querySelector("#bookForm");
const contact = document.querySelector(".contact-section");
const formSection = document.querySelector("#form");

btn.addEventListener("click", () => {
  formSection.style.display = "block";
  mainPage.style.display = "none";
  contact.style.display = "none";
});

showBtn.addEventListener("click", () => {
  mainPage.style.display = "block";
  formSection.style.display = "none";
  contact.style.display = "none";
});

contactBtn.addEventListener("click", () => {
  contact.style.display = "block";
  mainPage.style.display = "none";
  formSection.style.display = "none";
});


// Load book list from localStorag
let book = JSON.parse(localStorage.getItem("bookList")) || [];

// Function annnyy
const any = () => {
  showData.innerHTML = ""; 
  book.forEach((data, i) => {
    showData.innerHTML += `<div class="book-item">
                <span class="book-name">${data.titleName}</span>
                <span class="book-name">${data.authorName}</span>
                <button id=${i} class="remove-btn">Remove</button>
            </div>`;
  });

  // updated book list to localStorage
  localStorage.setItem("bookList", JSON.stringify(book));

  //  Add event listeners 
  const removeBtns = document.querySelectorAll(".remove-btn");
  removeBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = parseInt(e.target.id, 10); 
      book.splice(index, 1); 
      any(); 
    });
  });
};

any();


form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = form.title.value;
  const author = form.author.value;
  const booksdata = { titleName: title, authorName: author };
  book.push(booksdata);
  any();

  form.title.value = "";
  form.author.value = "";
});
