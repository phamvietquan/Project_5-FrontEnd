function register(e) {
  e.preventDefault();
  let usersList = JSON.parse(localStorage.getItem("usersList")) || [];
  let firstName = document.getElementById("firstName").value.trim();
  let lastName = document.getElementById("lastName").value.trim();
  let emailRegister = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();
  let confirm = document.getElementById("confirm").value.trim();
  // Kiểm tra nếu có bất kỳ ô nào bị bỏ trống
  if (!firstName || !lastName || !emailRegister || !password || !confirm) {
    alert("Thông tin đăng ký không được để trống");
    return;
  }
  // Kiểm tra định dạng email
  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  if (!gmailRegex.test(emailRegister)) {
    alert("Email phải đúng định dạng @gmail.com");
    return;
  }
  // Kiểm tra xem email đã tồn tại chưa
  let checkEmail = usersList.find((item) => item.email.toLowerCase() === emailRegister.toLowerCase());
  if (checkEmail) {
    alert("Email đăng ký đã tồn tại");
    return;
  }
  // Kiểm tra độ mạnh của mật khẩu
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!passwordRegex.test(password)) {
    alert("Mật khẩu phải có ít nhất 8 ký tự, gồm chữ hoa, chữ thường và số");
    return;
  }
  // Kiểm tra mật khẩu xác nhận
  if (password !== confirm) {
    alert("Mật khẩu xác nhận chưa chính xác");
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
  alert("Đăng ký thành công");
  window.location.href = "http://127.0.0.1:5500/New%20folder/logIn.html";
}
