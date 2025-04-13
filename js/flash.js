let words = JSON.parse(localStorage.getItem("VocabularyList")) || [];
let categorySelect = document.getElementById("category-select");
let currentIndex = 0;
let learned = {};
// khi bấm chọn select
document.getElementById("category-select").addEventListener("change", function () {
  currentPage = 1;
  renderWord();
  renderPageNumber();
  currentIndex = 0;
  renderFlashcard();
  renderProgress();
});
// hiển thị từ trong thẻ
function renderFlashcard() {
  let categorySelect = document.getElementById("category-select").value;
  let VocabularyList = JSON.parse(localStorage.getItem("VocabularyList")) || [];
  let word = VocabularyList.filter((word) => word.category === categorySelect);
  if (word.length === 0) {
    document.getElementById("wordFlash").textContent = "Keyword";
    document.getElementById("meaningFlash").textContent = "Definition Explanation";
    return;
  }
  if (currentIndex >= word.length) {
    currentIndex = 0;
  } else if (currentIndex < 0) {
    currentIndex = word.length - 1;
  }
  document.getElementById("wordFlash").textContent = `${word[currentIndex].word}`;
  document.getElementById("meaningFlash").textContent = `${word[currentIndex].meaning}`;
}
// khi bấm nút next
document.getElementById("next").addEventListener("click", function () {
  currentIndex++;
  renderFlashcard();
});
// khi bấm nút pre
document.getElementById("previous").addEventListener("click", function () {
  currentIndex--;
  renderFlashcard();
});
// khi bấm nút đánh dấu đã học
document.getElementById("tick").addEventListener("click", function () {
  let categorySelect = document.getElementById("category-select").value;
  let VocabularyList = JSON.parse(localStorage.getItem("VocabularyList")) || [];
  let word = VocabularyList.filter((word) => word.category === categorySelect);
  if (word.length === 0) return;
  let currentWord = word[currentIndex].word;
  learned[currentWord] = true; // Cập nhật trạng thái learned trong phiên làm việc
  renderFlashcard();
  renderWord();
  renderProgress();
});
// cập nhập danh mục tronh select
function renderSelect() {
  let categoryList = JSON.parse(localStorage.getItem("categoryList")) || [];
  categorySelect.innerHTML = `<option value="all">All categories</option>`;
  categoryList.forEach((option) => {
    categorySelect.innerHTML += `<option value="${option.name}">${option.name}</option>`;
  });
}
// lấy ra danh sách từ
function getFilteredVocabulary() {
  let VocabularyList = JSON.parse(localStorage.getItem("VocabularyList")) || [];
  let selectedValue = categorySelect.value.trim().toLowerCase();
  if (selectedValue !== "all") {
    return VocabularyList.filter((el) => el.category.trim().toLowerCase() === selectedValue);
  }
  return VocabularyList;
}
// hiển thị từ ra bảng
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
            <td style="color:${learned[element.word] ? "green" : "black"}">${
      learned[element.word] ? " Learned" : "Not Learned"
    }</td>
           `;
    tbody.appendChild(row);
  });
}
// phân trang
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
// khi bấm vào từng trang
function changePage(page) {
  let VocabularyList = getFilteredVocabulary();
  let totalPage = Math.ceil(VocabularyList.length / perPage);
  if (page < 1 || page > totalPage) return;
  currentPage = page;
  renderWord();
  renderPageNumber();
}
// khi bấm next
function nextPage() {
  let VocabularyList = getFilteredVocabulary();
  let totalPage = Math.ceil(VocabularyList.length / perPage);
  if (currentPage < totalPage) {
    currentPage++;
    renderWord();
    renderPageNumber();
  }
}
// khi bấm pre
function PreviousPage() {
  if (currentPage > 1) {
    currentPage--;
    renderWord();
    renderPageNumber();
  }
}
// hiển thị % số từ đã học
function renderProgress() {
  let VocabularyList = getFilteredVocabulary(); //lấy ra danh sách
  let total = VocabularyList.length; // lấy ra tổng số từ
  let learnedCount = VocabularyList.filter((word) => learned[word.word]).length; // lấy ra nhưng từ đã đánh dấu học
  let percent = total === 0 ? 0 : Math.round((learnedCount / total) * 100); // biến lưu trữ số % của hanh tiến độ
  // Cập nhật text và thanh tiến độ
  document.getElementById("progress-text").textContent = `${learnedCount}/${total}`;
  document.getElementById("progress-bar").style.width = `${percent}%`;
}
// gọi hàm
renderSelect();
renderWord();
renderPageNumber();
