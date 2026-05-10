function makeGrid(width, length, size) {
    $(".grid").css({
        "display": "grid",
        "grid-template-columns": "repeat(" + width + ", 1fr)",
        "grid-template-rows": "repeat(" + length + ", 1fr)"
    });

    $("#map_container").html("");
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < length; y++) {
            $("#map_container").append(`<div class='map_box' id='map_box-${x}_${y}'></div>`);
        }
    }

    $(".map_box").css({
        "border": "1px black solid",
        "height": size,
        "width": size
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
        "width": size
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
        "width": size
    });
}

makeGrid(10, 10, 25);