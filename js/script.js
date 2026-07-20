var width = 10;
var height = 10;
var size = 25;
var currentSelection = "start";
var speed = [0.5, 0.2, 0.1, 0.05];
var currentSpeed = 1;

var gridInfo;
var dPathfinding;
var aPathfinding;

function makeGrid() {
    gridInfo = new GridInfo(width, height);
    let start = gridInfo.getStart();
    let end = gridInfo.getEnd();

    dPathfinding = new Pathfinding(width, height, 0);
    aPathfinding = new Pathfinding(width, height, 2);

    $(".grid").css({
        "display": "grid",
        "grid-template-columns": "repeat(" + width + ", 1fr)",
        "grid-template-rows": "repeat(" + height + ", 1fr)"
    });

    $("#map_container").html("");
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
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
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
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
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
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

    $(`#speed-${currentSpeed}`).css({
        "background-color": "red"
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
    let boxID = this.id;
    let separateID = boxID.split("-");
    let coord = separateID[1].split("_");

    let start = gridInfo.getStart();
    let end = gridInfo.getEnd();
    let grid = gridInfo.getGrid();

    if (currentSelection == "start") {
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
    } else if (currentSelection == "end") {
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
    } else if (currentSelection == "wall") {
        if ((coord[0] != start[0] || coord[1] != start[1]) && (coord[0] != end[0] || coord[1] != end[1])) {
            $(`#map_box-${coord[0]}_${coord[1]}`).text("");
            $(`#map_box-${coord[0]}_${coord[1]}`).css({
                "background-color": "gray"
            });
            gridInfo.updateTile(coord[0], coord[1], 1, true);
        }
    } else if (currentSelection == "cost_up") {
        if ((coord[0] != start[0] || coord[1] != start[1]) && (coord[0] != end[0] || coord[1] != end[1]) && (grid[coord[0]][coord[1]].getWeight() < 10)) {
            $(`#map_box-${coord[0]}_${coord[1]}`).text(
                grid[coord[0]][coord[1]].getWeight() + 1
            );
            $(`#map_box-${coord[0]}_${coord[1]}`).css({
                "background-color": ""
            });
            gridInfo.updateTile(coord[0], coord[1], grid[coord[0]][coord[1]].getWeight() + 1, false);
        }
    } else if (currentSelection == "cost_down") {
        if ((coord[0] != start[0] || coord[1] != start[1]) && (coord[0] != end[0] || coord[1] != end[1]) && (grid[coord[0]][coord[1]].getWeight() > 1)) {
            $(`#map_box-${coord[0]}_${coord[1]}`).text(
                grid[coord[0]][coord[1]].getWeight() - 1 == 1 ? "" : grid[coord[0]][coord[1]].getWeight() - 1
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
    let start = gridInfo.getStart();
    let end = gridInfo.getEnd();
    let grid = gridInfo.getGrid();

    dPathfinding.updateGrid(start, end, grid);
    aPathfinding.updateGrid(start, end, grid);

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
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

    $("#d_done").text("");
    $("#d_done").css({
        "color": "black"
    });

    $("#a_done").text("");
    $("#a_done").css({
        "color": "black"
    });
});

$("#reset").click(function () {
    gridInfo.resetGridInfo();
    let start = gridInfo.getStart();
    let end = gridInfo.getEnd();

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
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

$('[id^="speed-"]').on('click', function () {
    let boxID = this.id;
    let separateID = boxID.split("-");

    currentSpeed = separateID[1];
    for (let i = 0; i < speed.length; i++) {
        $(`#speed-${i}`).css({
            "background-color": "white"
        });
    }

    $(`#speed-${currentSpeed}`).css({
        "background-color": "red"
    });
});

$("#play").click(function () {
    pathFind();
});

const wait = (seconds) => new Promise(resolve => setTimeout(resolve, seconds * 1000));

async function pathFind() {
    $("#play").prop("disabled", true);
    $("#save").prop("disabled", true);

    $("#d_done").text("(...)");
    $("#d_done").css({
        "color": "black"
    });

    $("#a_done").text("(...)");
    $("#a_done").css({
        "color": "black"
    });

    dPathfinding.resetCurrentGrid();
    aPathfinding.resetCurrentGrid();

    dPathfinding.performFirstStep();
    aPathfinding.performFirstStep();

    while (!dPathfinding.done || !aPathfinding.done) {
        if (!dPathfinding.done) {
            if (!dPathfinding.reachLast) {
                dPathfinding.performNextStep();

                let dPathStart = dPathfinding.currentGridInfo.getStart();
                let dPathEnd = dPathfinding.currentGridInfo.getEnd();
                let dPathGrid = dPathfinding.currentGridInfo.getGrid();

                for (let x = 0; x < width; x++) {
                    for (let y = 0; y < height; y++) {
                        if (dPathGrid[x][y].getWall()) {
                            $(`#d_box-${x}_${y}`).css({
                                "background-color": "gray"
                            });
                        } else if (dPathGrid[x][y].getVisited()) {
                            $(`#d_box-${x}_${y}`).css({
                                "background-color": "blue"
                            });
                        } else {
                            $(`#d_box-${x}_${y}`).css({
                                "background-color": ""
                            });
                        }

                        if (dPathGrid[x][y].getWeight() > 1) {
                            $(`#d_box-${x}_${y}`).text(
                                dPathGrid[x][y].getWeight()
                            );
                        } else {
                            $(`#d_box-${x}_${y}`).text("");
                        }
                    }
                }

                $(`#d_box-${dPathStart[0]}_${dPathStart[1]}`).css({
                    "background-color": "yellow"
                });
                $(`#d_box-${dPathEnd[0]}_${dPathEnd[1]}`).css({
                    "background-color": "green"
                });
            } else {
                dPathfinding.performLastStep();

                let dPathStart = dPathfinding.currentGridInfo.getStart();
                let dPathEnd = dPathfinding.currentGridInfo.getEnd();
                let dPath = dPathfinding.getPath();

                if (dPath.length > 0) {
                    for (let i = 0; i < dPath.length; i++) {
                        let tile = dPath[i];
                        $(`#d_box-${tile[0]}_${tile[1]}`).css({
                            "background-color": "teal"
                        });
                    }

                    $(`#d_box-${dPathStart[0]}_${dPathStart[1]}`).css({
                        "background-color": "yellow"
                    });
                    $(`#d_box-${dPathEnd[0]}_${dPathEnd[1]}`).css({
                        "background-color": "green"
                    });

                    $("#d_done").text("");
                    $("#d_done").append("&check;");
                    $("#d_done").css({
                        "color": "green"
                    });
                } else {
                    $("#d_done").text("");
                    $("#d_done").append("&cross;");
                    $("#d_done").css({
                        "color": "red"
                    });
                }
            }
        }

        if (!aPathfinding.done) {
            if (!aPathfinding.reachLast) {
                aPathfinding.performNextStep();

                let aPathStart = aPathfinding.currentGridInfo.getStart();
                let aPathEnd = aPathfinding.currentGridInfo.getEnd();
                let aPathGrid = aPathfinding.currentGridInfo.getGrid();

                for (let x = 0; x < width; x++) {
                    for (let y = 0; y < height; y++) {
                        if (aPathGrid[x][y].getWall()) {
                            $(`#a_box-${x}_${y}`).css({
                                "background-color": "gray"
                            });
                        } else if (aPathGrid[x][y].getVisited()) {
                            $(`#a_box-${x}_${y}`).css({
                                "background-color": "blue"
                            });
                        } else {
                            $(`#a_box-${x}_${y}`).css({
                                "background-color": ""
                            });
                        }

                        if (aPathGrid[x][y].getWeight() > 1) {
                            $(`#a_box-${x}_${y}`).text(
                                aPathGrid[x][y].getWeight()
                            );
                        } else {
                            $(`#a_box-${x}_${y}`).text("");
                        }
                    }
                }

                $(`#a_box-${aPathStart[0]}_${aPathStart[1]}`).css({
                    "background-color": "yellow"
                });
                $(`#a_box-${aPathEnd[0]}_${aPathEnd[1]}`).css({
                    "background-color": "green"
                });
            } else {
                aPathfinding.performLastStep();

                let aPathStart = aPathfinding.currentGridInfo.getStart();
                let aPathEnd = aPathfinding.currentGridInfo.getEnd();
                let aPath = aPathfinding.getPath();

                if (aPath.length > 0) {
                    for (let i = 0; i < aPath.length; i++) {
                        let tile = aPath[i];
                        $(`#a_box-${tile[0]}_${tile[1]}`).css({
                            "background-color": "teal"
                        });
                    }

                    $(`#a_box-${aPathStart[0]}_${aPathStart[1]}`).css({
                        "background-color": "yellow"
                    });
                    $(`#a_box-${aPathEnd[0]}_${aPathEnd[1]}`).css({
                        "background-color": "green"
                    });

                    $("#a_done").text("");
                    $("#a_done").append("&check;");
                    $("#a_done").css({
                        "color": "green"
                    });
                } else {
                    $("#a_done").text("");
                    $("#a_done").append("&cross;");
                    $("#a_done").css({
                        "color": "red"
                    });
                }
            }
        }

        await wait(speed[currentSpeed]);
    }

    $("#play").prop("disabled", false);
    $("#save").prop("disabled", false);
}