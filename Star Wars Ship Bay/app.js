// Variables grabbing html elements
var result = document.getElementById("searchResults");
var starshipInput = document.getElementById("starship");

// Display search results
function displaySearch() {
        // Gets value of search input
        var starship = starshipInput.value;
        //console.log(starship);
        // Creates request to Star Wars API
        var xhr = new XMLHttpRequest();
        // Value of search input is added to the URI
        xhr.open('GET', 'https://swapi.co/api/starships/?search='+starship); 
        xhr.onload = function () {
            if (this.status == 200) {
                var results = JSON.parse(xhr.responseText);
                //console.log(results);
                // results.results is an Array
                // loops through that array to return results
                // each iteration creates a card
                var output = ``;
                for (i = 0; i < results.results.length; i++) {
                    output += `
                <div class="card text-white bg-primary mb-3">
                    <div class="card-header"><h3>Starship</h3></div>
                    <div class="card-body">
                        <h4 class="card-title">${results.results[i].name}</h4>
                        <h5 class="card-text display1">Specifics</h5>
                        <ul style="list-style: none;">
                            <li class="display4">Model: ${results.results[i].model}</li>
                            <li class="display4">Manufacturer: ${results.results[i].manufacturer}</li>
                            <li class="display4">Cost (In Credits): ${results.results[i].cost_in_credits}</li>
                            <li class="display4">Number in Crew: ${results.results[i].crew}</li>
                            <li class="display4">Starship Class: ${results.results[i].starship_class}</li>
                            <li class="display4">Number of Passengers: ${results.results[i].passengers}</li>
                        </ul>
                    </div>
                </div>
                `;
                }
                // outputs each card to the searchResults div
                result.innerHTML = output;
                // if the search returns no results
                if(results.results.length == 0) {
                    //console.log("No results returned");
                    result.innerHTML = `
                    <div class="card text-white bg-danger mb-3">
                        <div class="card-header"><h3>This is not the ship you're looking for!</h3></div>
                        <div class="card-body">
                            <p class="card-text display1">Your search did not return any results. 
                            <br>
                            Please try again!
                            </p>
                        </div>
                    </div>
                    `
                }
            }
        }
        xhr.send();
}
// function fires on every input
starshipInput.addEventListener('input', displaySearch);

// API Source https://swapi.co/api

// Starship Schema Reference 
/*
cost_in_credits: string
created
crew
edited
films: Returns an array of uri's to the corresponding films the ship appears in
hyperdrive_rating
length
manufacturer
max_atmosphering_speed
model
name
passengers
pilots: Returns an array of uri's to the corresponding pilots the ship has
starship_class
url: Links to the api reference page
*/
