class BookApp {
  constructor() {
    this.bookList = JSON.parse(localStorage.getItem("bookList")) || [];
    this.timeDisplay = document.getElementById("time-display");
    this.mainPage = document.querySelector("#first");
    this.formSection = document.querySelector("#form");
    this.contact = document.querySelector(".contact-section");
    this.showData = document.querySelector(".book-list");
    this.form = document.querySelector("#bookForm");
    this.time();
  }

  time() {
    this.updateTime();
    setInterval(() => this.updateTime(), 1000);
    this.setupEventListeners();
    this.renderBookList();
  }

  updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    this.timeDisplay.textContent = `Current time: ${timeString}`;
  }

  setupEventListeners() {
    document.querySelector("#form-btn").addEventListener("click", () => {
      this.toggleSection("form");
    });

    document.querySelector("#showbutton").addEventListener("click", () => {
      this.toggleSection("main");
    });

    document.querySelector("#contact-btn").addEventListener("click", () => {
      this.toggleSection("contact");
    });

    this.form.addEventListener("submit", (e) => this.addBook(e));
  }

  toggleSection(section) {
    this.mainPage.style.display = section === "main" ? "block" : "none";
    this.formSection.style.display = section === "form" ? "block" : "none";
    this.contact.style.display = section === "contact" ? "block" : "none";
  }

  renderBookList() {
    this.showData.innerHTML = "";
    this.bookList.forEach((data, i) => {
      this.showData.innerHTML += `
        <div class="book-item">
          <span class="book-name">${data.titleName}</span>
          <span class="book-name">${data.authorName}</span>
          <button id=${i} class="remove-btn">Remove</button>
        </div>`;
    });
    localStorage.setItem("bookList", JSON.stringify(this.bookList));
    this.addRemoveEventListeners();
  }

  addRemoveEventListeners() {
    const removeBtns = document.querySelectorAll(".remove-btn");
    removeBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => this.removeBook(e));
    });
  }

  addBook(e) {
    e.preventDefault();
    const title = this.form.title.value;
    const author = this.form.author.value;
    if (title && author) {
      this.bookList.push({ titleName: title, authorName: author });
      this.renderBookList();
      this.form.title.value = "";
      this.form.author.value = "";
    }
  }

  removeBook(e) {
    const index = parseInt(e.target.id, 10);
    this.bookList.splice(index, 1);
    this.renderBookList();
  }
}


new BookApp();
