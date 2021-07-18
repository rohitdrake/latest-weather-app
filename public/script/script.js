




const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const place = document.querySelector('#message-1');
const currentTemp = document.querySelector('#message-2');
const feelsLike = document.querySelector('#message-3');
const weatherDescription = document.querySelector('#message-4');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    place.innerHTML = "Loading....";
    

    let weatherURL = '/weather?address='+search.value;

    fetch(weatherURL).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            place.innerHTML = "Error";
            descriptionText.innerHTML = data.error;
        } else {
            place.innerHTML = data.place;
            currentTemp.innerHTML= "Temperature:" + data.current_temperatur;
            feelsLike.innerHTML = "Feels Like: "+data.feels_like
            weatherDescription.innerHTML = data.description
            console.log("Temperature:", data.current_temperatur);
            console.log("Feels Like:", data.feels_like);
            console.log("Place", data.place);
        }
    });
});

});