$(document).ready( function() {
    var $cards = $("section#pokemonCards");
    var $info = $("section#pokemonInfo");
    var $win = $(window);
    var page = 1;
    var scroll = true;

    $.ajax({
        method: "GET",
        url: "https://api.pokemontcg.io/v1/cards?page="+ page +"&pageSize=12"
    })
    
    .done(function(result){          
        for(let i = 0; i < result.cards.length; i++){
            $cards.append("<div class='pokemonCard col-sm-4'></div>");
            var $card = $("div.pokemonCard:last-child");
            $card.append("<h3>"+ result.cards[i].name +"</h3>");
            $card.append("<img src="+ result.cards[i].imageUrl +">");
            $card.click(function(){
                $info.empty();
                $info.append("<div class='cardInfo col-sm-2'></div>");
                var $cardInfo = $("div.cardInfo:last-child");
                $cardInfo.append("<h3>"+ result.cards[i].name +"</h3>");
                $cardInfo.append("<p>Type: "+ result.cards[i].types[0] +"</p>");
                $cardInfo.append("<p>HP: "+ result.cards[i].hp +"</p>");
                $cardInfo.append("<p>Number: "+ result.cards[i].number +"</p>");
                $cardInfo.append("<p>Rarity: "+ result.cards[i].rarity +"</p>");
            });
        }
        page++;
    })

    .fail(function(){
        console.error("API NOT WORKING");
        alert("API NOT WORKING");
    });

    $win.scroll( function() {
        if ($(document).height() - $win.height() <= $win.scrollTop()) {
            if(scroll == true){
                scroll = false;
                $.ajax({
                    method: "GET",
                    url: "https://api.pokemontcg.io/v1/cards?page="+ page +"&pageSize=12",

                    success: function(result) {     
                        for(let i = 0; i < result.cards.length; i++){
                            $cards.append("<div class='pokemonCard col-sm-4'></div>");
                            var $card = $("div.pokemonCard:last-child");
                            $card.append("<h3>"+ result.cards[i].name +"</h3>");
                            $card.append("<img src="+ result.cards[i].imageUrl +">");
                            $card.click(function(){
                                $info.empty();
                                $info.append("<div class='cardInfo col-sm-2'></div>");
                                var $cardInfo = $("div.cardInfo:last-child");
                                $cardInfo.append("<h3>"+ result.cards[i].name +"</h3>");
                                $cardInfo.append("<p>Type: "+ result.cards[i].types[0] +"</p>");
                                $cardInfo.append("<p>HP: "+ result.cards[i].hp +"</p>");
                                $cardInfo.append("<p>Number: "+ result.cards[i].number +"</p>");
                                $cardInfo.append("<p>Rarity: "+ result.cards[i].rarity +"</p>");
                            });
                        }
                        page++;
                        scroll = true;
                    }
                });
            }
        }
    });
});