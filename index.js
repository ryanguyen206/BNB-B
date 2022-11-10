const getDataBtn = document.getElementById('getData');
const getUserInput = document.getElementById('test');
const userInput = document.getElementById('location');
const showHouses = document.getElementById('showHouses');
let index = 0;

let houseData = [];


//this code is bascially like a password to have access to the api. 
//I can explain later if you guys are curious!
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'cbdec378c8mshfe41795a7bdc811p1ae758jsn9534bad29014',
		'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
	}
};


function myFunction(element) {
    element = JSON.parse(decodeURIComponent(element))
    console.log(element);
    console.log('hello')
}

//here is the code to actual retrieve the data from the api.
const dataFetch =  async () => {
    const response =  await fetch('https://airbnb13.p.rapidapi.com/search-location?location=houston&checkin=2022-11-10&checkout=2022-11-12&adults=4&infants=0&page=2', options)
    houseData =  await response.json();
    console.log(houseData);
    console.log(houseData.results[0])

    houseData.results.forEach((element,index) => {
        //for each element in array, keep on adding below section to inneraHTML
        showHouses.innerHTML += 
        `<div class='card'>
            <p id='name'>${houseData.results[index].name} </p>
            <p id='bathroom'>Bathrooms: ${houseData.results[index].bathrooms}</p>
            <p id='rate'>Rate: $${houseData.results[index].price.rate}</p>
            <button onclick="myFunction('${encodeURIComponent(JSON.stringify(element))}')">Click me</button>
        </div>`;
    });  
}

getDataBtn.addEventListener('click', dataFetch);











