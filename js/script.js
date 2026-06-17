var width = 10;
var height = 10;
var size = 25;
var currentSelection = "start";

var gridInfo;
var dPathfinding;
var aPathfinding;

function makeGrid() {
    gridInfo = new GridInfo(width, height);
    var start = gridInfo.getStart();
    var end = gridInfo.getEnd();

    dPathfinding = new Dijkstras(width, height);
    aPathfinding = new Astar(width, height);

    $(".grid").css({
        "display": "grid",
        "grid-template-columns": "repeat(" + width + ", 1fr)",
        "grid-template-rows": "repeat(" + height + ", 1fr)"
    });

    $("#map_container").html("");
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            $("#map_container").append(`<div class='map_box' id='map_box-${x}_${y}'></div>`);
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
        for (var y = 0; y < height; y++) {
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
        for (var y = 0; y < height; y++) {
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
    var boxID = this.id;
    var separateID = boxID.split("-");
    var coord = separateID[1].split("_");

    var start = gridInfo.getStart();
    var end = gridInfo.getEnd();
    var grid = gridInfo.getGrid();

    if (currentSelection === "start") {
        if ((coord[0] != start[0] || coord[1] != start[1]) && (coord[0] != end[0] || coord[1] != end[1])) {
            $(`#map_box-${coord[0]}_${coord[1]}`).text("");
            $(`#map_box-${coord[0]}_${coord[1]}`).css({
                "background-color": "yellow"
            });
            $(`#map_box-${start[0]}_${start[1]}`).css({
                "background-color": ""
            });
            gridInfo.updateTile(coord[0], coord[1], 1, false);
            gridInfo.updateStart(coord[0], coord[1]);
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
            gridInfo.updateTile(coord[0], coord[1], 1, false);
            gridInfo.updateEnd(coord[0], coord[1]);
        }
    } else if (currentSelection === "wall") {
        if ((coord[0] != start[0] || coord[1] != start[1]) && (coord[0] != end[0] || coord[1] != end[1])) {
            $(`#map_box-${coord[0]}_${coord[1]}`).text("");
            $(`#map_box-${coord[0]}_${coord[1]}`).css({
                "background-color": "gray"
            });
            gridInfo.updateTile(coord[0], coord[1], 1, true);
        }
    } else if (currentSelection === "cost_up") {
        if ((coord[0] != start[0] || coord[1] != start[1]) && (coord[0] != end[0] || coord[1] != end[1]) && (grid[coord[0]][coord[1]].getWeight() < 10)) {
            $(`#map_box-${coord[0]}_${coord[1]}`).text(
                grid[coord[0]][coord[1]].getWeight() + 1
            );
            $(`#map_box-${coord[0]}_${coord[1]}`).css({
                "background-color": ""
            });
            gridInfo.updateTile(coord[0], coord[1], grid[coord[0]][coord[1]].getWeight() + 1, false);
        }
    } else if (currentSelection === "cost_down") {
        if ((coord[0] != start[0] || coord[1] != start[1]) && (coord[0] != end[0] || coord[1] != end[1]) && (grid[coord[0]][coord[1]].getWeight() > 1)) {
            $(`#map_box-${coord[0]}_${coord[1]}`).text(
                grid[coord[0]][coord[1]].getWeight() - 1 === 1 ? "" : grid[coord[0]][coord[1]].getWeight() - 1
            );
            $(`#map_box-${coord[0]}_${coord[1]}`).css({
                "background-color": ""
            });
            gridInfo.updateTile(coord[0], coord[1], grid[coord[0]][coord[1]].getWeight() - 1, false);
        }
    } else {
        if ((coord[0] != start[0] || coord[1] != start[1]) && (coord[0] != end[0] || coord[1] != end[1])) {
            $(`#map_box-${coord[0]}_${coord[1]}`).text("");
            $(`#map_box-${coord[0]}_${coord[1]}`).css({
                "background-color": ""
            });
            gridInfo.updateTile(coord[0], coord[1], 1, false);
        }
    }
});

$("#save").click(function () {
    var start = gridInfo.getStart();
    var end = gridInfo.getEnd();
    var grid = gridInfo.getGrid();

    dPathfinding.updateGrid(start, end, grid);
    aPathfinding.updateGrid(start, end, grid);

    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            console.log(x);
            console.log(y);
            console.log(grid[x][y].getWall());
            if (grid[x][y].getWall()) {
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

            if (grid[x][y].getWeight() > 1) {
                $(`#d_box-${x}_${y}`).text(
                    grid[x][y].getWeight()
                );
                $(`#a_box-${x}_${y}`).text(
                    grid[x][y].getWeight()
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
    gridInfo.resetGridInfo();
    var start = gridInfo.getStart();
    var end = gridInfo.getEnd();

    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            $(`#map_box-${x}_${y}`).text("");
            $(`#map_box-${x}_${y}`).css({
                "background-color": ""
            });
        }
    }

    $(`#map_box-${start[0]}_${start[1]}`).css({
        "background-color": "yellow"
    });

    $(`#map_box-${end[0]}_${end[1]}`).css({
        "background-color": "green"
    });
});