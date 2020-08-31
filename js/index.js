document.addEventListener("DOMContentLoaded", function() {
    const ul = document.querySelector('ul#list')
    const showPanel = document.querySelector('#show-panel')
    const url = "http://localhost:3000/books/"
    

    fetch(url)
    .then(res => res.json())
    .then(books => addAllBooks(books))

    function addAllBooks(books){
        ul.innerHTML = ""
        //showPanel.innerHTML = ""
        books.forEach(book => {
            addOneBook(book)
        })
    }

    function addOneBook(book){
        
        let li = document.createElement('li')
        li.innerText = book.title
        ul.append(li)

        //showPanel.innerHTML = ""

        li.addEventListener("click", function(){
            showPanel.innerHTML = ""

            let br = document.createElement('br')

            let image = document.createElement('IMG')
            image.src = book.img_url

            let titleDiv = document.createElement('div')
            titleDiv.innerText = book.title
            titleDiv.style = "font-weight:bold;"

            let subtitleDiv = document.createElement('div')
            subtitleDiv.innerText = book.subtitle 
            subtitleDiv.style = "font-weight:bold;"

            let authorDiv = document.createElement('div')
            authorDiv.innerText = book.author 
            authorDiv.style = "font-weight:bold;" 

            let descriptionDiv = document.createElement('div')
            descriptionDiv.innerText = book.description 

            let likeBtn = document.createElement('BUTTON')
            likeBtn.innerText = "LIKE"
            
            const userList = document.createElement('ul')
    
            
            userList.id = "user-list"
            userList.className = `users-book-${book.id}`
            
            showPanel.append(image, titleDiv, subtitleDiv, authorDiv,br,
                descriptionDiv, userList, likeBtn)
            
            if (book.users || book.users.length >= 1){
            book.users.forEach(user => {
                let userLi = document.createElement('li')
                userLi.innerText = user.username
                userLi.id = user.id
                userList.append(userLi)
            })
            }


            likeBtn.addEventListener("click", function(){
                //debugger
                if (likeBtn.innerText == "LIKE"){
                    book.users.push({"id":1, "username":"pouros"})
                    let book_users = book.users
    
                    let configObj = {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            users: book_users
                        })
                    }

                    fetch(url + book.id, configObj)
                    .then(res => res.json())
                    .then(updatedBook => {
                        let newUser = document.createElement('li')
                        //debugger
                        newUser.innerText = updatedBook.users.slice(-1)[0].username
                        newUser.id = updatedBook.users.slice(-1)[0].id
                        userList.append(newUser)
                    })

                    likeBtn.innerText = "UNLIKE"
                }

                else if (likeBtn.innerText == "UNLIKE") {
                    
                    let found = book.users.find(user => user.id == 1)
                    let newArray = book.users.filter(function(user){return user.id != found.id})
                    
                    let configObj = {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            users: newArray
                        })
                    }

                    fetch(url + book.id, configObj)
                    .then(res => res.json())
                    .then(function(updatedBook){
                        
                        let ulDiv = document.querySelector(`.users-book-${updatedBook.id}`)
                        ulDiv.innerHTML = "" 

                        updatedBook.users.forEach(user => {
                            let userLi = document.createElement('li')
                            userLi.innerText = user.username
                            userLi.id = user.id
                            ulDiv.append(userLi)
                        })
                        //debugger
                    })
                    
                    likeBtn.innerText = "LIKE"

                }

            })


        })


    }
});
