/ REGISTRATION FORM

let errorTexts = {};

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let formTrgt = event.target;

  const firstNamVal = document.getElementById("firstName").value;
  const lastNamVal = document.getElementById("lastName").value;
  const passwordValue = document.getElementById("passw").value;
  const repPasswVal = document.getElementById("repPassw").value;
  const agreeVal = document.getElementById("agree").checked;

  // const errorTxt = document.getElementsByClassName(`error_${}`);

  if (firstNamVal.length < 5 && firstNamVal.length > 0) {
    errorTexts.firstName = "The first name must be at least 5 characters.";
    // errorTxt.textContent = errorTexts.firstName;
  } else if (firstNamVal == "") {
    errorTexts.firstName = "The first name field is required";
  }

  if (lastNamVal.length < 5 && lastNamVal.length > 0) {
    errorTexts.lastName = "The last name must be at least 5 characters.";
  } else if (lastNamVal == "") {
    errorTexts.lastName = "The last name field is required";
  }

  if (passwordValue.length < 5 && passwordValue.length > 0) {
    errorTexts.password = "The password field must be at least 5 characters.";
  } else if (passwordValue == "") {
    errorTexts.password = "The password field is required";
  } else if (passwordValue !== repPasswVal) {
    errorTexts.repPassword = "Passwords don't match!";
  }
  // else if (repPasswVal == "") {
  //   errorTexts.repPassword = "The password field is required";
  // }

  console.log(errorTexts);

  let genderStatus = false;

  formTrgt.querySelectorAll("[name = 'gender']").forEach((element) => {
    if (element.checked) {
      genderStatus = true;
    }
  });
  if (!genderStatus) {
    errorTexts.gender = "Gender is required";
  }

  if (!agreeVal) {
    errorTexts.agree = "You should agree first before submitting!";
  }

  // document.querySelectorAll(".error-text").textContent = "";
  formTrgt.querySelectorAll(".error-text").forEach(function (element) {
    element.textContent = "";
  });

  for (let value in errorTexts) {
    const errorTxts = errorTexts[value];
    const errorTxt = document.getElementById(`error_${value}`);
    errorTxt.textContent = errorTxts;
  }

  if (Object.keys(errorTexts).length == 0) {
    formTrgt.submit();
  }

  // console.log(errorTexts);
});

// show/hide

const showHideI = document.getElementById("showHide");
const showHideI1 = document.getElementById("showHide1");

showHideI.addEventListener("click", function () {
  const passw = document.getElementById("passw");

  if (passw.type == "password") {
    passw.setAttribute("type", "text");
    showHideI.classList.add("fa-eye-slash");
  } else {
    passw.setAttribute("type", "password");
    showHideI.classList.remove("fa-eye-slash");
  }
});

showHideI1.addEventListener("click", function () {
  const repPassw = document.getElementById("repPassw");
  if (repPassw.type == "password") {
    repPassw.setAttribute("type", "text");
    showHideI1.classList.add("fa-eye-slash");
  } else {
    repPassw.setAttribute("type", "password");
    showHideI1.classList.remove("fa-eye-slash");
  }
});

// email validation

const email = document.getElementById("email");

email.addEventListener("keydown", function () {
  // params.preventDefault();
  const emailVal = email.value;
  const emailTxt = document.getElementById("text");
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (emailVal.match(emailRegex)) {
    emailTxt.textContent = "Your mail is valide!";
    emailTxt.style.color = "Green";
  } else if (emailVal == "") {
    emailTxt.textContent = "Email field is required!";
    emailTxt.style.color = "Red";
  } else {
    emailTxt.textContent = "Your mail is invalide!";
    emailTxt.style.color = "Red";
  }
});

closeFormBtn.addEventListener("click", function () {
  formSection.classList.remove("active-form");
});

// https://reqres.in/api/users?page=2
// https://jsonplaceholder.typicode.com/users

// OUT TEAM

// fetch("https://reqres.in/api/users?page=2")
//   .then((response) => response.json())
//   .then((data) => console.log(data));

const teamContainter = document.getElementById("teamContainer");
const innerTeamContainer = document.getElementById("innerContainer");
const leftArrowTeam = document.getElementById("leftButton");
const rightArrowTeam = document.getElementById("rightButton");

let pageCounter = 1;

function getTeamMembers(pageCounter) {
  fetch(`https://reqres.in/api/users?page= + ${pageCounter}`, {
    method: "GET",
  })
    .then((response) => {
      if (response.status !== 200) {
        throw "error";
      }
      return response.json();
    })
    .then((data) => {
      innerTeamContainer.innerHTML = "";
      // console.log(data);
      data.data.forEach((i) => {
        // console.log(i.avatar);
        const memberBox = document.createElement("div");
        memberBox.classList.add("member-box");
        const innerBox = document.createElement("div");
        innerBox.setAttribute("class", "inner-box");
        const avatar = document.createElement("img");
        avatar.src = i.avatar;
        const fullName = document.createElement("h3");
        fullName.innerText = `${i.first_name} ${i.last_name}`;
        const email = document.createElement("p");
        email.innerText = i.email;

        innerBox.appendChild(avatar);
        innerBox.appendChild(fullName);
        innerBox.appendChild(email);
        memberBox.appendChild(innerBox);
        innerTeamContainer.appendChild(memberBox);
      });
      function rightArrowTeamClick() {
        if (pageCounter == 2) {
          return;
        }
        pageCounter += 1;
        getTeamMembers(pageCounter);
        rightArrowTeam.classList.toggle("arrow-transition");
      }

      function leftArrowTeamClick() {
        if (pageCounter == 1) {
          return;
        }
        pageCounter -= 1;
        getTeamMembers(pageCounter);
      }

      rightArrowTeam.addEventListener("click", rightArrowTeamClick);
      leftArrowTeam.addEventListener("click", leftArrowTeamClick);
    });
}

// console.log(pageCounter);

getTeamMembers(pageCounter);

// SERVICES

// const serviceBtn = document.getElementById("serviceBtn");

// serviceBtn.addEventListener("mouseover", function () {
//   serviceBtn.classList.remove("service-btn");
//   serviceBtn.classList.add("service-btn-overlay");
// });