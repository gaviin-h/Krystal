const btn=document.getElementById('btn')
const term=document.getElementById('search_term').value
const article=document.getElementById('article')

// generate a URL that will search by the given term
function create_url(search_term) {
     return 'https://newsapi.org/v2/everything?q=' +
            search_term +
            '&from=2022-01-27&' +
            'sortBy=popularity&' +
            'apiKey=c86e67c82f1e44e29fb5dd30095fb55b'
}
// asyncronous function to make an API call to the generated URL
async function make_request(search_term){
    var url=create_url(search_term) // ignore the lack on error handling
    var req=new Request(url)
    fetch(req).then(function(response) {
        response.json().then((data)=>{
            // pass json to function to distribute its contents to the div selected (in REACT this is much easier)
            update_page(data.articles[0])
        })
    })
}
// update the page with the article data 
function update_page(response){
    var title=document.createElement('h2')
    title.innerText=response.title
    var content=document.createElement('p')
    content.innerText=response.description
    article.appendChild(title)
    article.appendChild(content)
}
async function tester(search){
    var top_hit = make_request(search)
    // pass json to function to distribute its contents to the div selected (in REACT this is much easier)
    update_page(top_hit)
}
// listen for a click of the 'submi' button
btn.addEventListener('click', (async) => {
    // will get a json object from the request
    make_request(term)
})
