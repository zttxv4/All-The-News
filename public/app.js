$.getJSON("/articles", function(data){
    for (var i = 0; i < data.length; i++){
        $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
});

$(document).on("click", "p", function(){
    $("#notes").empty();
    var thisID = $(this).attr("data-id");

    $.ajax({
        method: "GET",
        url: "/articles/" + thisID
    })

        .then(function(data){
            console.log(data);

            $("#notes").append("<h2>" + data.title + "</h2>");
            $("#notes").append("<input id='titleinput' name='body'></textarea>");
            $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

            if (data.note){
                $("#titleinput").val(data.note.title);
                $("#bodyinput").val(data.note.body);
            }
        })
})

$(document).on("click", "#savenote", function(){
    var thisID = $(this).attr("data-id");

    $.ajax({
        method: "POST",
        url: "/articles/" + thisID,
        data: {
            title: $("#titleinput").val(),
            body: $("#bodyinput").val()
        }
    })
    .then(function(data){
        console.log(data);
        $("#notes").empty();
    })

    $("#titleinput").val("");
    $("#bodyinput").val("");
})