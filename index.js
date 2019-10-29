"use strict";
var portfolioData;

// Retrieving data from json file:
function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      portfolioData = JSON.parse(this.responseText);
      appendData('all');
    }
  };
  xhttp.open("GET", "/data.json", true);
  xhttp.send();
}

function getData() {
  return portfolioData;
}

function displayProject(id) {
  let portfolioData = getData();
  let mainContainer = document.getElementById("main");
  $(mainContainer).empty();
  //Create div for project content
  var projectDiv = document.createElement("div");
  projectDiv.classList.add("projectDiv");
  mainContainer.appendChild(projectDiv);

  //Create backwards arrow
  var button = document.createElement('BUTTON');
  var text = document.createTextNode("<- Back");
  button.appendChild(text);
  button.addEventListener("click", function() {
    appendData("all");
  });
  projectDiv.appendChild(button);

  //Create image
  var imageDiv = document.createElement("div");
  var myImage = document.createElement("IMG");
  myImage.src = portfolioData[id].imageUrl;
  myImage.classList.add("projectPageImage");
  imageDiv.classList.add("projectPageImageDiv");
  imageDiv.appendChild(myImage);

  //Create title
  var titletext = document.createTextNode(portfolioData[id].firstName);
  var title = document.createElement('h1');
  title.appendChild(titletext);

  //Create text below title
  var descriptiontext = document.createTextNode(portfolioData[id].lastName);
  var description = document.createElement('h3');
  description.appendChild(descriptiontext);

  //Create text about project
  var text = document.createTextNode(portfolioData[id].lastName);
  var contenttext = document.createElement('p');
  contenttext.appendChild(text);

  projectDiv.appendChild(imageDiv);
  projectDiv.appendChild(title);
  projectDiv.appendChild(description);
  projectDiv.appendChild(contenttext);
}

//Write out the data
function appendData(category) {

  let portfolioData = getData();
  let mainContainer = document.getElementById("main");
  $(mainContainer).empty();
  let cardsToDisplay = [];
  var projectCards = document.createElement("div");
  projectCards.id = "projectCards";
  mainContainer.appendChild(projectCards);

  //Get all projects to display
  //0 & 1 is reserved for about and contact info
  for (var i = 2; i < portfolioData.length; i++) {
    if(portfolioData[i].class.includes(category) ||
      category == "all") {
      cardsToDisplay.push(portfolioData[i]);
    }
  }
  //Display all projects
  for(let l = 0; l < cardsToDisplay.length; l++){

    //Create div for image
    var cardDiv = document.createElement("div");
    cardDiv.classList.add("projectCard");

    //Create image
    var myImage = document.createElement("IMG");
    myImage.src = cardsToDisplay[l].imageUrl;
    myImage.classList.add("projectImage");

    //Create title
    var textDiv = document.createElement("div");
    textDiv.classList.add("textDiv");
    var text = document.createTextNode(cardsToDisplay[l].firstName);
    var title = document.createElement('h1');
    title.appendChild(text);
    textDiv.appendChild(title);

    //Append to DOM
    cardDiv.appendChild(myImage);
    cardDiv.appendChild(textDiv);
    cardDiv.addEventListener("click", function() {
      displayProject(cardsToDisplay[l].id);
    });
    projectCards.appendChild(cardDiv);
  }
}

/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
function toggleMenu() {
//If the screen is small
  if(window.screen.width < 601) {
    var x = document.getElementById("dropdown-content");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }
}
