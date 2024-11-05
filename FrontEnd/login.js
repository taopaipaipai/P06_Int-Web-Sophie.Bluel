const formButton = document.querySelector(".form-submit");
const token = localStorage.getItem("token");
if (token) {
  window.location.href = "./index.html";
}

const loginUser = async (e) => {
  e.preventDefault();
  console.log("Login");
  const emailInput = document.querySelector("#email");
  const passwordInput = document.querySelector("#password");

  if (!emailInput.value || !passwordInput.value) {
    alert("Alerte veuiller saisir votre email ou votre mot de passe");
  }
  const body = {
    email: emailInput.value,
    password: passwordInput.value,
  };
  console.log(body);
  const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });

  console.log(response);
  if (response.ok) {
    const data = await response.json();
    console.log(data);
    localStorage.setItem("token", data.token);
    window.location.href = "./index.html";
  } else {
    alert("Vos identifiants sont incorrectes");
  }
};

formButton.addEventListener("click", loginUser);
