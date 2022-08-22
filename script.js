const container = document.querySelector(".container"),
    card1 = container.querySelector(".card1"),
    infoText = card1.querySelector(".info-text"),
    inputField = card1.querySelector("input"),
    locationBtn = card1.querySelector(".btn"),
    wIcon = container.querySelector(".card2 img"),
    arowBack = container.querySelector(".card-header i");



//**************************event handeling for input field**********************************************

inputField.addEventListener("keyup", e => {
    if (e.key == "Enter" && inputField.value != "") {  // if user press enter buton and input field is not empty
        requestApi(inputField.value);
    }
});

function requestApi(city) {
    var api = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=dc0edfa56cec3cdb7e9fee3e7f349403";
    infoText.innerHTML = "Getting Weather details...";
    infoText.classList.add("pending");

    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}

function weatherDetails(info) {
    infoText.classList.replace("pending", "error");
    if (info.cod == "404") {
        infoText.innerHTML = 'invalid city name';
    } else {
        const name = info.name;
        const country = info.sys.country;
        const {description , id} = info.weather[0];
        const {feels_like , humidity , temp} = info.main;

        container.querySelector(".temp .numb").innerHTML = Math.floor(temp);
        container.querySelector(".weather").innerHTML = description;
        container.querySelector(".location span").innerHTML = name +' , '+ country;
        container.querySelector(".details .numb-2").innerHTML = Math.floor(feels_like);
        container.querySelector(".humiditys span").innerHTML = humidity+'%';

        if(id == 800){
            wIcon.src = "images/clear.svg";
            document.body.style.backgroundImage = "url(images/clearbg.jpg)";
        }else if(id>=200 && id<=232){
            wIcon.src = "images/storm.svg";
            document.body.style.backgroundImage = "url(images/stormbg.jpg)";
        }else if(id>=600 && id<=622){
            wIcon.src = "images/snow.svg";
            document.body.style.backgroundImage = "url(images/snowbg.jpg)";
        }else if(id>=701 && id<=781){
            wIcon.src = "images/haze.svg";
            document.body.style.backgroundImage = "url(images/hazebg.jpg)";
        }else if(id>=801 && id<=804){
            wIcon.src = "images/cloud.svg";
            document.body.style.backgroundImage = "url(images/cloudbg.jpg)";
        }else if((id>=300 && id<=321) || (id>=500 && id<=531)) {
            wIcon.src = "images/rain.svg";
            document.body.style.backgroundImage = "url(images/rainbg.jpg)";
        }


        infoText.classList.replace("error", "pending");
        container.classList.add("active");
        console.log(info);
    }
}

//*********************************event handeling for get location button******************************************

locationBtn.addEventListener("click", () => {
    if (navigator.geolocation) {   //  if browser suppport geolocation api
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        alert("your browser donot support geolocation api");
    }
});

function onSuccess(position) {
    const { latitude, longitude } = position.coords; //getting lat and lon of user device from coords object
    var api = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&units=metric&appid=dc0edfa56cec3cdb7e9fee3e7f349403";
    infoText.innerHTML = "Getting Weather details...";
    infoText.classList.add("pending");

    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}

function onError(error) {
    infoText.innerHTML = error.message;
    infoText.classList.add("error");
}



arowBack.addEventListener("click", () => {
    container.classList.remove("active");
    document.body.style.background = "#43AFFC";
});
