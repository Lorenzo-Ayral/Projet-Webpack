import "../assets/styles/style.scss";
import "./form.scss";

let errors = [];
let articleId

const form = document.querySelector("form");
const errorList = document.getElementById("errors");
const cancelBtn = document.querySelector(".btn-secondary");

const initiateForm = async () => {
    const params = new URL(location.href);
    articleId = params.searchParams.get("id");

    if (articleId) {
        const response = await fetch(`https://restapi.fr/api/cda_lorenzo/${articleId}`);
        const article = await response.json();
        fillForm(article);
    }
}

initiateForm();

const fillForm = (article) => {
    const formFields = form.querySelectorAll("input, select, textarea");
    formFields.forEach(field => {
        field.value = article[field.name];
    })
}

cancelBtn.addEventListener("click", event => {
    location.assign("./index.html");
});

form.addEventListener("submit", async event => {
    event.preventDefault();
    const formData = new FormData(form);
    const entries = formData.entries();
    const article = Object.fromEntries(entries);

    if (formIsValid(article)) {
        const json = JSON.stringify(article);

        try {
            let response;
            if(articleId) {
                response = await fetch(`https://restapi.fr/api/cda_lorenzo/${articleId}`, {
                    method: "PUT",
                    headers: {"Content-Type": "application/json"},
                    body: json
                });
            } else {
                response = await fetch("https://restapi.fr/api/cda_lorenzo", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: json
                })
            }

            if(response.status < 300) {
                location.assign("./index.html")
            }
            form.reset();
        } catch (error) {
            console.error(error);
        }
    }
});

const formIsValid = (article) => {
    if (!article.title || !article.title || !article.content) {
        errors.push("Vous devez renseigner tous les champs");
    }

    if (article.content.length > 1000) {
        errors.push("Le contenu ne doit pas dépasser 1000 caractères");
    }

    if (errors.length) {
        let errorHTML = "";
        errors.forEach(error => {
            errorHTML += `<li>${error}</li>`
        });
        errorList.innerHTML = errorHTML;
        errors = [];
        return false;
    } else {
        errorList.innerHTML = "";
        return true;
    }
}