

const getDataBtn = document.getElementById('getData');
const getUserInput = document.getElementById('test');
const userInput = document.getElementById('location');
const showHouses = document.getElementById('showHouses');
let index = 0;

let houseData = [];


function myFunction(element) {
    element = JSON.parse(decodeURIComponent(element))
}

//here is the code to actual retrieve the data from the api.
const dataFetch =  async () => {
  
    const response = await fetch(`http://localhost:3000?location=florida`);

    houseData =  await response.json();

    houseData.forEach((element,index) => {
        //for each element in array, keep on adding below section to inneraHTML
        showHouses.innerHTML += 
        `<div class='card'>
            <p id='name'>${houseData[index].name} </p>
            <p id='bathroom'>Bathrooms: ${houseData[index].bathrooms}</p>
            <p id='rate'>Rate: $${houseData[index].price.rate}</p>
            <button onclick="myFunction('${encodeURIComponent(JSON.stringify(element))}')">Click me</button>
        </div>`;
    });  
}

getDataBtn.addEventListener('click', dataFetch);

