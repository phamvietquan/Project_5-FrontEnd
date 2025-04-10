//ktra đăng nhập
document.addEventListener("DOMContentLoaded", function () {
  // khi trang html load xong
  let loggedInAccount = localStorage.getItem("loggedInAccount");
  if (!loggedInAccount) {
    window.location.href = "http://127.0.0.1:5500/pages/login.html";
  }
  renderCategori(); // hiển thị ra danh sach
  renderPageNumber(); // hiển thị ra phân trang
});
// gắn sự kiện input khi nhận vào ô search
document.getElementById("search").addEventListener("input", function () {
  renderCategori();
});
// hàm hiển thị danh sách
function renderCategori(page) {
  currentPage = page || currentPage;
  let categoryList = JSON.parse(localStorage.getItem("categoryList")) || []; // lấy ra mảng chứa danh mục
  // tìm kiếm
  let inputSearch = document.getElementById("search").value.toLowerCase().trim();
  let search = categoryList;
  if (inputSearch) {
    search = categoryList.filter((el) => el.name.toLowerCase().includes(inputSearch));
  }
  let tbody = document.getElementById("tbody-category");
  tbody.innerHTML = "";
  let totalPage = Math.ceil(search.length / perPage);
  if (currentPage > totalPage) currentPage = 1;
  let start = (currentPage - 1) * perPage;
  let end = start + perPage;
  users = search.slice(start, end);
  users.forEach((item, index) => {
    let tr = document.createElement("tr");
    tr.innerHTML += `<td>${item.name}</td>
            <td>${item.description || ""}</td>
            <td>
              <a href="#" class="blue-link" data-bs-toggle="modal" data-bs-target="#editCategoryModal" onclick="prepareEdit(${
                item.id
              })">Edit</a>
              <a href="#" class="red-link" data-bs-toggle="modal" data-bs-target="#deleteCategoryModal" onclick="prePageDelete(${
                item.id
              })">Delete</a>
            </td>`;
    tbody.appendChild(tr);
  });
}
// hàm thêm
function addCategory() {
  let modal = bootstrap.Modal.getInstance(document.getElementById("addCategoryModal"));
  let categoryList = JSON.parse(localStorage.getItem("categoryList")) || []; // lấy ra mảng chứa danh mục
  let inputName = document.getElementById("addCategoryName").value.trim();
  let inputDescription = document.getElementById("addCategoryDescription").value.trim();
  let errorName = document.getElementById("errorName");
  if (!inputName) {
    errorName.textContent = "Vui lòng nhập đầy đủ thông tin !";
    return;
  } else {
    errorName.textContent = "";
  }
  let checkName = categoryList.some((item) => item.name.toLowerCase() === inputName.toLowerCase());
  if (checkName) {
    errorName.textContent = "Danh mục này đã có trong danh sách";
    return;
  }
  categoryList.push({
    id: categoryList.length > 0 ? categoryList[categoryList.length - 1].id + 1 : 1,
    name: inputName,
    description: inputDescription,
  });
  localStorage.setItem("categoryList", JSON.stringify(categoryList));
  // Đóng modal
  modal.hide();
  // Reset form sau khi thêm
  document.querySelector("#form-modal-add").reset();
  currentPage = Math.ceil(categoryList.length / perPage);
  renderCategori();
  renderPageNumber();
}
// hàm lưu lưu id sửa
let currentIdEdit = -1;
function prepareEdit(id) {
  currentIdEdit = id;
  let categoryList = JSON.parse(localStorage.getItem("categoryList")) || [];
  let categoryEdit = categoryList.find((item) => item.id === currentIdEdit);
  if (categoryEdit) {
    document.getElementById("editCategoryName").value = categoryEdit.name;
    document.getElementById("editCategoryDescription").value = categoryEdit.description;
  }
}
// hàm sửa category
function editCategory() {
  let modal = bootstrap.Modal.getInstance(document.getElementById("editCategoryModal"));
  let categoryList = JSON.parse(localStorage.getItem("categoryList")) || [];
  let inputName = document.getElementById("editCategoryName").value.trim();
  let inputDescription = document.getElementById("editCategoryDescription").value.trim();
  let errorName = document.getElementById("errorName");
  if (!inputName) {
    errorName.textContent = "Vui lòng nhập đầy đủ thông tin !";
    return;
  } else {
    errorName.textContent = "";
  }
  let checkName = categoryList.some((item) => item.name.toLowerCase() === inputName.toLowerCase());
  if (checkName) {
    errorName.textContent = "Danh mục này đã có trong danh sách";
    return;
  }
  let checkCategory = categoryList.find((item) => item.id === currentIdEdit);
  if (checkCategory) {
    checkCategory.name = inputName;
    checkCategory.description = inputDescription;
    localStorage.setItem("categoryList", JSON.stringify(categoryList));
    renderCategori();
    // đóng modal
    modal.hide();
  }
}
// hàm lưu id xoá
let currentIdDelete = -1;
function prePageDelete(id) {
  currentIdDelete = id;
}
// hàm xoá
function deleteCategory() {
  let modal = bootstrap.Modal.getInstance(document.getElementById("deleteCategoryModal"));
  let categoryList = JSON.parse(localStorage.getItem("categoryList")) || [];
  let itemIndex = categoryList.findIndex((el) => el.id === currentIdDelete);
  if (itemIndex !== -1) {
    categoryList.splice(itemIndex, 1);
    localStorage.setItem("categoryList", JSON.stringify(categoryList));
    let totalPage = Math.ceil(categoryList.length / perPage);
    if (currentPage > totalPage) currentPage = totalPage;
    renderCategori();
    renderPageNumber();
    // đóng modal
    modal.hide();
  }
}
// hàm phân trang
let currentPage = 1;
let perPage = 3;
function renderPageNumber() {
  let categoryList = JSON.parse(localStorage.getItem("categoryList")) || [];
  let ul = document.getElementById("pagination");
  ul.innerHTML = "";
  let totalPage = Math.ceil(categoryList.length / perPage);
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
  let categoryList = JSON.parse(localStorage.getItem("categoryList")) || [];
  let totalPage = Math.ceil(categoryList.length / perPage);
  if (page < 1 || page > totalPage) return;
  currentPage = page;
  renderCategori();
  renderPageNumber();
}
function prePage() {
  if (currentPage > 1) {
    currentPage--;
    renderCategori();
    renderPageNumber();
  }
}
function nextPage() {
  let categoryList = JSON.parse(localStorage.getItem("categoryList")) || [];
  let totalPage = Math.ceil(categoryList.length / perPage);
  if (currentPage < totalPage) {
    currentPage++;
    renderCategori();
    renderPageNumber();
  }
}
renderCategori();
renderPageNumber();
