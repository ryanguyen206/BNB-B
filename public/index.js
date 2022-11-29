const showHouses = document.getElementById("showHouses");

let houseData = [];

var searchTerms;

// Add the form submission event handler when the page is loaded.
addEventListener("load", () => {
  document.getElementById("searchForm").addEventListener("submit", getSearchTerms);
});
// Constructor of a SearchTerms object
function SearchTerms(location, checkin, checkout, adults, children, infants) {
  this.location = location;
  this.checkinDate = checkin;
  this.checkoutDate = checkout;
  this.numberOfAdults = parseInt(adults);
  this.numberOfChildren = parseInt(children);
  this.numberOfInfants = parseInt(infants);
}

// Returns true if SearchTerms are correct, otherwise returns false.
const validateSearchTerms = (terms) => {
  const currentTime = new Date();
  const currentDate =
    currentTime.getFullYear().toString() +
    "-" +
    (currentTime.getMonth() + 1).toString() +
    "-" +
    currentTime.getDate().toString();
  console.log("current time " + currentTime);
  console.log("current time type " + typeof currentTime);
  console.log("checkin date " + terms.checkinDate);
  console.log("checkin date type " + typeof terms.checkinDate);
  console.log("checkout date " + terms.checkoutDate);
  if (terms.checkinDate < currentDate) {
    alert("Checkin date cannot be earlier than " + currentDate);
    return false;
  }
  if (terms.checkoutDate <= currentDate) {
    alert("Checkout date cannot be earlier than " + currentDate);
    return false;
  }
  if (terms.checkinDate > terms.checkoutDate) {
    alert("You cannot checkin before checkout");
    return false;
  }
  if (terms.checkinDate == terms.checkoutDate) {
    alert("You cannot checkin and checkout on the same day");
    return false;
  }
  if (terms.numberOfAdults <= 0) {
    alert("There must be adults present");
    return false;
  }
  if (terms.numberOfAdults > 5) {
    alert("To many adults in one property");
    return false;
  }
  if (terms.numberOfChildren > 4) {
    alert("Too mane children in one property");
    return false;
  }
  if (terms.numberOfInfants > 6) {
    alert("There are too many infants in one property");
    return false;
  }
  return true;
};

// Reads the data from the HTML form, creates a SearchTerm object,
// and fills it out with the data.
const getSearchTerms = (event) => {
  // Prevent form submission.
  event.preventDefault();

  // Read the data from the HTML form.
  const inputLocation = document.getElementById("location");
  const inputCheckinDate = document.getElementById("check-in");
  const inputCheckoutDate = document.getElementById("check-out");
  const inputAdults = document.getElementById("numberOfAdults");
  const inputChildren = document.getElementById("numberOfChildren");
  const inputInfants = document.getElementById("numberOfInfants");

  // Call SearchTerms constructor to create an object with the data.
  const terms = new SearchTerms(
    inputLocation.value,
    inputCheckinDate.value,
    inputCheckoutDate.value,
    inputAdults.value,
    !inputChildren.value ? 0 : inputChildren.value,
    !inputInfants.value ? 0 : inputInfants.value
  );

  // Validate the data.
  if (validateSearchTerms(terms)) {
    // If the data are valid, put the data into the global variable.
    searchTerms = terms;
    inputLocation.value = "";
    dataFetch(searchTerms);
  } else {
    // If the data are invalid, assign null to the global variable.
    searchTerms = null;
  }

  // Make sure that the form is not submitted.
  return false;
};

function getSpecificHouse(element) {
  element = JSON.parse(decodeURIComponent(element));
  console.log(element);
}

//here is the code to actual retrieve the data from the api.
const dataFetch = async (searchTerms) => {
  console.log(searchTerms);
  const response = await fetch(
    `http://localhost:3000/getData?location=${searchTerms.location}&checkin=${searchTerms.checkinDate}&checkout=${searchTerms.checkoutDate}&adults=${searchTerms.numberOfAdults}&children=${searchTerms.numberOfChildren}&infants=${searchTerms.numberOfInfants}`
  );
  console.log(response);
  houseData = await response.json();

  console.log(houseData);

  houseData.forEach((element, index) => {
    //for each element in array, keep on adding below section to inneraHTML
    showHouses.innerHTML += `<div class='card'>
            <p id='name'>${houseData[index].name} </p>
            <p id='bathroom'>Bathrooms: ${houseData[index].bathrooms}</p>
            <p id='rate'>Rate: $${houseData[index].price.rate}</p>
            <button onclick="getSpecificHouse('${encodeURIComponent(
              JSON.stringify(element)
            )}')">Click me</button>
        </div>`;
  });
};

//MARCUS: This is code for the modal

const showDummy = document.getElementById("showDummy");
let modal1_fullDisplay = document.getElementById("modal1_fullDisplay");
let modal1_displayImg = document.getElementById("modal1_displayImg");
let modal2_fullDisplay = document.getElementById("modal2_fullDisplay");
let modal2_displayImg = document.getElementById("modal2_displayImg");

//MODAL 1 CODE

//Open full view, set values for what's about to display
function openModal1() {
  modal1_fullDisplay.style.display = "flex"; //Sets to appear
  //modal1_displayImg.src = pic; //Sets the desired image
}

//MODAL 2 CODE

//Open full view, set values for what's about to display
function openModal2() {
  //Closes first modal assuming it's open
  modal1_fullDisplay.style.display = "none";
  //modal1_displayImg.src = null;

  modal2_fullDisplay.style.display = "flex"; //Sets to appear
  //modal2_displayImg.src = pic; //Sets the desired image
}

//Close full view with Escape Key
document.addEventListener("keyup", function (event) {
  if (event.key === "Escape") {
    modal2_fullDisplay.style.display = "none";
  }
});

//FOR BOTH MODALS

//Close full view by clicking outside of img.
window.onclick = function (event) {
  if (event.target == modal1_fullDisplay) {
    modal1_fullDisplay.style.display = "none";
  }
  if (event.target == modal2_fullDisplay) {
    modal2_fullDisplay.style.display = "none";
  }
};

//Close full view with Escape Key
document.addEventListener("keyup", function (event) {
  if (event.key === "Escape") {
    modal1_fullDisplay.style.display = "none";
    //For some reason this works for modal2 still
  }
});

//DUMMY: Creates a single dummy card
function createDummy() {
  showDummy.innerHTML += `<div class='card'>
  <p id='name'>Elon's Retired Refridgerator</p>
  <p id='bathroom'>Bathrooms: The bushes will do</p>
  <p id='rate'>Rate: Don't worry about it ;)</p>
  <button onclick='openModal1()')">Open the modal</button>
  </div>`;
}
