function login(e) {
  e.preventDefault();
  let usersList = JSON.parse(localStorage.getItem("usersList")) || [];
  let emailLogin = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();
  let checkUsere = usersList.find((item) => item.email === emailLogin && item.pass === password);
  if (!emailLogin || !password) {
    document.getElementById("error").textContent = "Email hoặc Password không được để trống";
    return;
  }
  if (!checkUsere) {
    document.getElementById("error").textContent = "Email hoặc Password không đúng";
    return;
  }
  let loggedInAccount = localStorage.setItem("loggedInAccount", JSON.stringify(checkUsere)); // lưu thông tin đăng nhập
  window.location.href = "http://127.0.0.1:5500/pages/dashBoard.html";
  document.getElementById("loginForm").reset();
}
// hàm bấm nút register ở nav
function registerNav(e) {
  e.preventDefault();
  window.location.href = "http://127.0.0.1:5500/pages/register.html";
}
