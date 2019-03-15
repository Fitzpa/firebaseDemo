console.log("this is the main page");
var config = {
  apiKey: "AIzaSyCMJ01rD9Ucqh2KEUE79yEpPMNvanTFGZg",
  authDomain: "louiefirstproject.firebaseapp.com",
  databaseURL: "https://louiefirstproject.firebaseio.com",
  projectId: "louiefirstproject",
  storageBucket: "louiefirstproject.appspot.com",
  messagingSenderId: "940218817270"
};
firebase.initializeApp(config);

var database = firebase.database();
var ref = database.ref("newsPreferences");

//  Array of possible news preferences
var newsPref = ["Sports", "World", "Politics"];

// Function to save preferences to firebase
function saveNewsPreference() {
  var newsRef = ref.push();
  newsRef.set({
    newsPreference: chosenNews
  });
  console.log("saveNewsPreference is running");
}

// Function for displaying news buttons
function renderButtons() {
  // Deleting the choice buttons prior to adding new choice buttons
  // (this is necessary otherwise we will have repeat buttons)
  $("#buttonView").empty();

  // Looping through the array of choices
  for (var i = 0; i < newsPref.length; i++) {
    // Then dynamicaly generating buttons for each choice in the array.
    // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class
    a.addClass("newsPreference");
    // Adding a data-attribute with a value of the choice at index i
    a.attr("data-name", newsPref[i]);
    // Adding the id of newsChoice to every news button
    a.attr("id", "newsChoice");
    // Providing the button's text with a value of the choice at index i
    a.text(newsPref[i]);
    // Adding the button to the HTML
    $("#buttonView").append(a);
  }
}

// This redirects the user to the home page
function Redirect(location) {
  window.location = location;
}

// Chosen news is a global variable that will be filled when a news button is clicked.
var chosenNews = "";

// When the user clicks on a button with the class newsPreference the code below will run
$(document).on("click", ".newsPreference", function(event) {
  
  //ChosenNews is given the value of whatever was inside the button clicked
  chosenNews = $(this).text();
  
  //Saves the users news preference to firebase
  saveNewsPreference();

  //Redirects the user to the home page once they have chosen a news preference
  Redirect("home.html");
});

$(document).on("click", "#signOutButton", function(event) {
  event.preventDefault();
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  });
  console.log("user has been signed out");
  Redirect("index.html");
})

$("#addNewsButton").on("click", function(event) {

  // This line will grab the text from the input box
  var newChoice = $("#news-input")
    .val()
    .trim();
  // The choice from the textbox is then added to our newsPref array
  newsPref.push(newChoice);

  // calling renderButtons handles the processing of our newsPref array
  renderButtons();
});

// This loads the buttons the moment the page loads
renderButtons();

