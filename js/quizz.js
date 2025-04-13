let word = document.getElementById("word");
document.getElementById("true").addEventListener("click", function () {
  this.classList.add("correct");
});
document.getElementById("false").addEventListener("click", function () {
  this.classList.add("incorrect");
});
function renderCategory() {
  let categoryList = JSON.parse(localStorage.getItem("categoryList")) || [];
  let select = document.getElementById("category-select");
  select.innerHTML = `<option>All categories</option>`;
  categoryList.forEach((element) => {
    select.innerHTML += `<option>${element.name}</option>`;
  });
}
renderCategory();
