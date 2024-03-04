// query selectors buttons
const registerBtn = document.querySelector("#registerBtn");
const loginBtn = document.querySelector("#loginBtn");
const closeModalBtn = document.querySelector("#closeModalBtn");
const registerUserBtn = document.querySelector("#registerUserBtn");

// query selectors user input
const usernameInput = document.querySelector("#usernameInput");
const passwordInput = document.querySelector("#passwordInput");
const registerUser = document.querySelector("#registerUser");
const registerPassword = document.querySelector("#registerPassword");

// query selectors FOR ALL REQUIRED INPUT FIELDS // TODO: rewrite this failed login logic for displaying error message and focusing input field
const allInputs = document.querySelectorAll("input[type='text']");
const allInputsPWs = document.querySelectorAll("input[type='password']");

// query selectors containers and messages
const registerModal = document.querySelector("#registerModal");
const overlayContainer = document.querySelector(".overlayContainer");
const errorMessage = document.querySelector(".error-message");
const registerMsg = document.querySelector(".registerMsg");
const requiredFields = document.querySelectorAll(".required");

// array to store users and parse users stored in localstorage
let users = JSON.parse(localStorage.getItem("users")) || [];

// create new user object function
const newUser = (username, password) => {
  return {
    username,
    password,
  };
};

// function to validate user
const validateUser = (array, username, password) => {
  let isValidUser = false;
  array.forEach((user) => {
    if (user.username === username && user.password === password) {
      //redirect to startpage on success
      window.location.href = "assets/html/startpage.html";
      console.log(username);
      localStorage.setItem("currentUser", username);
      localStorage.setItem("isLoggedIn", "true");
      isValidUser = true;
    }
  });
  //failed login is only run if no matching user is found
  if (!isValidUser) {
    failedLogin();
  }
};

// function to check if username is taken
const isUsernameTaken = (nameToCheck, userList) => {
  return userList.some((user) => user.username == nameToCheck);
};

// function to register user, store user object in array and add to local storage
const storeUser = () => {
  //check if username is already taken, parse user input to lowercase
  if (isUsernameTaken(registerUser.value.toLowerCase(), users)) {
    registerMsg.textContent = "Username is taken, please choose another.";
    registerMsg.classList.add("warning");
    registerUser.value = "";
    registerPassword.value = "";
  } else {
    if (registerUser.value != "" && registerPassword.value != "") {
      let user = newUser(
        //store username as lowercase always
        registerUser.value.toLowerCase(),
        registerPassword.value
      );
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
      registerModal.classList.toggle("hidden");
      overlayContainer.classList.toggle("overlay");
      registerUser.value = "";
      registerPassword.value = "";
    } else {
      failedLogin();
    }
  }
};

// function to render failed login attempt message
const failedLogin = () => {
  console.log("failedLogin function körs");
  requiredFields.forEach((field) => {
    field.style.color = "red";
  });
  // errorMessage.innerHTML = "";
  // let p = document.createElement("p");
  // p.innerText = `Login attempt failed!`;
  // errorMessage.append(p);
  if (usernameInput.value == "" && registerUser.value == "") {
    allInputs.forEach((input) => {
      input.focus();
      input.classList.add("failed");
    });
    // usernameInput.focus();
    // usernameInput.classList.add("failed");
  } else {
    allInputsPWs.forEach((input) => {
      input.focus();
      input.classList.add("failed");
    });
    // passwordInput.focus();
    // passwordInput.classList.add("failed");
  }
};

// login button event listener
loginBtn.addEventListener("click", () => {
  // check if there are registered users
  if (users.length >= 1) {
    validateUser(users, usernameInput.value.toLowerCase(), passwordInput.value);
  } else {
    failedLogin();
  }
});

// event listener to login using enter key
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && registerModal.classList.contains("hidden")) {
    if (users.length >= 1) {
      validateUser(
        users,
        usernameInput.value.toLowerCase(),
        passwordInput.value
      );
    } else {
      failedLogin();
    }
  } else if (
    event.key === "Enter" &&
    !registerModal.classList.contains("hidden")
  ) {
    storeUser();
  }
});

//register button event listener
registerBtn.addEventListener("click", () => {
  registerModal.classList.toggle("hidden");
  overlayContainer.classList.toggle("overlay");
});

// close modal button event listener
closeModalBtn.addEventListener("click", () => {
  registerModal.classList.toggle("hidden");
  overlayContainer.classList.toggle("overlay");
});

// register new user event listener
registerUserBtn.addEventListener("click", () => {
  storeUser();
});
