let bookUrl = 'http://localhost:3000/books/'
let bookUl = document.getElementById('list')
let showPanel = document.getElementById('show-panel')


fetch(bookUrl)
.then(res => res.json())
.then(bookArray => bookArray.forEach(book => bookList(book)))

function bookList(book){
    const bookLi = document.createElement('li')
    bookLi.innerText = book.title
    bookUl.append(bookLi)

    bookLi.addEventListener('click', () => {
        //console.log(event.target)
        showPanel.innerHTML = ""

        const bookTitle = document.createElement('h1')
        bookTitle.innerText = book.title

         const bookImage = document.createElement('img')
         bookImage.src = book.img_url
         
         const bookAuthor = document.createElement('h4')
         bookAuthor.innerText = book.author

         const bookSubtitle = document.createElement('h2')
         bookSubtitle.innerText = book.subtitle

         const bookDescription = document.createElement('p')
         bookDescription.innerText = book.description

         const bookUsers = book.users.forEach(user => document.createElement('li').innerText = user.username)

         const brk = document.createElement('br')

         const likeBtn = document.createElement('button')
         likeBtn.innerText = 'LIKE'

         likeBtn.addEventListener('click', () =>{
             //console.log(event.target)
             if(likeBtn.innerText == 'LIKE'){
                 book.users.push({"id":1, "username":"pouros"})
                 let book_users = book.users
                 let configObj = {
                     method: 'PATCH',
                     headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        users: book_users
                    })
                 }

                
             }
         })

         const userList = document.createElement('ul')
         userList.id = 'user-list'
         userList.className = `users-book-${book.id}`

         showPanel.append(bookTitle, bookImage, bookAuthor, bookSubtitle, bookDescription, bookUsers, brk, userList, likeBtn)

       
    })
}