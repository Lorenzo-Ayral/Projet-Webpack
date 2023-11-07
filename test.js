const articles = [
    {id: 1, title: "Article 1", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.", author: "Lorenzo", categorie:'science'}, //curr['id']
    {id: 2, title: "Article 2", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.", author: "Pierre", categorie:'sport'},
    {id: 3, title: "Article 3", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.", author: "Louis", categorie:'science'},
    {id: 4, title: "Article 4", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.", author: "Lorenzo", categorie:'histoire'},
    {id: 5, title: "Article 5", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.", author: "Pierre", categorie:'histoire'},
    {id: 6, title: "Article 6", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.", author: "Louis", categorie:'sport'},
]

console.log(articles.reduce((acc, curr, idx, arr) => {
    if(acc[curr.categorie]) {
        acc[curr.categorie]++;
    } else {
        acc[curr.categorie] = 1;
    }
    return acc;
}, {}));