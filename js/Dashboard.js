let name = JSON.parse(localStorage.getItem("loggedInAccount")) || [];
// lấy tên đăng nhập để chào
let p = document.getElementById("name");
p.textContent = `Hi, ${name.lastName} ${name.firstName}`;
// lấy tên đăng để thông báo
let h1 = document.getElementById("title");
h1.textContent = `Chào mừng bạn đã quay lại học, ${name.lastName} ${name.firstName}!`;
// khi bấm vào nút logOut
function logOut(e) {
  e.preventDefault();
  let check = confirm("Bạn có chắc chắn muốn đăng xuất không?");
  if (check) {
    window.location.href = "http://127.0.0.1:5500/pages/login.html";
  }
}
//Khi bấm vào nút làm quizz
function playQuiz() {}
