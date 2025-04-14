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
    document.getElementById("error").textContent = "Thông tin đăng nhập không hợp lệ";
    return;
  }
  let account = {
    email: checkUsere.email,
    firstName: checkUsere.firstName,
    lastName: checkUsere.lastName,
  };
  localStorage.setItem("loggedInAccount", JSON.stringify(account)); // lưu thông tin đăng nhập
  document.getElementById("loginForm").reset();
  showToast("Đăng nhập thành công");
  setTimeout(() => {
    window.location.href = "http://127.0.0.1:5500/pages/dashBoard.html";
  }, 1000);
}
// hàm bấm nút register ở nav
function registerNav(e) {
  e.preventDefault();
  window.location.href = "http://127.0.0.1:5500/pages/register.html";
}

function showToast(message) {
  let toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.remove("hidden");
  setTimeout(() => {
    toast.classList.add("hidden");
  }, 2000);
}
