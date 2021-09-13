const form = document.querySelector("form");
const inputs = document.querySelectorAll(
  'input[type="text"], input[type="password"]'
);
const progressBar = document.getElementById("progess-bar");
let pseudo, email, pass, confirmPass;

const errorDisplay = (tag, message, valid) => {
  const container = document.querySelector("." + tag + "-container");
  const span = document.querySelector("." + tag + "-container > span");

  if (!valid) {
    container.classList.add("error");
    span.textContent = message;
  } else {
    container.classList.remove("error");
    span.textContent = message;
  }
};

const pseudoChecker = (value) => {
  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    errorDisplay(
      "pseudo",
      "Le pseudo doit contenir entre 3 et 20 caractères.😁"
    );
    pseudo = null;
  } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
    errorDisplay(
      "pseudo",
      "Le pseudo ne doit pas contenir de caractère spéciaux😎"
    );
    pseudo = null;
  } else {
    errorDisplay("pseudo", "✔️", true);
    pseudo = value;
  }
};

const emailChecker = (value) => {
  if (
    !value.match(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    )
  ) {
    errorDisplay("email", "L'adresse email n'est pas valide.❌");
    email = null;
  } else {
    errorDisplay("email", "✔️", true);
    email = value;
  }
};

const passwordChecker = (value) => {
  progressBar.classList = "";
  if (
    !value.match(
      /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
    )
  ) {
    errorDisplay(
      "password",
      "Au moins 8 caractères, une majuscule, une chiffre et un caractère spécial"
    );
    progressBar.classList.add("progressRed");
    password = null;
  } else if (value.length < 12) {
    progressBar.classList.add("progressBlue");
    errorDisplay("password", "", true);
    password = value;
  } else {
    progressBar.classList.add("progressGreen");
    errorDisplay("password", "", true);
    password = value;
  }
  if (confirmPass) confirmChecker(confirmPass);
};

const confirmChecker = (value) => {
  if (value !== password) {
    errorDisplay("confirm", "Les mots de passe ne correspondent pas.❌");
    confirmPass = false;
  } else {
    errorDisplay("confirm", "✔️", true);
    confirmPass = true;
  }
};

inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "pseudo":
        pseudoChecker(e.target.value);
        break;

      case "email":
        emailChecker(e.target.value);
        break;

      case "password":
        passwordChecker(e.target.value);
        break;

      case "confirm":
        confirmChecker(e.target.value);
        break;

      default:
        null;
    }
  });
});

form.addEventListener("submit", (e) => {
  // Eviter que la page soit rechargée si on clique sur le bouton
  e.preventDefault();

  if (pseudo && email && password && confirmPass) {
    const data = {
      pseudo,
      email,
      password,
    };
    console.log(data);

    inputs.forEach((input) => (input.value = ""));
    progressBar.classList = "";

    pseudo = null;
    email = null;
    password = null;
    confirmPass = null;
    alert("Inscription validé ✔️!");
    // On envoie les données au serveur
    // fetch("/register", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // }).then((response) => {
    //   if (response.status === 200) {
    //     window.location.href = "/";
    //   } else {
    //     console.log(response);
    //   }
    // });
  } else {
    alert("Veuillez remplir correctement les champs ! 🤔");
  }
});
