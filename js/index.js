const url = 'http://localhost:3000/books/'
const ulList = document.querySelector('ul#list')
const showDiv = document.querySelector('div#show-panel')
let addPourus = true
function showBookPanel(book){}
fetch(url)
.then(response => response.json())
.then(booksArray => booksArray.forEach(book => displayBook(book)))

function displayBook(book){
    const li = document.createElement('li')
    li.innerText = book.title
    ulList.append(li)

    li.addEventListener('click', () => {
        showDiv.innerHTML = ""
        const img = document.createElement('img')
        img.src = book.img_url
        const title = document.createElement('h2')
        title.innerText = book.title
        const subtitle = document.createElement('h4')
        subtitle.innerText = book.subtitle
        const author = document.createElement('h5')
        author.innerText = book.author
        const description = document.createElement('p')
        description.innerText = book.description
        const ulUsers = document.createElement('ul')
            for (let i = 0; i < book.users.length; i++){
                const liUser = document.createElement('li')
                liUser.innerText = book.users[i].username
                ulUsers.append(liUser)
            }
        const likeBtn = document.createElement('button')
        addPourus ? likeBtn.innerText = "LIKE" : likeBtn.innerText = "UNLIKE"
        showDiv.append(img, title, subtitle, author, description, ulUsers, likeBtn)

            likeBtn.addEventListener('click', () => {
                    if (addPourus){
                                addPourus = !addPourus
                            const bodyUsers = []
                                for (let i = 0; i < book.users.length; i++){
                                bodyUsers.push({id: book.users[i].id, username: book.users[i].username})
                                }
                            bodyUsers.push({id: 1, username: "pouros"})
                            fetch(url+book.id, {
                                method: "PATCH",
                                headers: {"Content-Type": "application/json", 
                                Accept: "application/json"},
                                body: JSON.stringify({
                                    users: bodyUsers
                                })
                            })
                            .then(resp => resp.json())
                            .then(updatedBook => {
                                const newUserLi = document.createElement('li')
                                newUserLi.className = "pourus"
                                newUserLi.innerText = updatedBook.users[updatedBook.users.length -1].username
                                
                                ulUsers.append(newUserLi)
                                showDiv.append(ulUsers)
                                addPourus ? likeBtn.innerText = "LIKE" : likeBtn.innerText = "UNLIKE"
                            })
                        }
                    else {
                            addPourus = !addPourus
                            addPourus ? likeBtn.innerText = "LIKE" : likeBtn.innerText = "UNLIKE"
                            book.users.pop
                            
                            fetch(url+book.id, {
                                method: "PATCH",
                                headers: {"Content-Type": "application/json", 
                                Accept: "application/json"},
                                body: JSON.stringify({
                                    users: book.users
                                })
                            })
                            .then(resp => resp.json())
                            .then(updatedBook => {
                                const pourusLi = document.querySelector('li.pourus')
                                pourusLi.innerText = ""
                                pourusLi.remove()

                            })
                        }
                        })
        
       
    })
}
