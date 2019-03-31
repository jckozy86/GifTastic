console.log("__   ___                   _ ");
console.log("\\ \\ / (_) __ _ _ __  _ __ (_)");
console.log(" \\ V /| |/ _` | '_ \\| '_ \\| |");
console.log("  | | | | (_| | | | | | | | |");
console.log("  |_| |_|\\__,_|_| |_|_| |_|_|");

var animals = ["cat", "dog", "giraffe", "rabbit","hamster","goldfish","bird","turtle","hermit crab","chicken","salamander","frog"];

var currentAnimal = "";

createAnimalButtons();

// Adding click event listen listener to all buttons
$("#submit").on("click", function (event) {

  event.preventDefault();

  // Grabbing and storing the data-animal property value from the button
  var animal = $("#addAnimal").val().trim();

  if(  animals.includes("animal") ) {

    alert("Animal: "+animal+" button already exists");

  } else {

    animals.push(animal);

    createAnimalButtons();

  }

  //whether or not the animal already exists, clear form after submit
  $("#addAnimal").val("")
  
});

function createAnimalButtons() {

  var buttonDiv = $("<div>")

  animals.forEach(animal => {
    
    var button = $("<button>");
    button.addClass("animals")
    button.text(animal)

    buttonDiv.append(button)

  });

  $("#animals-buttons").html(buttonDiv);

}

$(document).on("click", ".animals", function(event){
  event.preventDefault();

  var animal = $(this).text();

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    animal + "&api_key=dc6zaTOxFJmzC&limit=10";

  // Performing an AJAX request with the queryURL
  $.ajax({
      url: queryURL,
      method: "GET"
    })
    // After data comes back from the request
    .then(function (response) {
        
      // storing the data from the AJAX request in the results variable
        var results = response.data;

        // Looping through each result item
        results.forEach(function (gify) {

          //creating div to hold rating and image
          var gifDiv = $("<div>")

          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + gify.rating);

          // Creating and storing an image tag
          var animalGif = $("<img>");
          // Setting the src attribute of the image to a property pulled off the result item
          animalGif.attr("src", gify.images.fixed_height_small_still.url);
          animalGif.attr("still", gify.images.fixed_height_small_still.url);
          animalGif.attr("moving", gify.images.fixed_height_small.url);

          // Appending the paragraph and image tag to the animalDiv
          gifDiv.append(p);
          gifDiv.append(animalGif);


          if( currentAnimal === animal ){
            
            //if we have already clicked the same button, prepend more divs
            $("#animal-gifs").prepend(gifDiv);

          } else {

            //if our last animal click is not the same as this one, replace animal gifs with new animal
            currentAnimal = animal;
            $("#animal-gifs").html(gifDiv);

          }
          

        })

      })
})

$(document).on("click", "img", function(event){

  if( $(this).attr("src") === $(this).attr("still") ){
    $(this).attr("src", $(this).attr("moving"))
  } else{
    $(this).attr("src", $(this).attr("still"))
  }

})