function login(password) {
  if (password === "1234") {
    localStorage.setItem("auth", "true");
    location.href = "admin.html";
  } else {
    alert("رمز اشتباه است!");
  }
}

function logout() {
  localStorage.removeItem("auth");
  location.href = "index.html";
}

function checkAuth() {
  if (!localStorage.getItem("auth")) {
    alert("ابتدا وارد شوید!");
    location.href = "login.html";
  }
}
