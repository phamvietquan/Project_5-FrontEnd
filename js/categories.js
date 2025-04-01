document.addEventListener("DOMContentLoaded", function () {
  let table = document.getElementById("table-category"); // lấy ra bảng

  // Modal Thêm
  let addCategoryModal = new bootstrap.Modal(document.getElementById("addCategoryModal")); // Điều khiển modal thêm danh mục
  let addCategoryButton = document.getElementById("btn-add-cate"); //Nút mở modal "Thêm Danh Mục".
  let addCategorySaveButton = document.getElementById("addCategorySave"); //Nút "Save" để lưu danh mục mới
  let addCategoryName = document.getElementById("addCategoryName"); //Ô nhập tên danh mục.
  let addCategoryDescription = document.getElementById("addCategoryDescription"); //Ô nhập mô tả danh mục

  // Modal Sửa
  let editCategoryModal = new bootstrap.Modal(document.getElementById("editCategoryModal")); // Điều khiển modal chỉnh sửa danh mục
  let editCategorySaveButton = document.getElementById("editCategorySave"); //Nút "Save" để lưu chỉnh sửa.
  let editCategoryName = document.getElementById("editCategoryName"); //Ô nhập tên danh mục khi sửa.
  let editCategoryDescription = document.getElementById("editCategoryDescription"); // Ô nhập mô tả danh mục khi sửa
  let editingRow = null; //Biến này lưu trữ dòng (<tr>) đang được chỉnh sửa.

  // Modal Xóa
  let deleteCategoryModal = new bootstrap.Modal(document.getElementById("deleteCategoryModal")); //Điều khiển modal xác nhận xóa danh mục.
  let confirmDeleteButton = document.getElementById("confirmDelete"); //Nút "Delete" để xác nhận xóa danh mục.

  //  Đọc dữ liệu từ localStorage khi trang tải lại
  function loadCategories() {
    let categories = JSON.parse(localStorage.getItem("categories")) || [];

    // Xóa hết dữ liệu cũ (giữ lại hàng tiêu đề)
    let rows = table.getElementsByTagName("tr");
    while (rows.length > 1) {
      table.deleteRow(1);
    }

    // Thêm từng danh mục vào bảng
    categories.forEach((category) => {
      addCategoryToTable(category.name, category.description);
    });
  }

  //  Lưu dữ liệu vào localStorage
  function saveCategories() {
    let categories = [];
    table.querySelectorAll("tr").forEach((row, index) => {
      if (index === 0) return; // Bỏ qua hàng tiêu đề
      let name = row.cells[0].textContent;
      let description = row.cells[1].textContent;
      categories.push({ name, description });
    });

    localStorage.setItem("categories", JSON.stringify(categories));
  }

  //  Mở modal Thêm Danh Mục
  addCategoryButton.addEventListener("click", function () {
    addCategoryName.value = "";
    addCategoryDescription.value = "";
    addCategoryModal.show();
  });

  //  Xử lý khi nhấn "Save" trên modal thêm
  addCategorySaveButton.addEventListener("click", function () {
    let name = addCategoryName.value.trim();
    let description = addCategoryDescription.value.trim();

    if (!name) {
      alert("Vui lòng nhập tên danh mục!");
      return;
    }

    addCategoryToTable(name, description);
    saveCategories();
    addCategoryModal.hide();
  });

  //  Thêm danh mục vào bảng (không gọi localStorage ở đây)
  function addCategoryToTable(name, description) {
    let row = table.insertRow(-1);
    row.innerHTML = `
        <td>${name}</td>
        <td>${description || ""}</td>
        <td>
          <a href="#" class="blue-link" onclick="editCategory(this)">Edit</a>
          <a href="#" class="red-link" onclick="confirmDeleteCategory(this)">Delete</a>
        </td>
      `;
  }

  //  Mở modal Sửa Danh Mục
  window.editCategory = function (element) {
    editingRow = element.closest("tr");
    editCategoryName.value = editingRow.cells[0].textContent;
    editCategoryDescription.value = editingRow.cells[1].textContent;
    editCategoryModal.show();
  };

  //  Lưu chỉnh sửa danh mục
  editCategorySaveButton.addEventListener("click", function () {
    if (editingRow) {
      editingRow.cells[0].textContent = editCategoryName.value;
      editingRow.cells[1].textContent = editCategoryDescription.value;
      saveCategories(); // Cập nhật localStorage sau khi chỉnh sửa
    }
    editCategoryModal.hide();
  });

  //  Mở modal Xóa
  window.confirmDeleteCategory = function (element) {
    editingRow = element.closest("tr");
    deleteCategoryModal.show();
  };

  //  Xác nhận xóa danh mục
  confirmDeleteButton.addEventListener("click", function () {
    if (editingRow) {
      editingRow.remove();
      editingRow = null;
      saveCategories(); // Cập nhật lại localStorage sau khi xóa
    }
    deleteCategoryModal.hide();
  });
  // Tìm kiếm danh mục theo tên
  searchInput.addEventListener("input", function () {
    let filter = searchInput.value.toLowerCase();
    let rows = table.getElementsByTagName("tr");

    for (let i = 1; i < rows.length; i++) {
      let name = rows[i].cells[0].textContent.toLowerCase();
      rows[i].style.display = name.includes(filter) ? "" : "none";
    }
  });
  //  Load dữ liệu khi trang mở
  loadCategories();
});
