let myStoredCities = JSON.parse(localStorage.getItem('storedCities')) || []

        // for(i = 0; i < myStoredCities.length; i++) {
        //     $("#searchedCities").append("<a href='#' class='searchedCities" + myStoredCities[i] + ">" + myStoredCities[i] + "</a>");
        // }


document.getElementById('searchBtn').addEventListener("click", event=> {
    let cityName = document.getElementById('cityName').value 

    let storedCities = JSON.parse(localStorage.getItem('storedCities')) || []

    storedCities.push(cityName)

    localStorage.setItem('storedCities', JSON.stringify(storedCities))

    console.log(cityName)
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=f33a26ed559de7a11743569e84a3db0e`)

    .then(res=> {
        console.log(res.data)
        let lat = res.data.city.coord.lat 
        let lon = res.data.city.coord.lon
        
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=f33a26ed559de7a11743569e84a3db0e`)
        .then(resp=> {
            console.log(resp.data)
            let uvi 
            if (resp.data.current.uvi <2) {
                uvi = 'green'
            }
            else if (resp.data.current.uvi < 5) {
                uvi = 'yellow'
            }
            else {
                uvi= 'red'
            }
        document.getElementById('currentWeath').innerHTML = `
        <div class="row">
            <div class="col s12 m7">
             <div class="card">
                 <div class="card-image">
                <img src="http://openweathermap.org/img/wn/${res.data.list[0].weather[0].icon}@4x.png">
                <span class="card-title black-text">${res.data.city.name}</span>
                </div>
                <div class="card-content">
                 <p>${res.data.list[0].dt_txt}</p>
                 <p>temperature: ${res.data.list[0].main.temp} °F</p>
                 <p>humidity: ${res.data.list[0].main.humidity} %</p>
                 <p>wind speed: ${res.data.list[0].wind.speed} mph </p>
                 <p class="${uvi}">humidity: ${resp.data.current.uvi}</p>
             </div>
             <div class="card-action">
            </div>
        </div>
        </div>
    </div>
        `
        let weatherArray = []
        let day1 = {
            date: res.data.list[8].dt_txt, 
            icon: res.data.list[8].weather[0].icon,
            temperature: res.data.list[8].main.temp, 
            humidity: res.data.list[8].main.humidity
        }
        let day2 = {
            date: res.data.list[16].dt_txt, 
            icon: res.data.list[16].weather[0].icon,
            temperature: res.data.list[16].main.temp, 
            humidity: res.data.list[16].main.humidity
        }
        let day3 = {
            date: res.data.list[24].dt_txt, 
            icon: res.data.list[24].weather[0].icon,
            temperature: res.data.list[24].main.temp, 
            humidity: res.data.list[24].main.humidity
        }
        let day4 = {
            date: res.data.list[32].dt_txt, 
            icon: res.data.list[32].weather[0].icon,
            temperature: res.data.list[32].main.temp, 
            humidity: res.data.list[32].main.humidity
        }
        let day5 = {
            date: res.data.list[39].dt_txt, 
            icon: res.data.list[39].weather[0].icon,
            temperature: res.data.list[39].main.temp, 
            humidity: res.data.list[39].main.humidity
        }
        weatherArray.push(day1, day2, day3, day4, day5)
        console.log(weatherArray)

        weatherArray.forEach(day=> {
            document.getElementById('fiveDayWeath').innerHTML += `
            <div class="row">
                 <div class="col s12 m7">
                <div class="card">
                <div class="card-image">
                 <img src="http://openweathermap.org/img/wn/${day.icon}@4x.png">
                     <span class="card-title black-text">${day.date}</span>
                </div>
                 <div class="card-content">
            <p>${day.temperature} °F</p>
            <p>${day.humidity} %</p>
            </div>
                <div class="card-action">
                </div>
            </div>
        </div>
    </div>
         `
        })
        })

    })
})