function renderCategory() {
  let categoryList = JSON.parse(localStorage.getItem("categoryList")) || [];
  let select = document.getElementById("category-select");
  select.innerHTML = `<option>All categories</option>`;
  categoryList.forEach((element) => {
    select.innerHTML += `<option>${element.name}</option>`;
  });
}
renderCategory();
