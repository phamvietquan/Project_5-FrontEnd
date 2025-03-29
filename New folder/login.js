function login(e) {
  e.preventDefault();
  let usersList = JSON.parse(localStorage.getItem("usersList")) || [];
  let emailLogin = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();
  let checkUsere = usersList.find((item) => item.email === emailLogin && item.pass === password);
  if (!emailLogin || !password) {
    alert("Email hoặc Password không được để trống");
    return;
  }
  if (!checkUsere) {
    alert("Email hoặc Password không đúng");
    return;
  }
  window.location.href =
    "https://docs.google.com/spreadsheets/d/1QFE_q66jNgFCoh8ArtcwYaeSYqntXfeveEftWWdYssI/edit?gid=243401149#gid=243401149";
}
