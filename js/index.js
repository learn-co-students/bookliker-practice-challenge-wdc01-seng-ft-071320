document.addEventListener("DOMContentLoaded", function() {

    booksUrl = "http://localhost:3000/books/"
    usersUrl = "http://localhost:3000/users/"
    const bookList = document.querySelector("#list")
    const showPanel = document.querySelector("#show-panel")
    //fetch all books and post once DOM is loaded
    fetch(booksUrl)
    .then(res => res.json())
    .then(booksData => showBooks(booksData))

    //iterate through booksData array and add Book
    function showBooks(booksData) {
        booksData.forEach( book => addBook(book))
    }
    
    //add a single book
    function addBook(book) {
        let li = document.createElement("li")
        li.innerText = `${book.title}`
        bookList.append(li)


        li.addEventListener("click", ()=> {
            showBookInPanel(book)
        })

    }
    function showBookInPanel(book){
        showPanel.innerHTML = ""
            let img = document.createElement("img")
            img.src = book.img_url

            let title = document.createElement("h3")
            title.innerText = book.title

            let description = document.createElement("p")
            description = book.description

            let author = document.createElement("h3")
            author.innerText = book.author

            let subtitle = document.createElement("h3")
            subtitle.innerText = book.subtitle

            let userList = document.createElement("ul")
            book.users.forEach(user => {
                let userLi = document.createElement("li")
                userLi.innerText = user.username
                userList.append(userLi)
            })
            
            let userids = []
            book.users.forEach(user => userids.push(user.id))
            let likeButton = document.createElement("button")
            userids.includes(1) ? likeButton.innerText = "UnLike" : likeButton.innerText = "Like"
            showPanel.append(img, title, subtitle, author, description, userList, likeButton)

            likeButton.addEventListener("click", ()=> {
                if (likeButton.innerText === "Like"){
                    book.users.push({"id": 1, "username": "pouros"})
                    config = {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        },
                        body: JSON.stringify({
                            users: book.users
                        })
                    }
                    fetch(booksUrl+`${book.id}`, config)
                    .then(res => res.json())
                    .then(updatedBook => {
                        showBookInPanel(updatedBook)
                        likeButton.innerText = "Unlike"
                    })
                } else {
                    likeButton.innerText = "Like"
                    // let index = book.users.indexOf({"id": 1, "username": "pouros"})
                    book.users.pop()
                    config = {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        },
                        body: JSON.stringify({
                            users: book.users
                        })
                    }
                    fetch(booksUrl+`${book.id}`, config)
                    .then(res => res.json())
                    .then(updatedBook => {
                        showBookInPanel(updatedBook)
                        likeButton.innerText = "Like"
                    })
                }

            })
        }

});
