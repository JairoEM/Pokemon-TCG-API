$(document).ready( function() {
    var $cards = $("section#pokemonCards");
    var $win = $(window);
    var page = 1;
    var scroll = true;

    $.ajax({
        method: "GET",
        url: "https://api.pokemontcg.io/v1/cards?page="+ page +"&pageSize=12"
    })
    
    .done(function(result){          
        for(let i = 0; i < result.cards.length; i++){
            $cards.append("<div class='pokemonCard'></div>");
            var $card = $("div.pokemonCard:last-child");
            $card.append("<h3>"+ result.cards[i].name +"</h3>");
            $card.append("<img src="+ result.cards[i].imageUrl +">");
        }
        page++;
    })

    .fail(function(){
        console.error("API NOT WORKING");
        alert("API NOT WORKING");
    });

    $win.scroll( function() {
        if ($(document).height() - $win.height() <= $win.scrollTop()) {
            console.log("1");
            if(scroll == true){
                scroll = false;
                $.ajax({
                    method: "GET",
                    url: "https://api.pokemontcg.io/v1/cards?page="+ page +"&pageSize=12",

                    success: function(result) {     
                        for(let i = 0; i < result.cards.length; i++){
                            $cards.append("<div class='pokemonCard'></div>");
                            var $card = $("div.pokemonCard:last-child");
                            // TAGS
                            $card.append("<h3>"+ result.cards[i].name +"</h3>");
                            $card.append("<img src="+ result.cards[i].imageUrl +">");
                        }
                        page++;
                        scroll = true;
                        console.log("2");
                    }
                });
            }
        }
    });
});