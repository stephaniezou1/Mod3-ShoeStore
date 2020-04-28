// console.log("connected")

let shoeList = document.getElementById("shoe-list")
let shoeImg = document.getElementById("shoe-image")
// console.log(shoeImg)
let shoeName = document.getElementById("shoe-name")
let shoeDesciption = document.getElementById("shoe-description")
let shoePrice = document.getElementById("shoe-price")
let shoeForm = document.getElementById("form-container")
let shoeReviews = document.getElementById("reviews-list")

fetch(`http://localhost:3000/shoes`)
    .then(resp => resp.json())
    .then((shoeArray) => {
        shoeArray.forEach((singleShoe) => {     
            createHTMLForShoe(singleShoe)
        })
        renderMainShoe(shoeArray[0])
    }) 

let createHTMLForShoe = (shoe) => {
    
    // create outer box
    let shoeLi = document.createElement("li")

    // fill in the box
    shoeLi.innerText = shoe.name
    shoeLi.classList.add("list-group-item")
    // console.log(shoeLi)

    //append
    shoeList.append(shoeLi)

    // add event listener
    shoeLi.addEventListener("click", (evt) => {
        renderMainShoe(shoe)
    })
}
// end of HTML function

let renderMainShoe = (shoe) => {
    
    shoeImg.src = shoe.image
    shoeName.innerText = shoe.name
    shoeDesciption.innerText = shoe.description
    shoePrice.innerText = shoe.price

    // main shoe inner html info is created, need to render form and reviews below
    // reviews might be easier to render first as form requires an event listener

    shoeReviews.innerHTML = ""

    shoe.reviews.forEach((singleReview) => {
        let shoeLi = document.createElement("li")
            shoeLi.innerText = singleReview.content
            shoeLi.classList.add("list-group-item")
        shoeReviews.append(shoeLi)
    })

    // creating the form now

    shoeForm.innerHTML = ""


    let newReviewForm = document.createElement("form")
        newReviewForm.id = "new-review"

    newReviewForm.innerHTML = `<div class="form-group">
    <textarea class="form-control" id="review-content" rows="3"></textarea>
    <input type="submit" class="btn btn-primary"></input>
    </div>`

    shoeForm.append(newReviewForm)
    
    // adding event listener now

    newReviewForm.addEventListener("submit", (evt) => {
        evt.preventDefault()
        
        let contentOfReview = evt.target["review-content"].value
        // debugger;
        // console.log(contentOfReview)

        fetch(`http://localhost:3000/shoes/${shoe.id}/reviews`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: contentOfReview
            })
        })
        .then(response => response.json())
        .then((newlyCreatedReview) => {
            shoe.reviews.push(newlyCreatedReview)
            let shoeLi = document.createElement("li")
                shoeLi.innerText = newlyCreatedReview.content
                shoeLi.classList.add("list-group-item")
            shoeReviews.append(shoeLi)
        })
    }) 
    // end of event listener

}