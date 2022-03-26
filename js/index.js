document.addEventListener("DOMContentLoaded", function() {
    request()
});

let bookList = document.getElementById("list")
let bookPanel = document.getElementById("show-panel")
let bookImg = document.getElementById('b-img')
let bookTitle = document.getElementById('b-title')
let bookAuthor = document.getElementById('b-author')
let bookSubtitle = document.getElementById('b-subtitle')
let bookDescription = document.getElementById('b-desc')
let bookUsers = document.getElementById('b-ul')
let bookButton = document.getElementById('b-button')
let count = 0;
let newId;
let newUserName;

let request = async() => {
    let req = await fetch('http://localhost:3000/books')
    let res = await req.json()
    res.forEach((element) => {
        let bookLi = document.createElement('li')
        bookLi.textContent = element.title
        bookList.appendChild(bookLi)
        bookLi.addEventListener('click', ()=>{
            
       
            bookImg.setAttribute('src', element.img_url)
            bookTitle.innerHTML = element.title
            bookAuthor.innerHTML = element.author
            bookSubtitle.innerHTML = element.subtitle
            bookDescription.innerHTML = element.description

            
            bookUsers.innerHTML = ""

            for(let i = 0; i < element.users.length;i++){
                let newLi = document.createElement('li')
                newLi.innerText = element.users[i].username + "  " + element.users[i].id
                bookUsers.appendChild(newLi)
            }
            bookButton.style.visibility = 'visible'
            bookButton.innerText = 'Like'
            bookButton.addEventListener('click', ()=>{
                userRequest(count++)
            })
        })
        
        
    });
    
}

// let patchRequest = async(id,username) => {
//     let req = await fetch(`http://localhost:3000/books/${id}`,{
//         method: "PATCH",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body:JSON.stringify({

//         })
//     })
// }

let userRequest = async (id) => {
    let req = await fetch('http://localhost:3000/users')
    let res = await req.json()
    newId = res[id].id
    newUserName = res[id].username
    console.log(newId,newUserName)
}