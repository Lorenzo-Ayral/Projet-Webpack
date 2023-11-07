import "./style.scss";

const articlesContainer = document.querySelector(".articles-container");
const categoriesContainer = document.querySelector(".categories");

let filter;
let articles;

const fetchArticles = async () => {
    try {
        filter = null;
        const response = await fetch("https://restapi.fr/api/cda_lorenzo");
        articles = await response.json();
        if (!(articles instanceof Array)) {
            articles = [articles]
        }
        if (articles.length) {
            createArticlesDOM();
            createMenuCategories();
        } else {
            articlesContainer.innerHTML = "<p>Aucun article</p>";
            categoriesContainer.innerHTML = "<p>Aucune catégorie</p>";
        }
    } catch (error) {
        console.error(error);
    }
}

fetchArticles();

const createArticlesDOM = () => {
    const articlesDOM = articles
        .filter(article => {
            if (filter) {
                return article.category === filter;
            }
            return true;
        })
        .map(article => {
            const articleNode = document.createElement("div");
            articleNode.classList.add("article");
            articleNode.innerHTML = `
         <img src="${article.image ? article.image : 'assets/images/unsplash.jpg'}" alt="Profile image">
         <h2>${article.title}</h2>
         <p class="article-author">${article.author} - <span>${
                new Date(article.createdAt).toLocaleDateString("fr-FR", {
                    weekday: "long",
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                })
            }</span></p> 
                <p class="article-content">${article.content}</p>
                <div class="article-actions">
                    <button class="btn btn-primary" data-id=${article._id}>Éditer</button>
                    <button class="btn btn-danger" data-id=${article._id}>Supprimer</button>
                </div>
        `
            return articleNode;
        });

    articlesContainer.innerHTML = "";
    articlesContainer.append(...articlesDOM);

    const allDeleteBtns = articlesContainer.querySelectorAll(".btn-danger");
    const allEditBtns = articlesContainer.querySelectorAll(".btn-primary");

    allDeleteBtns.forEach(btn => {
        btn.addEventListener("click", async event => {
            try {
                const articleId = event.target.dataset.id;
                const response = await fetch(`https://restapi.fr/api/cda_lorenzo/${articleId}`, {
                    method: "DELETE"
                })
                const data = await response.json();
                await fetchArticles();
            } catch (error) {
                console.error(error);
            }
        })
    })

    allEditBtns.forEach(btn => {
        btn.addEventListener("click", event => {
            try {
                const articleId = event.target.dataset.id;
                location.assign(`/form.html?id=${articleId}`);
            } catch (error) {
                console.error(error);
            }
        })
    })

}

const createMenuCategories = () => {
    const categories = articles.reduce((acc, article) => {
        if (acc[article.category]) {
            acc[article.category]++;
        } else {
            acc[article.category] = 1;
        }
        return acc;
    }, {})
    const categoriesArray = Object.keys(categories)
        .map(category => [category, categories[category]])
        .sort((a, b) => a[0].localeCompare(b[0]))
    displayMenuCategories(categoriesArray);
}

const displayMenuCategories = (categoriesArray) => {
    const liElements = categoriesArray.map(categoryElement => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${categoryElement[0]} (<span>${categoryElement[1]}</span>)
        `
        li.addEventListener("click", event => {
            liElements.forEach(element => element.classList.remove("active"));
            if(filter === categoryElement[0]) {
                filter = null;
            } else {
                filter = categoryElement[0];
                li.classList.add("active");
            }
            createArticlesDOM();
        })
        return li;
    })
    categoriesContainer.innerHTML = "";
    categoriesContainer.append(...liElements);
}