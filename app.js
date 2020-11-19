let username = undefined;
let grid_size = undefined;

function build_chart_image(chart_object) {
    let canvas = document.getElementById("chart_canvas");
    let context = canvas.getContext("2d");
    let api_key = config.MY_KEY; 

    let dummy_image = new Image();
    dummy_image.src = "https://lastfm.freetls.fastly.net/i/u/174s/dfb8c764b71741e0c1652f197daacd4a.png";
    let image_width = dummy_image.width, image_height = dummy_image.height;
    let row = 0, column = 0;
    
    for (let album_index = 0; album_index < grid_size * grid_size; album_index++) {
        let album_cover = new Image();
        let artist_name = chart_object[album_index].artist["#text"];
        let album_title = chart_object[album_index].name.replace(/ /g, "+");
        console.log(`${artist_name} - ${album_title}`);
        let url = `http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${api_key}&artist=${artist_name}&album=${album_title}&format=json`;

        fetch(url).
            then(res => res.json()).
            then(data => {
            let image = new Image();
            image.src = data.album.image[2]["#text"];
            image.onload = function () {
                context.drawImage(image, row * image_height, column * image_width);
                column++;
                if (column == grid_size) {
                    row++;
                    column = 0;
                }
            }
        }).catch(error => console.log(error));
        
    } 

    context.canvas.width = image_width * grid_size; 
    context.canvas.height = image_height * grid_size; 
}


function request_chart_json() {
    let api_key = config.MY_KEY; 
    let url = `http://ws.audioscrobbler.com/2.0/?method=user.getweeklyalbumchart&user=${username}&api_key=${api_key}&format=json`;

    $.getJSON(url, function(data) {
        let chart_object = data.weeklyalbumchart.album;
        build_chart_image(chart_object);
    });
}


function get_preferences() {
    username = document.getElementById("username").value;
    grid_size = document.getElementById("gridsize").value;
}


function set_canvas_border() {
    document.getElementById("chart_canvas").style.border = "3px solid #336600"; 
    document.getElementById("chart_canvas").style.borderRadius = "20px"; 
}


function main() {
    get_preferences();
    request_chart_json();
    set_canvas_border();
}
