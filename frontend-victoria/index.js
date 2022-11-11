var searchTerms;

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
    console.log("qqq " + JSON.stringify(terms));
    return (terms.checkinDate < terms.checkoutDate) 
            && (terms.numberOfAdults > 0)
            && (terms.numberOfAdults < 5)
            && (terms.numberOfChildren >= 0)
            && (terms.numberOfChildren < 6)
            && (terms.numberOfInfants >= 0)
            && (terms.numberOfInfants < 6);
}

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
        inputChildren.value,
        inputInfants.value);

    // Validate the data.
    if (validateSearchTerms(terms)) {
        // If the data are valid, put the data into the global variable.
        searchTerms = terms;
        inputLocation.value = "";
        console.log("Search terms are " + JSON.stringify(searchTerms));
    } else {
        // If the data are invalid, display an error message.
        alert("Incorrect search terms");
        searchTerms = null;
    }
    
    // Make sure that the form is not submitted.
    return false;
}

// Add the form submission event handler when the page is loaded.
addEventListener('load', () => {
    document.getElementById("searchForm").addEventListener("submit", getSearchTerms);
});