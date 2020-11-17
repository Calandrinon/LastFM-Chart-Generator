let username = undefined;
let grid_size = undefined;

function build_chart_image(chart_object) {
    let canvas = document.getElementById("chart_canvas");
    let context = canvas.getContext("2d");
    let albums = {
        images: []
    };
    let api_key = config.MY_KEY; 

    let dummy_image = new Image();
    dummy_image.src = "https://lastfm.freetls.fastly.net/i/u/174s/dfb8c764b71741e0c1652f197daacd4a.png";
    let image_width = dummy_image.width;
    let image_height = dummy_image.height;
    
    for (let album_index = 0; album_index < grid_size * grid_size; album_index++) {
        let album_cover = new Image();
        let artist_name = chart_object[album_index].artist["#text"];
        let album_title = chart_object[album_index].name.replace(/ /g, "+");
        let url = `http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${api_key}&artist=${artist_name}&album=${album_title}&format=json`;

        let album_art_link = fetch(url).
            then(res => res.json()).
            then(data => {return data});
        
        album_art_link.then(function(result) {
            albums.images.push(result.album.image[2]["#text"]);
        });
    } 

    let index = 0;
    console.log(albums.images);
    console.log(albums.images.length);
    console.log("wtf...");
    for (let i = 0; i < grid_size; i++) {
        for (let j = 0; j < grid_size; j++) {
            let image = new Image();
            image.src = albums.images[index];
            image.onload = function () {
                context.drawImage(image, i * image_width, j * image_height);
            }
            index++;
        }
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


function main() {
    get_preferences();
    request_chart_json();
}

main();