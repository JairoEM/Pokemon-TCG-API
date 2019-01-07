$("document").ready( () => {
    var $cards = $("section#pokemonCards");
    var $win = $(window);
    var page = 1;

    // INITIAL PETITION
    $.ajax({
        method: "GET",
        url: "https://api.pokemontcg.io/v1/cards?page="+ page +"&pageSize=12"
    })
    
    .done(function(result){          
        for(let i = 0; i < result.length; i++){
            $cards.append("<div class='pokemonCard'></div>");
            var $card = $("div.pokemonCard:last-child");
            // TAGS
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
        if ( $(document).height() - $win.height() == $win.scrollTop()) {
            $.ajax({
                method: "GET",
                url: "https://api.pokemontcg.io/v1/cards?page="+ page +"&pageSize=12",

                success: function(result) {     
                    for(let i = 0; i < result.length; i++){
                        $cards.append("<div class='pokemonCard'></div>");
                        var $card = $("div.pokemonCard:last-child");
                        // TAGS
                        $card.append("<h3>"+ result.cards[i].name +"</h3>");
                        $card.append("<img src="+ result.cards[i].imageUrl +">");
                    }
                    page++;
                }
            });
        }
    });
});