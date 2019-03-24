var bg = document.body;
var time = document.getElementById("clock");

function getTime() {
  return fetch(
    "https://fcs8z8eby4.execute-api.us-east-1.amazonaws.com/default/auraxis-time"
  )
    .then(function(response) {
      console.log(response);
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      time.textContent = data;
      return data;
    });
}

getTime();
