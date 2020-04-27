// Code your solution here

const shoeList = document.getElementById("shoe-list")
const shoeContainer = document.getElementById("form-container")
const mainShoe = document.getElementById("main-shoe")
const shoeForm = document.getElementById("form-container")
const reviewList = document.getElementById("reviews-list")

fetch("http://localhost:3000/shoes")
    .then(response => response.json())
    .then((shoesArray) => {
        shoesArray.forEach((singleShoe) => {
            createHTMLForShoe(singleShoe)
        })
    })

let createHTMLForShoe = (shoe) => {
    // shoe {id,name, company, price, image, description, reviews:[{"id":1,"content":"All my friends are jealous of me because of this shoe!}

    // Create the outer box

    let shoeLi = document.createElement("li")
        shoeLi.className = "list-group-item"
        // console.log(shoeLi)

    // Fill the contents of that box
    shoeLi.innerText = `${shoe.name}`

    // Append the box to the page
    shoeList.append(shoeLi)

    // Find the elements from the box
    // let shoeItem = document.querySelector(".list-group-item")

    // Add event listeners from the box
    shoeLi.addEventListener("click", () => {
        fetch(`http://localhost:3000/shoes/${shoe.id}`)
            .then(response => response.json())
            // .then(addShoeInfoToPage)
            .then((addShoeInfoToPage) => {
                mainShoe.innerHTML = `<img class="card-img-top" id="shoe-image" src=${shoe.image}><div class = "card-body"><h4 class="card-title" id="shoe-name">${shoe.name}</h4><p class="card-text" id="shoe-description">${shoe.description}</p><p class="card-text"><small class="text-muted" id="shoe-price"> ${shoe.price}</small></p><div class="container" id="form-container"> <form id="new-review><div class="form-group"><textarea class="form-control" id="review-content" rows="3"></textarea><input type="submit" class="btn btn-primary"></input></div></form></div></div> <h5 class="card-header">Reviews</h5><ul class="list-group list-group-flush" id="reviews-list"></ul>`

                // grab the ul, grab the form, fill out the ul with review information, add evt listener for form
                
            })
    })
}

shoeForm.addEventListener("submit", (evt) => {
    evt.preventDefault()
    // shoe {id,name, company, price, image, description, reviews:[{"id":1,"content"}
    let formContent = evt.target.reviews.content.value
    
    fetch("http://localhost:3000/shoes", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            content: formContent
        }
        .then(r => r.json())
        .then((newlyCreatedShoe) => {
            let newShoe = createHTMLForShoe(newlyCreatedShoe)
            reviewList.append(newShoe)
            evt.target.reset()
        })
    })
})

// deliverable 2 helper method 

// function onShoeClick(evt){
//     console.log(evt.target)
//     // getSingleShoe(evt.target.id)
//         .then(addShoeInfoToPage)
// }

// function addShoeInfoToPage(shoe) {
//     mainShoe.innerHTML = ""
//     const shoeImg = document.querySelector("#shoe-image")
//     shoeImg.src = shoe.image

//     const shoeName = document.querySelector("#shoe-name")
//     shoeName.innerText = shoe.name

//     const shoeDescription = document.querySelector("#shoe-description")
//     shoeDescription.innerText = shoe.description

//     const shoePrice = document.querySelector("#shoe-price")
//     shoePrice.innerText = shoe.price

// }

// function getSingleShoe(id){
//     return fetch(`http://localhost:3000/shoes/${shoe.id}`)
//         .then(r => r.json())
// }


