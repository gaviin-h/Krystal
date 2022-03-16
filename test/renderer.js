const btn=document.getElementById('btn')
const term=document.getElementById('search_term')
const article=document.getElementById('article')
const bar=document.getElementById('bar')
var present=false
// generate a URL that will search by the given term
function create_url(search_term) {//spaces curently mess with it
     return 'https://newsapi.org/v2/everything?q=' +
            search_term + 
            '&from=2022-01-28&' +
            'sortBy=popularity&' +
            'apiKey=c86e67c82f1e44e29fb5dd30095fb55b'
}
// asyncronous function to make an API call to the generated URL (this should be generalized in the app to pull the json from both apis)
async function make_request(search_term){
    var url=create_url(search_term) // ignore the lack on error handling
    var req=new Request(url)
    fetch(req).then(function(response) {
        response.json().then((data)=>{
            console.log(data)
            // pass json to function to distribute its contents to the div selected (in REACT this is much easier)
            update_page(data.articles[0].title, data.articles[0].description)
        })
    })
}
// update the page with the article data 
function update_page(name_tag, description){
    var title=document.createElement('h2')
    title.innerText=name_tag
    var content=document.createElement('p')
    content.innerText=description
    article.appendChild(title)
    article.appendChild(content)
}
async function tester(search){
    var top_hit = make_request(search)
    // pass json to function to distribute its contents to the div selected (in REACT this is much easier)
    update_page(top_hit)
}
var resp
async function make_filter(filter){
    // var url='https://littlesis.org/api/entities/search?q='+filter
    // var req=new Request(url)
    // fetch(req).then(function(response){
    //     response.json().then((r)=>{
    //         var name=r.data[0].attributes.name
    //         var desc=r.data[0].attributes.blurb
    //         update_page(name, desc)
    //     })
    // })
    var url='https://localhost:8080/filter'
    var req=new Request(url, {method: 'POST', body: '{filter: '+filter+'}'})
    fetch(req).then(function(response){
        response.json().then((r)=>{
            resp=r
        })
    })
}
// listen for a click of the 'submi' button
document.addEventListener('click', async function(e) {
    // will get a json object from the request
    if(e.target==btn){
        make_request(term.value)
    }
    else if(e.target.id=='filter_btn'){
        var filter_term=document.getElementById('filter').value
        make_filter(filter_term)
    }
})
