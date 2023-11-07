import "./style.scss";

const articlesContainer = document.querySelector(".articles-container");

const fetchArticles = async () => {
    try {
        const response = await fetch("https://restapi.fr/api/cda_lorenzo");
        let articles = await response.json();
        if (!(articles instanceof Array)) {
            articles = [articles]
        }
        createArticlesDOM(articles);
        createMenuCategories(articles);
    } catch (error) {
        console.error(error);
    }
}

fetchArticles();

const createArticlesDOM = (articles) => {
    const articlesDOM = articles.map(article => {
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
                fetchArticles();
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

const createMenuCategories = (articles) => {
    
}