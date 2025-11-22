define([], () => {
  'use strict';
let startTime, updatedTime, difference, interval;
  let running = false;
  class PageModule {
    getCurrentDateTime() {   
     return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };
     getCurrentDate() {   
     return new Date().toLocaleDateString('en-UK');
    };
     startTimer() {    
      if (!running) {
        running = true;
        startTime = new Date().getTime() - (difference || 0);
        interval = setInterval(this.updateTimer(), 1000);
      }
    };
    updateTimer() {      
      const display = document.getElementById('timer');
      updatedTime = new Date().getTime();
      difference = updatedTime - startTime;
      let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((difference % (1000 * 60)) / 1000);
      hours = (hours < 10) ? '0' + hours : hours;
      minutes = (minutes < 10) ? '0' + minutes : minutes;
      seconds = (seconds < 10) ? '0' + seconds : seconds;
      display.textContent = `${hours}:${minutes}:${seconds}`;
    }
    timeDifference(time1, time2) {
      let t1 = time1.split(" ");
      let t2 = time2.split(" ");
      const [h1, m1] = t1[0].split(":").map(Number);
      const [h2, m2] = t2[0].split(":").map(Number);

      const date1 = new Date(0, 0, h1, m1);
      const date2 = new Date(0, 0, h2, m2);

      let diffMs = Math.abs(date2 - date1); // Difference in milliseconds

      let diffH = Math.floor(diffMs / (1000 * 60 * 60));
      diffMs %= (1000 * 60 * 60);
      let diffM = Math.floor(diffMs / (1000 * 60));
      diffMs %= (1000 * 60);
      let diffS = Math.floor(diffMs / 1000);

      return `${diffH}:${diffM}`;
    }
     getLocation(lat, lng) {
    const accessToken = 'pk.eyJ1IjoibWF0c2JyeW50c2UiLCJhIjoiY2tlcHdqd2lrM3hlZjJybHRpeDR0amo1cCJ9.PJc0GY_loGf0iQKlewuL0w'; // Replace with your actual Mapbox token
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${accessToken}`;

    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.features.length > 0) {
                    resolve(data.features[0].place_name); // Return location
                } else {
                    reject("No location found.");
                }
            })
            .catch(error => reject("Error fetching location: " + error));
    });
   }
  }
  
  return PageModule;
});
