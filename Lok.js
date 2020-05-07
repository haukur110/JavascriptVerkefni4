// Þarf https fyrir GitHub Pages 
fetch('https://apis.is/LokData')  
//  JSON skrá sem eru local (ekki á miðlarar) hleðst ekki, færð villumeldingu, sjá console 
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        console.log(data);  // data is an object
        console.log(data.results[1].eventDateName); // úttak er strengur td: U2 Tribute Austurland að Glettingi			
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
