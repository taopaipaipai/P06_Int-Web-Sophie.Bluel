const token = localStorage.getItem("token");

let works = [];
let categories = [];
const gallery = document.querySelector(".gallery");
const filters = document.querySelector(".filters");
const modalContainer = document.querySelector(".modalContainer");

const logoutUser = () => {
  localStorage.removeItem("token");
  window.location.href = "./index.html";
};

const generateLogoutButton = () => {
  // code pour le bouton logout
  const authButton = document.querySelector(".authButton");
  authButton.innerHTML = "";
  const logoutButton = document.createElement("a");
  logoutButton.innerHTML = "Logout";
  logoutButton.addEventListener("click", logoutUser);
  authButton.appendChild(logoutButton);
};

const generateTopBar = () => {
  // barre noir
  const topBarContainer = document.querySelector(".topBarContainer");
  const topBar = document.createElement("div");
  topBar.className = "topBar";

  const icon = document.createElement("i");
  icon.className = "fa-solid fa-pen-to-square";
  const editText = document.createElement("span");
  editText.innerHTML = "mode edition";
  topBar.appendChild(icon);
  topBar.appendChild(editText);
  topBarContainer.appendChild(topBar);
};

const closeModal = () => {
  modalContainer.innerHTML = "";
};

const addWorks = async (e) => {
  e.preventDefault();
  const image = document.querySelector("#imageInput").files[0];
  const title = document.querySelector("#titleInput").value;
  const category = document.querySelector("#categorySelect").value;
  if (!image || !title || !category) {
    return alert("veuillez renseigner tous les champs du formulaire");
  }
  console.log(image);
  console.log(title);
  console.log(category);
  const formData = new FormData();
  formData.append("image", image);
  formData.append("title", title);
  formData.append("category", category);

  const response = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: { Authorization: "Bearer " + token },
    body: formData,
  });

  if (response.ok) {
    console.log("element ajouté");
    await getWorks();
    generateSecondModalContent();
  } else {
    alert("Une erreur s'est produite lors de la récupération des Works");
  }
};

const generateSecondModalContent = () => {
  const modalContent = document.querySelector(".modalContent");
  modalContent.innerHTML = "";
  // const title = document.createElement("h2");
  // title.innerHTML = "Ajout photo";

  const title = document.createElement("div");
  title.innerHTML = "Ajout photo";
  title.className = "title";

  const closeButton = document.createElement("i");
  closeButton.className = "fa-solid fa-xmark";
  closeButton.classList.add("iconClose");
  //closeButton.appendChild(iconClose);
  closeButton.addEventListener("click", closeModal);

  // const previousButton = document.createElement("button");
  // previousButton.innerHTML = "Précédent";
  const previousButton = document.createElement("i");
  previousButton.className = "fa-solid fa-arrow-left-long";
  previousButton.classList.add("previousButton");
  previousButton.addEventListener("click", generateFirstModalContent);

  const form = document.createElement("form");
  form.className = "addForm";

  const imageLabel = document.createElement("label");
  imageLabel.htmlFor = "imageInput";
  imageLabel.className = "imageLabel";

  const imageLabelDivContainer = document.createElement("div");
  imageLabelDivContainer.innerHTML = "";
  imageLabelDivContainer.className = "imageLabelDivContainer";
  imageLabel.appendChild(imageLabelDivContainer);

  const imageLabelPicture = document.createElement("i");
  imageLabelPicture.className = "fa-regular fa-image";
  imageLabelPicture.classList.add("imageLabelPicture");
  imageLabelDivContainer.appendChild(imageLabelPicture);

  const imageLabelDivButton = document.createElement("div");
  imageLabelDivButton.innerHTML = "+ Ajouter photo";
  imageLabelDivButton.className = "imageLabelDivButton";
  imageLabelDivContainer.appendChild(imageLabelDivButton);

  const imageLabelFormat = document.createElement("div");
  imageLabelFormat.innerHTML = "jpg, png : 4mo max";
  imageLabelFormat.className = "imageLabelFormat";
  imageLabelDivContainer.appendChild(imageLabelFormat);

  const imageInput = document.createElement("input");
  imageInput.type = "file";
  imageInput.id = "imageInput";
  imageInput.className = "displayNone";
  const titleLabel = document.createElement("label");
  titleLabel.innerHTML = "Titre";
  titleLabel.className = "titleLabel";

  imageInput.accept = "image/png, image/jpg, image/jpeg";

  const titleInput = document.createElement("input");
  titleInput.id = "titleInput";
  const categoryLabel = document.createElement("label");
  categoryLabel.innerHTML = "catégorie";
  categoryLabel.className = "categoryLabel";

  const categorySelect = document.createElement("select");
  categorySelect.id = "categorySelect";

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.innerHTML = category.name;
    option.value = category.id;
    categorySelect.appendChild(option);
  });

  imageInput.addEventListener("change", () => {
    const image = document.querySelector("#imageInput").files[0];
    const title = document.querySelector("#titleInput").value;
    const category = document.querySelector("#categorySelect").value;

    if (image.size > 4000000) {
      return alert(" image trop volumineuse");
    }

    if (image) {
      imageLabelDivContainer.innerHTML = "";
      const displayImage = document.createElement("img");

      displayImage.src = URL.createObjectURL(image);
      displayImage.className = "displayImage";
      imageLabelDivContainer.appendChild(displayImage);
    }

    if (image && title && category) {
      console.log("tous les champs du formulaire sont remplis");
      addButton.className = "addButtonActive";
    } else {
      console.log("tous les champs du formulaire ne sont pas remplis");
      addButton.className = "addButton";
    }
  });

  titleInput.addEventListener("change", () => {
    const image = document.querySelector("#imageInput").files[0];
    const title = document.querySelector("#titleInput").value;
    const category = document.querySelector("#categorySelect").value;
    if (image && title && category) {
      console.log("tous les champs du formulaire sont remplis");
      addButton.className = "addButtonActive";
    } else {
      console.log("tous les champs du formulaire ne sont pas remplis");
      addButton.className = "addButton";
    }
  });

  categorySelect.addEventListener("change", () => {
    const image = document.querySelector("#imageInput").files[0];
    const title = document.querySelector("#titleInput").value;
    const category = document.querySelector("#categorySelect").value;
    if (image && title && category) {
      console.log("tous les champs du formulaire sont remplis");
      addButton.className = "addButtonActive";
    } else {
      console.log("tous les champs du formulaire ne sont pas remplis");
      addButton.className = "addButton";
    }
  });

  const addButtonContainer = document.createElement("div");
  addButtonContainer.innerHTML = "";
  addButtonContainer.className = "addButtonContainer";


  const separateur = document.createElement("div");
  separateur.className = "separateur2";

  const addButton = document.createElement("button");
  addButton.innerHTML = "Valider";
  addButton.className = "addButton";
  addButton.addEventListener("click", addWorks);

  addButtonContainer.appendChild(separateur);
  addButtonContainer.appendChild(addButton);

  modalContent.appendChild(title);
  modalContent.appendChild(closeButton);
  form.appendChild(imageLabel);
  form.appendChild(imageInput);
  form.appendChild(titleLabel);
  form.appendChild(titleInput);
  form.appendChild(categoryLabel);
  form.appendChild(categorySelect);
  // form.appendChild(addButton);
  form.appendChild(addButtonContainer);
  modalContent.appendChild(form);
  modalContent.appendChild(previousButton);
};

const deleteWorks = async (id) => {
  const response = await fetch("http://localhost:5678/api/works/" + id, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token },
  });
  if (response.ok) {
    //categories = await response.json();
    //console.log(response);
    // console.log(categories)
    console.log("element supprimé");
    await getWorks();
    generateFirstModalContent();
  } else {
    alert("Une erreur s'est produite lors de la récupération des Works");
  }
};

const generateFirstModalContent = () => {
  const modalContent = document.querySelector(".modalContent");
  modalContent.innerHTML = "";
  // const title = document.createElement("h2");
  const title = document.createElement("div");
  title.innerHTML = "Galerie Photo";
  title.className = "title";
  //const closeButton = document.createElement("button");
  //closeButton.innerHTML = "Fermer";
  //closeButton.innerHTML = "X";
  const closeButton = document.createElement("i");
  closeButton.className = "fa-solid fa-xmark";
  closeButton.classList.add("iconClose");
  //closeButton.appendChild(iconClose);
  closeButton.addEventListener("click", closeModal);

  const galleryModal = document.createElement("div");
  // const miniGalery = document.querySelector(".modalContent.div");
  galleryModal.className = "miniGalery";

  for (let i = 0; i < works.length; i++) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    //const trashButton = document.createElement("div");
    const trashButton = document.createElement("i");
    trashButton.className = "fa-solid fa-trash-can";
    trashButton.classList.add("trashButton");

    //trashButton.className = "trashButton";
    trashButton.addEventListener("click", () => deleteWorks(works[i].id));
    img.src = works[i].imageUrl;
    img.alt = works[i].title;
    img.className = "firstModalImage";
    figure.appendChild(img); // la balise img est un enfant de la balise figure
    figure.appendChild(trashButton);
    galleryModal.appendChild(figure); // la balise figure est un enfant d'une div qui contient la classe "gallery"
  }

  const modalContent2 = document.createElement("div");
  modalContent2.className = "modalContent2";

  const separateur = document.createElement("div");
  separateur.className = "separateur";

  const addPhoto = document.createElement("button");
  addPhoto.innerHTML = "Ajouter une Photo";
  addPhoto.className = "addPhoto";

  modalContent2.appendChild(separateur);
  modalContent2.appendChild(addPhoto);

  addPhoto.addEventListener("click", generateSecondModalContent);
  modalContent.appendChild(title);
  modalContent.appendChild(closeButton);
  modalContent.appendChild(galleryModal);
  modalContent.appendChild(modalContent2);
};

const generateModal = () => {
  const modal = document.createElement("div");
  modal.className = "modal";
  const modalContent = document.createElement("div");
  modalContent.className = "modalContent";

  modalContent.addEventListener("click", (e) => e.stopPropagation());
  modal.addEventListener("click", closeModal);

  modal.appendChild(modalContent);
  modalContainer.appendChild(modal);
  generateFirstModalContent();
};

const generateEditButton = () => {
  //  const titleContainer = document.querySelector(".title-container");
  const titleContainer = document.querySelector(".editSection");

  const icon = document.createElement("i");
  icon.className = "fa-solid fa-pen-to-square";

  const editButton = document.createElement("button");
  editButton.innerHTML = " Modifier";
  editButton.className = "editButton";

  titleContainer.appendChild(icon);
  titleContainer.appendChild(editButton);

  editButton.addEventListener("click", generateModal);

  titleContainer.appendChild(editButton);
};

if (token) {
  generateLogoutButton();
  generateTopBar();
  generateEditButton();
}

// récup des categories
const getCategories = async () => {
  const response = await fetch("http://localhost:5678/api/categories");
  if (response.ok) {
    categories = await response.json();
    console.log(response);
    // console.log(categories)
    if (!token) {
      // on ajoute ce test pour faire apparaitre les catégories si le token n'existe pas
      displayCategories();
    }
  } else {
    alert("Une erreur s'est produite lors de la récupération des categories");
  }
};

getCategories();

/*  // récupération de l'objet depuis l'inspecteur dans le naviguateur
    // on a pris ceci pour reconstituer dynamiquement les categories grace à JavaScript
{
    "id": 2,
    "name": "Appartements"
}
*/

/// on ajoute les display pour afficher les catégories
const displayCategories = () => {
  console.log(" message depuis fonction displayCategories");
  console.log(categories);

  let categorieslist = categories;
  categorieslist.push({ name: "Tous", id: 0 });
  categorieslist.sort((a, b) => a.id - b.id);

  // const filters = document.getElementById("filters");

  categorieslist.forEach((category) => {
    const button = document.createElement("button");
    button.innerHTML = category.name;
    button.className = "buttons-filtres"; // ajout de la classe pour les boutons

    // Ajouter la classe 'active' au bouton avec category.id 0 par défaut
    if (category.id === 0) {
      button.classList.add("active");
    }

    button.addEventListener("click", () => {
      displayWorks(category.id);

      // Enlever la classe 'active' de tous les boutons
      const allButtons = document.querySelectorAll(".buttons-filtres");
      allButtons.forEach((btn) => btn.classList.remove("active"));

      // Ajouter la classe 'active' au bouton cliqué
      button.classList.add("active");
    });
    filters.appendChild(button); // la balise button est un enfant d'une div qui contient la classe "gallery"
  });
};

// displayCategories()

// recup des travaux
const getWorks = async () => {
  const response = await fetch("http://localhost:5678/api/works");
  if (response.ok) {
    works = await response.json();
    console.log(response);
    //console.log(works)
    displayWorks(0); // pour afficher le bouton tous grace à l'id 0
  } else {
    alert("Une erreur s'est produite lors de la récupération des travaux");
  }
};

/*  // récupération de l'objet depuis l'inspecteur dans le naviguateur
    // on a pris ceci pour reconstituer dynamiquement les works grace à JavaScript
{
    "id": 1,
    "title": "Abajour Tahina",
    "imageUrl": "http://localhost:5678/images/abajour-tahina1651286843956.png",
    "categoryId": 1,
    "userId": 1,
    "category": {
        "id": 1,
        "name": "Objets"
    }
}

*/

/// on ajoute les display pour afficher les travaux
const displayWorks = (categoryId) => {
  // on choisi la variable categoryId (ligne 68) qui est une propriété/variable du tableau des works
  // mais qui correspond à l'id des categorie  (ligne 24)

  console.log(" message depuis fonction displayWorks");
  console.log(works);

  console.log(" **************************** ");
  console.log(categoryId);
  console.log(" **************************** ");

  let worksList = [];
  if (categoryId === 0) {
    worksList = works;
  } else {
    worksList = works.filter((work) => work.categoryId === categoryId);
  }

  gallery.innerHTML = ""; // on reset la galerie pour pas que cela s'accumule
  for (let i = 0; i < worksList.length; i++) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = worksList[i].imageUrl;
    img.alt = worksList[i].title;
    const figcaption = document.createElement("figcaption");
    figcaption.innerHTML = worksList[i].title;
    figure.appendChild(img); // la balise img est un enfant de la balise figure
    figure.appendChild(figcaption); // la balise figcaption est un enfant de la balise figure
    gallery.appendChild(figure); // la balise figure est un enfant d'une div qui contient la classe "gallery"
  }
};

getWorks();
