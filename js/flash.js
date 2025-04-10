let words = JSON.parse(localStorage.getItem("VocabularyList")) || [];
let flashcard = document.querySelector(".flashcard");
let prevBtn = document.querySelector(".previous");
let nextBtn = document.querySelector(".next");
let markBtn = document.querySelector(".mark-as-learned");
let progressText = document.querySelector("#progress span:last-child");
let progressBar = document.querySelector(".progress");
let categorySelect = document.getElementById("category-select");

//
document.getElementById("category-select").addEventListener("change", function () {
  currentPage = 1;
  renderWord();
  renderPageNumber();
});
function renderSelect() {
  let categoryList = JSON.parse(localStorage.getItem("categoryList")) || [];
  categorySelect.innerHTML = `<option value="all">All categories</option>`;
  categoryList.forEach((option) => {
    categorySelect.innerHTML += `<option value="${option.name}">${option.name}</option>`;
  });
}
//
function getFilteredVocabulary() {
  let VocabularyList = JSON.parse(localStorage.getItem("VocabularyList")) || [];
  let selectedValue = categorySelect.value.trim().toLowerCase();
  if (selectedValue !== "all") {
    return VocabularyList.filter((el) => el.category.trim().toLowerCase() === selectedValue);
  }
  return VocabularyList;
}
//
function renderWord() {
  let tbody = document.getElementById("table-tbody");
  tbody.innerHTML = "";
  let VocabularyList = getFilteredVocabulary();
  let start = (currentPage - 1) * perPage;
  let end = start + perPage;
  let users = VocabularyList.slice(start, end);
  users.forEach((element) => {
    let row = document.createElement("tr");
    row.innerHTML = `
            <td>${element.word}</td>
            <td>${element.meaning}</td>
            <td id="edit">Not learned</td>
           `;
    tbody.appendChild(row);
  });
}
let currentPage = 1;
let perPage = 3;
function renderPageNumber() {
  let VocabularyList = getFilteredVocabulary();
  let totalPage = Math.ceil(VocabularyList.length / perPage);
  let ul = document.getElementById("pagination");
  ul.innerHTML = "";
  ul.innerHTML += `<li onclick="PreviousPage()" style="width:80px;opacity:${
    currentPage === 1 ? "0.5" : "1"
  }">Previous</li>`;
  for (let i = 1; i <= totalPage; i++) {
    ul.innerHTML += `<li onclick="changePage(${i})" style="background-color:${
      i === currentPage ? "#007bff" : "transparent"
    };
    color: ${i === currentPage ? "#fff" : "#000"}">${i}</li>`;
  }
  ul.innerHTML += `<li onclick="nextPage()" style="opacity:${currentPage === totalPage ? "0.5" : "1"}">Next</li>`;
}

function changePage(page) {
  let VocabularyList = getFilteredVocabulary();
  let totalPage = Math.ceil(VocabularyList.length / perPage);
  if (page < 1 || page > totalPage) return;
  currentPage = page;
  renderWord();
  renderPageNumber();
}
function nextPage() {
  let VocabularyList = getFilteredVocabulary();
  let totalPage = Math.ceil(VocabularyList.length / perPage);
  if (currentPage < totalPage) {
    currentPage++;
    renderWord();
    renderPageNumber();
  }
}
function PreviousPage() {
  if (currentPage > 1) {
    currentPage--;
    renderWord();
    renderPageNumber();
  }
}
renderSelect();
renderWord();
renderPageNumber();
