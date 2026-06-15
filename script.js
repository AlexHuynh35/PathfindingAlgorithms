var width = 10;
var length = 10;
var size = 25;
var currentSelection = "start";
var start = [0, 0];
var end = [length - 1, length - 1];
var grid = {};

function makeGrid() {
    $(".grid").css({
        "display": "grid",
        "grid-template-columns": "repeat(" + width + ", 1fr)",
        "grid-template-rows": "repeat(" + length + ", 1fr)"
    });

    $("#map_container").html("");
    for (var x = 0; x < width; x++) {
        grid[`x${x}`] = {};
        for (var y = 0; y < length; y++) {
            $("#map_container").append(`<div class='map_box' id='map_box-${x}_${y}'></div>`);
            grid[`x${x}`][`y${y}`] = {
                weight: 1,
                wall: false
            }
        }
    }
    $(".map_box").css({
        "border": "1px black solid",
        "height": size,
        "width": size,
        "align-content": "center",
        "text-align": "center",
        "cursor": "default",
        "user-select": "none"
    });
    $(`#map_box-${start[0]}_${start[1]}`).css({
        "background-color": "yellow"
    });
    $(`#map_box-${end[0]}_${end[1]}`).css({
        "background-color": "green"
    });

    $(`#start`).css({
        "background-color": "gray",
    });
    $(`#end`).css({
        "background-color": "",
    });
    $(`#wall`).css({
        "background-color": "",
    });
    $(`#cost_up`).css({
        "background-color": "",
    });
    $(`#cost_down`).css({
        "background-color": "",
    });
    $(`#clear`).css({
        "background-color": "",
    });

    $("#d_container").html("");
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < length; y++) {
            $("#d_container").append(`<div class='d_box' id='d_box-${x}_${y}'></div>`);
        }
    }
    $(".d_box").css({
        "border": "1px black solid",
        "height": size,
        "width": size,
        "align-content": "center",
        "text-align": "center",
        "cursor": "default",
        "user-select": "none"
    });
    $(`#d_box-${start[0]}_${start[1]}`).css({
        "background-color": "yellow"
    });
    $(`#d_box-${end[0]}_${end[1]}`).css({
        "background-color": "green"
    });

    $("#a_container").html("");
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < length; y++) {
            $("#a_container").append(`<div class='a_box' id='a_box-${x}_${y}'></div>`);
        }
    }
    $(".a_box").css({
        "border": "1px black solid",
        "height": size,
        "width": size,
        "align-content": "center",
        "text-align": "center",
        "cursor": "default",
        "user-select": "none"
    });
    $(`#a_box-${start[0]}_${start[1]}`).css({
        "background-color": "yellow"
    });
    $(`#a_box-${end[0]}_${end[1]}`).css({
        "background-color": "green"
    });
}

makeGrid();

$("#start").click(function () {
    currentSelection = "start";
    $(`#start`).css({
        "background-color": "gray",
    });
    $(`#end`).css({
        "background-color": "",
    });
    $(`#wall`).css({
        "background-color": "",
    });
    $(`#cost_up`).css({
        "background-color": "",
    });
    $(`#cost_down`).css({
        "background-color": "",
    });
    $(`#clear`).css({
        "background-color": "",
    });
});

$("#end").click(function () {
    currentSelection = "end";
    $(`#start`).css({
        "background-color": "",
    });
    $(`#end`).css({
        "background-color": "gray",
    });
    $(`#wall`).css({
        "background-color": "",
    });
    $(`#cost_up`).css({
        "background-color": "",
    });
    $(`#cost_down`).css({
        "background-color": "",
    });
    $(`#clear`).css({
        "background-color": "",
    });
});

$("#wall").click(function () {
    currentSelection = "wall";
    $(`#start`).css({
        "background-color": "",
    });
    $(`#end`).css({
        "background-color": "",
    });
    $(`#wall`).css({
        "background-color": "gray",
    });
    $(`#cost_up`).css({
        "background-color": "",
    });
    $(`#cost_down`).css({
        "background-color": "",
    });
    $(`#clear`).css({
        "background-color": "",
    });
});

$("#cost_up").click(function () {
    currentSelection = "cost_up";
    $(`#start`).css({
        "background-color": "",
    });
    $(`#end`).css({
        "background-color": "",
    });
    $(`#wall`).css({
        "background-color": "",
    });
    $(`#cost_up`).css({
        "background-color": "gray",
    });
    $(`#cost_down`).css({
        "background-color": "",
    });
    $(`#clear`).css({
        "background-color": "",
    });
});

$("#cost_down").click(function () {
    currentSelection = "cost_down";
    $(`#start`).css({
        "background-color": "",
    });
    $(`#end`).css({
        "background-color": "",
    });
    $(`#wall`).css({
        "background-color": "",
    });
    $(`#cost_up`).css({
        "background-color": "",
    });
    $(`#cost_down`).css({
        "background-color": "gray",
    });
    $(`#clear`).css({
        "background-color": "",
    });
});

$("#clear").click(function () {
    currentSelection = "clear";
    $(`#start`).css({
        "background-color": "",
    });
    $(`#end`).css({
        "background-color": "",
    });
    $(`#wall`).css({
        "background-color": "",
    });
    $(`#cost_up`).css({
        "background-color": "",
    });
    $(`#cost_down`).css({
        "background-color": "",
    });
    $(`#clear`).css({
        "background-color": "gray",
    });
});

$('[id^="map_box-"]').on('click', function () {
    boxID = this.id;
    separateID = boxID.split("-");
    coord = separateID[1].split("_");

    if (currentSelection === "start") {
        if ((coord[0] != start[0] || coord[1] != start[1]) && (coord[0] != end[0] || coord[1] != end[1])) {
            $(`#map_box-${coord[0]}_${coord[1]}`).text("");
            $(`#map_box-${coord[0]}_${coord[1]}`).css({
                "background-color": "yellow"
            });
            $(`#map_box-${start[0]}_${start[1]}`).css({
                "background-color": ""
            });
            grid[`x${coord[0]}`][`y${coord[1]}`].weight = 1;
            grid[`x${coord[0]}`][`y${coord[1]}`].wall = false;
            start = [coord[0], coord[1]]
        }
    } else if (currentSelection === "end") {
        if ((coord[0] != start[0] || coord[1] != start[1]) && (coord[0] != end[0] || coord[1] != end[1])) {
            $(`#map_box-${coord[0]}_${coord[1]}`).text("");
            $(`#map_box-${coord[0]}_${coord[1]}`).css({
                "background-color": "green"
            });
            $(`#map_box-${end[0]}_${end[1]}`).css({
                "background-color": ""
            });
            grid[`x${coord[0]}`][`y${coord[1]}`].weight = 1;
            grid[`x${coord[0]}`][`y${coord[1]}`].wall = false;
            end = [coord[0], coord[1]]
        }
    } else if (currentSelection === "wall") {
        if ((coord[0] != start[0] || coord[1] != start[1]) && (coord[0] != end[0] || coord[1] != end[1])) {
            $(`#map_box-${coord[0]}_${coord[1]}`).text("");
            $(`#map_box-${coord[0]}_${coord[1]}`).css({
                "background-color": "gray"
            });
            grid[`x${coord[0]}`][`y${coord[1]}`].weight = 1;
            grid[`x${coord[0]}`][`y${coord[1]}`].wall = true;
        }
    } else if (currentSelection === "cost_up") {
        if ((coord[0] != start[0] || coord[1] != start[1]) && (coord[0] != end[0] || coord[1] != end[1]) && (grid[`x${coord[0]}`][`y${coord[1]}`].weight < 10)) {
            $(`#map_box-${coord[0]}_${coord[1]}`).text(
                grid[`x${coord[0]}`][`y${coord[1]}`].weight + 1
            );
            $(`#map_box-${coord[0]}_${coord[1]}`).css({
                "background-color": ""
            });
            grid[`x${coord[0]}`][`y${coord[1]}`].weight += 1;
            grid[`x${coord[0]}`][`y${coord[1]}`].wall = false;
        }
    } else if (currentSelection === "cost_down") {
        if ((coord[0] != start[0] || coord[1] != start[1]) && (coord[0] != end[0] || coord[1] != end[1]) && (grid[`x${coord[0]}`][`y${coord[1]}`].weight > 1)) {
            $(`#map_box-${coord[0]}_${coord[1]}`).text(
                grid[`x${coord[0]}`][`y${coord[1]}`].weight - 1 === 1 ? "" : grid[`x${coord[0]}`][`y${coord[1]}`].weight - 1
            );
            $(`#map_box-${coord[0]}_${coord[1]}`).css({
                "background-color": ""
            });
            grid[`x${coord[0]}`][`y${coord[1]}`].weight -= 1;
            grid[`x${coord[0]}`][`y${coord[1]}`].wall = false;
        }
    } else {
        if ((coord[0] != start[0] || coord[1] != start[1]) && (coord[0] != end[0] || coord[1] != end[1])) {
            $(`#map_box-${coord[0]}_${coord[1]}`).text("");
            $(`#map_box-${coord[0]}_${coord[1]}`).css({
                "background-color": ""
            });
            grid[`x${coord[0]}`][`y${coord[1]}`].weight = 1;
            grid[`x${coord[0]}`][`y${coord[1]}`].wall = false;
        }
    }
});

$("#save").click(function () {
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < length; y++) {
            if (grid[`x${x}`][`y${y}`].wall) {
                $(`#d_box-${x}_${y}`).css({
                    "background-color": "gray"
                });
                $(`#a_box-${x}_${y}`).css({
                    "background-color": "gray"
                });
            } else {
                $(`#d_box-${x}_${y}`).css({
                    "background-color": ""
                });
                $(`#a_box-${x}_${y}`).css({
                    "background-color": ""
                });
            }

            if (grid[`x${x}`][`y${y}`].weight > 1) {
                $(`#d_box-${x}_${y}`).text(
                    grid[`x${x}`][`y${y}`].weight
                );
                $(`#a_box-${x}_${y}`).text(
                    grid[`x${x}`][`y${y}`].weight
                );
            } else {
                $(`#d_box-${x}_${y}`).text("");
                $(`#a_box-${x}_${y}`).text("");
            }
        }
    }

    $(`#d_box-${start[0]}_${start[1]}`).css({
        "background-color": "yellow"
    });
    $(`#a_box-${start[0]}_${start[1]}`).css({
        "background-color": "yellow"
    });

    $(`#d_box-${end[0]}_${end[1]}`).css({
        "background-color": "green"
    });
    $(`#a_box-${end[0]}_${end[1]}`).css({
        "background-color": "green"
    });
});

$("#reset").click(function () {
    start = [0, 0];
    end = [length - 1, length - 1];

    for (var x = 0; x < width; x++) {
        grid[`x${x}`] = {};
        for (var y = 0; y < length; y++) {
            $(`#map_box-${x}_${y}`).text("");
            $(`#map_box-${x}_${y}`).css({
                "background-color": ""
            });
            grid[`x${x}`][`y${y}`] = {
                weight: 1,
                wall: false
            }
        }
    }

    $(`#map_box-${start[0]}_${start[1]}`).css({
        "background-color": "yellow"
    });

    $(`#map_box-${end[0]}_${end[1]}`).css({
        "background-color": "green"
    });
});