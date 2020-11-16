let username = undefined;
let timespan= undefined;
let grid_size = undefined;

function get_preferences() {
    username = document.getElementById("username").value;
    timespan = document.getElementById("timespan").value;
    grid_size = document.getElementById("gridsize").value;
    console.log(`${username} ${timespan} ${grid_size}`);
}


function main() {
    get_preferences();
}

main();