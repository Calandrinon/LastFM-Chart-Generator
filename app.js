let username = undefined;
let grid_size = undefined;


function request_chart_json() {
    let api_key = config.MY_KEY; 
    let chart_option = undefined;
    let url = `http://ws.audioscrobbler.com/2.0/?method=user.getweeklyalbumchart&user=${username}&api_key=${api_key}&format=json`;

    $.getJSON(url, function(data) {
        console.log(data);
    });
}


function get_preferences() {
    username = document.getElementById("username").value;
    grid_size = document.getElementById("gridsize").value;
    console.log(`${username} ${grid_size}`);
}


function main() {
    get_preferences();
    request_chart_json();
}

main();