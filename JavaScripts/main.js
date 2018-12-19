$("document").ready( () => {

    $.ajax({
        method: "GET",
        url: "https://api.pokemontcg.io/v1/cards"
    })
    .done(function(answer){
        console.log(answer);
    })
    .fail(function(){
        console.log("Something when wrong");
    });
});