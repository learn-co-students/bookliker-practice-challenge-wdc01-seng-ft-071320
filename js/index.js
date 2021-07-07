document.addEventListener("DOMContentLoaded", function() {

    const booksURL = "http://localhost:3000/books"
    const usersURL = "http://localhost:3000/users"
    const listUl = document.getElementById("list")
    const showPanel = document.getElementById("show-panel")
    
    let usernames = []
    
    fetch(booksURL)
    .then(resp => resp.json())
    .then(books => renderBooks(books))
    
    fetch(usersURL)
    .then(resp => resp.json())
    .then(users => holdUsers(users))
    
    
    function renderBooks(books) {
    books.forEach(book => displayBookList(book))}

    function holdUsers(users) {
        usernames = users
    }

    function displayBookList(book){
        const bookLi = document.createElement("li")
        bookLi.className = "new-book"
        bookLi.innerText = book.title
        listUl.append(bookLi)
    
    
        bookLi.addEventListener("click", function(){
            event.preventDefault()
            showPanel.innerText = ""
    
            const img = document.createElement("img")
            img.className = "img"
            img.src = book.img_url
            
            const titleH2 = document.createElement("h2")
            titleH2.className = "title"
            titleH2.innerText = book.title
    
            const subtitleH2 = document.createElement("h2")
            subtitleH2.className = "subtitle"
            subtitleH2.innerText = book.subtitle
    
            const authorH2 = document.createElement("h2")
            authorH2.className = "author"
            authorH2.innerText = book.author
        
            const descP = document.createElement("p")
            descP.className = "description"
            descP.innerText = book.description
            
            
            const usersUl = document.createElement("ul")

                for(let i = 0; i < book.users.length; i++)
                {
                    const usersLi = document.createElement("li")
                    usersLi.innerText = book.users[i].username
                    usersUl.append(usersLi)  
                }      
                

                const likeButton = document.createElement("button")
                likeButton.className = "like"
                likeButton.innerText = "like"

                likeButton.addEventListener("click", function(){
                   let bookUsers = book.users
                    let porID = users[1]["id"]
                    debugger

                    fetch(booksURL + "/" + book.id, {
                        method: "PATCH", 
                        body: JSON.stringify({
                            t: "k"
                        })
                    }).then(resp => resp.json())
                    .then(console.log)
                    
                })
                
            

            showPanel.append(img,titleH2,subtitleH2,authorH2,descP,usersUl,likeButton)
            })
    
    
        }
    
    
    
});



// {
//     "id": 1,
//     "title": "Grapefruit",
//     "subtitle": "A book of Instruction and Drawings.",
//     "description": "Back in print for the first time in nearly thirty years, here is Yoko Ono's whimsical, delightful, subversive, startling book of instructions for art and for life. 'Burn this book after you've read it.' -- Yoko 'A dream you dream alone may be a dream, but a dream two people dream together is a reality. This is the greatest book I've ever burned.' -- John",
//     "author": "Yoko Ono",
//     "img_url": "https://books.google.com/books/content?id=3S8Rwr-iBdoC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
//     "users": [
//       {
//         "id": 2,
//         "username": "auer"
//       },
//       {
//         "id": 8,
//         "username": "maverick"
//       }
//     ]
//   }



