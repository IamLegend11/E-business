var chForm = document.getElementById("authForm");
var logBtn = document.getElementById("signInBtn");
var signBtn = document.getElementById("logInBtn");
var acc = document.getElementById("toggleText");
var emailIn = document.getElementById("email");
var passwordIn = document.getElementById("password");
var errorMsg = document.getElementById("errorMessage");
var title = document.getElementById("title");

function isValidEmail(email) {
  var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

acc.onclick = function () {
  logBtn.classList.add("off");
  signBtn.classList.remove("off");
  acc.classList.add("off");
  title.innerHTML = "Create an account";
};

function saveUser(email, password) {
  localStorage.setItem("userEmail", email);
  localStorage.setItem("userPassword", password);
}

function emailExists(email) {
  return localStorage.getItem("userEmail") === email;
}

function validateUser(email, password) {
  return (
    localStorage.getItem("userEmail") === email &&
    localStorage.getItem("userPassword") === password
  );
}

chForm.onsubmit = function (e) {
  e.preventDefault();

  var email = emailIn.value.trim();
  var password = passwordIn.value.trim();

  if (!email || !password) {
    errorMsg.textContent = "Please enter both email and password.";
    return;
  }

  if (!isValidEmail(email)) {
    errorMsg.textContent = "Please enter a valid email address.";
    return;
  }

  if (validateUser(email, password)) {
    errorMsg.textContent = "";
    alert("Login successful!");
  } else {
    errorMsg.textContent = "Invalid email or password.";
  }
};

toggleText.onclick = function (e) {
  e.preventDefault();

  logBtn.style.display = "none";
  signBtn.style.display = "inline-block";

  title.textContent = "Create a new account";
  errorMsg.textContent = "";

  acc.textContent = "Already have an account? Sign in";

  acc.onclick = switchToLogin;
};

function switchToLogin(e) {
  e.preventDefault();

  logBtn.style.display = "inline-block";
  signBtn.style.display = "none";

  title.textContent = "Login to your account";
  errorMsg.textContent = "";

  acc.textContent = "Don't have an account";

  acc.onclick = toggleTextHandler;
}

var toggleTextHandler = toggleText.onclick;

signBtn.onclick = function () {
  var email = emailIn.value.trim();
  var password = passwordIn.value.trim();

  if (!email || !password) {
    errorMsg.textContent = "All fields are required.";
    return;
  }

  if (!isValidEmail(email)) {
    errorMsg.textContent = "Please enter a valid email address.";
    return;
  }

  if (emailExists(email)) {
    errorMsg.textContent = "Account already exists. Please sign in.";
    return;
  }

  saveUser(email, password);

  alert("Account created successfully! Please sign in.");

  emailIn.value = "";
  passwordIn.value = "";
  errorMsg.textContent = "";

  logBtn.style.display = "inline-block";
  signBtn.style.display = "none";
  title.textContent = "Login to your account";
  acc.textContent = "Don't have an account";

  acc.onclick = toggleTextHandler;
};
