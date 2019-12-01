document.addEventListener("DOMContentLoaded", () => {
    const DOGSURL = "http://localhost:3000/dogs"

    fetch(DOGSURL)
    .then(resp => resp.json())
    .then(json => {
        json.forEach(dog => {
            createDog(dog)
        }) 
    })

    function createDog(dog) {
        const dogContainer = document.querySelector('main')

        const dogName = dog.name
        const newDogName = document.createElement('h2')
        newDogName.textContent = dogName
        dogContainer.appendChild(newDogName)

        const dogBreed = dog.breed 
        const newDogBreed = document.createElement('h4')
        newDogBreed.textContent = dogBreed
        dogContainer.appendChild(newDogBreed)

        const dogPhoto = dog.image
        const newDogPhoto = document.createElement('img')
        newDogPhoto.src = dogPhoto
        dogContainer.appendChild(newDogPhoto)

        let dogLikes = dog.likes 
        const newDogLikes = document.createElement('p')
        newDogLikes.textContent = 'Likes ' + dogLikes
        dogContainer.appendChild(newDogLikes)

        const addLikes = document.createElement('button')
        addLikes.textContent = 'Like Me!!!'
        dogContainer.appendChild(addLikes)

        addLikes.addEventListener('click', function(){
            // let doggoLikes = dog.likes;
            dogLikes += 1;
            newDogLikes.textContent = 'Likes ' + dogLikes;
        })

        const comments = document.createElement('h3')
        comments.textContent = 'Comments:'
        dogContainer.appendChild(comments)

        const dogComments = dog.comments
        dogComments.forEach(comment => {
            const newDogComments = document.createElement('li')
            newDogComments.textContent = comment 
            dogContainer.appendChild(newDogComments)
        })
        newCommentForm();
    }


    function newCommentForm() {
        const mainSection = document.querySelector('main')

        // create form
        const f = document.createElement('form')
        f.setAttribute('method', 'post')
        f.setAttribute('action', 'http://localhost:3000/dogs')
        f.id = "dogCommentForm"

        // add label
        const label = document.createElement('label')
        label.textContent = 'Add comment:'

        // create input element
        const i = document.createElement('input')
        i.type = 'text';
        i.name = 'comment'
        i.placeholder = 'Enter your comment here!'

        // create submit button
        const b = document.createElement('button')
        b.type = 'submit';
        b.name = 'submit'
        b.value = 'Submit'
        // b.id = 'dogCommentSubmitButton'
        
        mainSection.appendChild(f)
        f.appendChild(label)
        f.appendChild(i) 
        f.appendChild(b)

        // const subButton = document.querySelector('button')
        // subButton.addEventListener('submit', function(event) {
        //     event.preventDefault(); 
        //     console.log(event)
        // })
    } 

    document.getElementById('newDog').addEventListener('submit', handleSubmitDog)

    // collect input data from user, and create a new dog
    function handleSubmitDog(e) {
        e.preventDefault();
        let newDog = {
            name: e.target.name.value,
            breed: e.target.breed.value,
            image: e.target.photo.value,
            likes: e.target.likes.value
        }
        createNewDog(newDog)
        // createDog(newDog) --> this is OPTIMISTIC rendering!!! 
    }

    // saves dog to API
    function createNewDog(dog) {
        fetch(DOGSURL, {
             method: 'POST',
             headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json' 
             },
             body: JSON.stringify(dog)
        })
        .then(resp => {
            if (resp.status === 201) {
                 resp.json().then(function(data) {
                    createDog(data); 
                 })
            } else {
                console.log("ERROR!!!!!")
            }
        })
        // .then(json => {
        //     console.log(json)
        // })
    }


})