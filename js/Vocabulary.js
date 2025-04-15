//ktra đăng nhập
document.addEventListener("DOMContentLoaded", function () {
  // khi trang html load xong
  let loggedInAccount = JSON.parse(localStorage.getItem("loggedInAccount"));
  if (!loggedInAccount) {
    window.location.href = "http://127.0.0.1:5500/pages/login.html";
    return;
  }
  renderCategorySelect(); //hiển thị ra select
  renderVocabulary(); // hiển thị danh sách
  renderPageNumber(); // hiển thị phân trang
});
// hàm render lại categorry
function renderCategorySelect() {
  let categoryList = JSON.parse(localStorage.getItem("categoryList")) || [];
  let selectVocabulary = document.getElementById("select-vocabulary");
  if (!selectVocabulary) return;
  selectVocabulary.innerHTML = `<option value="">All Categories</option>`;
  categoryList.forEach((option) => {
    selectVocabulary.innerHTML += `<option>${option.name}</option>`;
  });
}
// gắn sự kiện input khi nhận vào ô search
document.getElementById("search").addEventListener("input", function () {
  renderVocabulary(1);
  renderPageNumber();
});
//gắn sự kiện change khi lựa chọn select
document.getElementById("select-vocabulary").addEventListener("change", function () {
  renderVocabulary(1);
  renderPageNumber();
});
//hàm hiển thị danh sách từ vựng
function renderVocabulary(page) {
  currentPage = page || currentPage;
  let VocabularyList = JSON.parse(localStorage.getItem("VocabularyList")) || [];
  let tbody = document.getElementById("tbody");
  tbody.innerHTML = "";
  // search
  let inputSearch = document.getElementById("search").value.toLowerCase().trim();
  let search = VocabularyList;
  if (inputSearch) {
    search = VocabularyList.filter((el) => el.word.toLowerCase().includes(inputSearch));
  }
  //chọn danh mục từ
  let selectedCategory = document.getElementById("select-vocabulary").value.trim();
  if (selectedCategory !== "") {
    search = search.filter((el) => el.category.trim().toLowerCase() === selectedCategory.toLowerCase());
  }
  let totalPage = Math.ceil(search.length / perPage);
  if (currentPage > totalPage) currentPage = 1;
  let start = (currentPage - 1) * perPage;
  let end = start + perPage;
  let users = search.slice(start, end);
  users.forEach((item) => {
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.word}</td>
      <td>${item.meaning}</td>
      <td>${item.category}</td>
      <td>
        <a class="blue-link" data-bs-toggle="modal" data-bs-target="#editWordModal" onclick="prepareEdit(${item.id})">Edit</a>
        <a class="red-link" data-bs-toggle="modal" data-bs-target="#deleteWordModal" onclick="prepareDelete(${item.id})">Delete</a>
      </td>
    `;
    tbody.appendChild(row);
  });
}
// thêm từ
function addVocabulary() {
  let modal = bootstrap.Modal.getInstance(document.getElementById("addWordModal"));
  let VocabularyList = JSON.parse(localStorage.getItem("VocabularyList")) || []; // lấy ra mảng từ vựng
  let categoryList = JSON.parse(localStorage.getItem("categoryList")) || []; // lấy ra mảng chứa danh mục
  let inputWord = document.getElementById("wordInput").value.trim();
  let inputMeaning = document.getElementById("meaningInput").value.trim();
  let inputCategory = document.getElementById("categorySelect").value.trim();
  let errorWord = document.getElementById("errorWord");
  let errorMeaning = document.getElementById("errorMeaning");
  let errorCategory = document.getElementById("errorCategory");
  // Kiểm tra dữ liệu nhập vào Word
  if (!inputWord) {
    errorWord.textContent = "Vui lòng nhập đầy đủ thông tin !";
    return;
  } else {
    errorWord.textContent = "";
  }
  // Kiểm tra dữ liệu nhập vào Meaning
  if (!inputMeaning) {
    errorMeaning.textContent = "Vui lòng nhập đầy đủ thông tin !";
    return;
  } else {
    errorMeaning.textContent = "";
  }
  // Kiểm tra dữ liệu nhập vào Category
  if (!inputCategory) {
    errorCategory.textContent = "Vui lòng nhập đầy đủ thông tin !";
    return;
  } else {
    errorCategory.textContent = "";
  }
  // Kiểm tra từ đã tồn tại chưa (tránh trùng)
  let isDuplicate = VocabularyList.some((item) => item.word.toLowerCase() === inputWord.toLowerCase());
  if (isDuplicate) {
    errorWord.textContent = "Từ này đã có trong danh sách !";
    return;
  } else {
    errorWord.textContent = "";
  }
  // Thêm từ mới vào danh sách
  VocabularyList.push({
    id: VocabularyList.length > 0 ? VocabularyList[VocabularyList.length - 1].id + 1 : 1,
    word: inputWord,
    meaning: inputMeaning,
    category: inputCategory,
  });
  let checkCategory = categoryList.find((el) => el.name.toLowerCase() === inputCategory.toLowerCase());
  if (!checkCategory) {
    categoryList.push({
      id: categoryList.length > 0 ? categoryList[categoryList.length - 1].id + 1 : 1,
      name: inputCategory,
      description: "",
    });
  }
  // Lưu vào localStorage
  localStorage.setItem("VocabularyList", JSON.stringify(VocabularyList));
  localStorage.setItem("categoryList", JSON.stringify(categoryList));
  // Cập nhật giao diện
  renderVocabulary();
  renderPageNumber();
  renderCategorySelect();
  // Đóng modal
  modal.hide();
  // Reset form sau khi thêm
  document.getElementById("form-modal-add").reset();
}
// hàm lưu id để sửa
let currentIdEdit = -1;
function prepareEdit(id) {
  let VocabularyList = JSON.parse(localStorage.getItem("VocabularyList")) || [];
  currentIdEdit = id;
  let itemToEdit = VocabularyList.find((item) => item.id === currentIdEdit);
  if (itemToEdit) {
    document.getElementById("editWordInput").value = itemToEdit.word;
    document.getElementById("editMeaningInput").value = itemToEdit.meaning;
    document.getElementById("editCategorySelect").value = itemToEdit.category;
  }
}
// Hàm sửa từ
function editVocabulary() {
  let modal = bootstrap.Modal.getInstance(document.getElementById("editWordModal"));
  let VocabularyList = JSON.parse(localStorage.getItem("VocabularyList")) || [];
  let inputWord = document.getElementById("editWordInput").value.trim();
  let inputMeaning = document.getElementById("editMeaningInput").value.trim();
  let inputCategory = document.getElementById("editCategorySelect").value.trim();
  // lấy ra 3 chỗ hiển thị lỗi
  let errorWord = document.getElementById("errorWord");
  let errorMeaning = document.getElementById("errorMeaning");
  let errorCategory = document.getElementById("errorCategory");

  if (!inputWord) {
    errorWord.textContent = "Vui lòng nhập đầy đủ thông tin !";
    return;
  } else {
    errorWord.textContent = "";
  }
  if (!inputMeaning) {
    errorMeaning.textContent = "Vui lòng nhập đầy đủ thông tin !";
    return;
  } else {
    errorMeaning.textContent = "";
  }
  if (!inputCategory) {
    errorCategory.textContent = "Vui lòng nhập đầy đủ thông tin !";
    return;
  } else {
    errorCategory.textContent = "";
  }
  // duyệt qua mảng xem từ đã có trong danh sách chưa
  let isDuplicate = VocabularyList.some(
    (item) => item.word.toLowerCase() === inputWord.toLowerCase() && item.id !== currentIdEdit
  );
  if (isDuplicate) {
    errorWord.textContent = "Từ này đã có trong danh sách !";
    return;
  } else {
    errorWord.textContent = "";
  }
  // duyệt qua mảng tìm ra phần tử có id đó
  let itemIndex = VocabularyList.find((item) => item.id === currentIdEdit);
  if (itemIndex) {
    itemIndex.word = inputWord;
    itemIndex.meaning = inputMeaning;
    itemIndex.category = inputCategory;
    localStorage.setItem("VocabularyList", JSON.stringify(VocabularyList));
    renderVocabulary();
    document.getElementById("form-modal-edit").reset(); //reset lại form
    // đóng modal
    modal.hide();
  }
  let categoryList = JSON.parse(localStorage.getItem("categoryList")) || [];
  VocabularyList.forEach((voca) => {
    let checkCategory = categoryList.find((el) => el.name.toLowerCase() === voca.category.toLowerCase());
    if (!checkCategory) {
      categoryList.push({
        id: categoryList.length > 0 ? categoryList[categoryList.length - 1].id + 1 : 1,
        name: voca.category,
        description: "",
      });
    }
  });
  let usersCategory = VocabularyList.map((item) => item.category.toLowerCase());
  categoryList = categoryList.filter((el) => usersCategory.includes(el.name.toLowerCase()));
  localStorage.setItem("categoryList", JSON.stringify(categoryList)); // Lưu lại danh mục mới
}
// lấy ra index để xoá
let currentIdDelete = -1;
function prepareDelete(id) {
  currentIdDelete = id;
}
// hàm xoá
function deleteVocabulary() {
  let modal = bootstrap.Modal.getInstance(document.getElementById("deleteWordModal"));
  let VocabularyList = JSON.parse(localStorage.getItem("VocabularyList")) || [];
  let itemIndex = VocabularyList.findIndex((item) => item.id === currentIdDelete);
  if (itemIndex !== -1) {
    VocabularyList.splice(itemIndex, 1);
    localStorage.setItem("VocabularyList", JSON.stringify(VocabularyList));
    renderVocabulary();
    // đóng modal
    modal.hide();
  }
  let categoryList = JSON.parse(localStorage.getItem("categoryList")) || [];
  VocabularyList.forEach((voca) => {
    let checkCategory = categoryList.find((el) => el.name.toLowerCase() === voca.category.toLowerCase());
    if (!checkCategory) {
      categoryList.push({
        id: categoryList.length > 0 ? categoryList[categoryList.length - 1].id + 1 : 1,
        name: voca.category,
        description: "",
      });
    }
  });
  let usersCategory = VocabularyList.map((item) => item.category.toLowerCase());
  categoryList = categoryList.filter((el) => usersCategory.includes(el.name.toLowerCase()));
  localStorage.setItem("categoryList", JSON.stringify(categoryList)); // Lưu lại danh mục mới
  renderPageNumber();
  renderVocabulary();
  renderCategorySelect();
}
// hàm phân trang
let currentPage = 1;
let perPage = 3;
function renderPageNumber() {
  let VocabularyList = JSON.parse(localStorage.getItem("VocabularyList")) || [];
  // Lọc theo search input
  let filteredList = VocabularyList;
  let inputSearch = document.getElementById("search").value.toLowerCase().trim();
  if (inputSearch) {
    filteredList = filteredList.filter((el) => el.word.toLowerCase().includes(inputSearch));
  }

  // Lọc theo danh mục
  let selectedCategory = document.getElementById("select-vocabulary").value.trim();
  if (selectedCategory !== "") {
    filteredList = filteredList.filter((el) => el.category.trim().toLowerCase() === selectedCategory.toLowerCase());
  }
  let ul = document.getElementById("pagination");
  ul.innerHTML = "";
  let totalPage = Math.ceil(filteredList.length / perPage);
  ul.innerHTML += `<li onclick="prePage()" style="width:80px; opacity:${
    currentPage === 1 ? "0.5" : "1"
  }">Previous</li>`;
  for (let i = 1; i <= totalPage; i++) {
    ul.innerHTML += `<li onclick="changePage(${i})" style="background-color: ${
      i === currentPage ? "#007bff" : "transparent"
    };
    color: ${i === currentPage ? "#fff" : "#000"}">${i}</li>`;
  }
  ul.innerHTML += `<li onclick="nextPage()" style="width:50px;opacity:${
    currentPage === totalPage ? "0.5" : "1"
  }">Next</li>`;
}
function changePage(page) {
  let VocabularyList = JSON.parse(localStorage.getItem("VocabularyList")) || [];
  let totalPage = Math.ceil(VocabularyList.length / perPage);
  if (page < 1 || page > totalPage) return;
  currentPage = page;
  renderVocabulary();
  renderPageNumber();
}
function prePage() {
  if (currentPage > 1) {
    currentPage--;
    renderVocabulary();
    renderPageNumber();
  }
}
function nextPage() {
  let VocabularyList = JSON.parse(localStorage.getItem("VocabularyList")) || [];
  let totalPage = Math.ceil(VocabularyList.length / perPage);
  if (currentPage < totalPage) {
    currentPage++;
    renderVocabulary();
    renderPageNumber();
  }
}
