function registerForm(e) {
  e.preventDefault();
  let usersList = JSON.parse(localStorage.getItem("usersList")) || [];
  let firstName = document.getElementById("firstName").value.trim();
  let lastName = document.getElementById("lastName").value.trim();
  let emailRegister = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();
  let confirm = document.getElementById("confirm").value.trim();
  // Kiểm tra nếu có bất kỳ ô nào bị bỏ trống
  if (!firstName || !lastName || !emailRegister || !password || !confirm) {
    document.getElementById("error").textContent = "Thông tin đăng ký không được để trống";
    return;
  }
  // Kiểm tra định dạng email
  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  if (!gmailRegex.test(emailRegister)) {
    document.getElementById("error").textContent = "Email phải đúng định dạng @gmail.com";
    return;
  }
  // Kiểm tra xem email đã tồn tại chưa
  let checkEmail = usersList.find((item) => item.email.toLowerCase() === emailRegister.toLowerCase());
  if (checkEmail) {
    document.getElementById("error").textContent = "Email đăng ký đã tồn tại";
    return;
  }
  // Kiểm tra độ mạnh của mật khẩu
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!passwordRegex.test(password)) {
    document.getElementById("error").textContent = "Mật khẩu phải có ít nhất 8 ký tự, gồm chữ hoa, chữ thường và số";
    return;
  }
  // Kiểm tra mật khẩu xác nhận
  if (password !== confirm) {
    document.getElementById("error").textContent = "Mật khẩu xác nhận chưa chính xác";
    return;
  }
  // Lưu thông tin người dùng
  usersList.push({
    firstName: firstName,
    lastName: lastName,
    email: emailRegister,
    pass: password,
  });
  localStorage.setItem("usersList", JSON.stringify(usersList));
  document.getElementById("registerForm").reset(); // xoá toàn bộ thông tin ở các ô input
  showToast("Đăng ký thành công!");
  setTimeout(() => {
    window.location.href = "http://127.0.0.1:5500/pages/login.html";
  }, 1000);
}
//hàm bấm vào nút login ở nav
function loginNav(e) {
  e.preventDefault();
  window.location.href = "http://127.0.0.1:5500/pages/login.html";
}
// hộp thoại thông báo
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.remove("hidden");
  setTimeout(() => {
    toast.classList.add("hidden");
  }, 2000);
}
