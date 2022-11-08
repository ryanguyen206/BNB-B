

const getDataBtn = document.getElementById('getData');
const testBtn = document.getElementById('test');
const input = document.getElementById('location');


var arr = [{
    id: 1,
    name: 'bill'
  }, {
    id: 2,
    name: 'ted'
  }]
  
  var result = arr.map(person => ({ value: person.id, text: person.name }));
  console.log(result)

testBtn.addEventListener('click', () => {
    console.log(input.value);
    document.getElementById("map").innerText= result;

})



const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'cbdec378c8mshfe41795a7bdc811p1ae758jsn9534bad29014',
		'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
	}
};



const dataFetch =  async () => {
    const response =  await fetch('https://airbnb13.p.rapidapi.com/search-location?location=bellevue&checkin=2022-11-04&checkout=2022-11-10&adults=4&infants=0&page=2', options)
    const data =  await response.json();
    console.log(data);

}


getDataBtn.addEventListener('click', dataFetch);


