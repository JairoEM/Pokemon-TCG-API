$(document).ready(function(){
    var $cards = $("section#pokemonCards");
    var $info = $("section#pokemonInfo");
    var $win = $(window);
    var page = 1;
    var scroll = true;
    var main = true;
    var audio = document.getElementById("audio");


    // DIALOG
    $($info).dialog({
        autoOpen: false,
        modal: true,
        show: { effect: "blind", duration: 800 },
        hide: { effect: "fade", duration: 800 },
        title: "Dialog Title",
    });

    // INITIAL LAYOUT
    $.ajax({
        method: "GET",
        url: "https://api.pokemontcg.io/v1/cards?page="+ page +"&pageSize=12"
    })
    
    .done(function(result){          
        for(let i = 0; i < result.cards.length; i++){
            $cards.append("<div class='pokemonCard col-md-4'></div>");
            var $card = $("div.pokemonCard:last-child");
            $card.append("<h2>"+ result.cards[i].name +"</h2>");
            $card.append("<img src="+ result.cards[i].imageUrl +">");
            $card.click(function(){
                var pokemonID = result.cards[i].id;
                $.ajax({
                    method: "GET",
                    url: "https://api.pokemontcg.io/v1/cards?id="+ pokemonID
                })

                .done(function(response){
                    $info.empty();
                    $info.append("<div class='cardInfo'></div>");
                    var $cardInfo = $("div.cardInfo:last-child");
                    $cardInfo.append("<p>Supertype: "+ response.cards[0].supertype +"</p>");
                    $cardInfo.append("<p>Type: "+ response.cards[0].types[0] +"</p>");
                    $cardInfo.append("<p>HP: "+ response.cards[0].hp +"</p>");
                    $cardInfo.append("<p>Number: "+ response.cards[0].number +"</p>");
                    $cardInfo.append("<p>Rarity: "+ response.cards[0].rarity +"</p>");
                    $info.dialog( "option", "title", response.cards[0].name );
                    $info.dialog("option", "width", 347);
                    $info.dialog("option", "height", 480);
                    $info.dialog("option", "resizable", false);
                    $info.dialog("open");
                    audio.play();
                })

                .fail(function(){
                    console.error("PETITION NOT WORKING");
                    alert("PETITION NOT WORKING");
                });
            });
        }
        page++;
    })

    .fail(function(){
        console.error("API NOT WORKING");
        alert("API NOT WORKING");
    });

    // INFINITE SCROLL AND LAYOUT
    $win.scroll(function(){
        if(main == true){
            if ($(document).height() - $win.height() <= $win.scrollTop()){
                if(scroll == true){
                    scroll = false;
                    $.ajax({
                        method: "GET",
                        url: "https://api.pokemontcg.io/v1/cards?page="+ page +"&pageSize=12",

                        success: function(result){     
                            for(let i = 0; i < result.cards.length; i++){
                                $cards.append("<div class='pokemonCard col-md-4'></div>");
                                var $card = $("div.pokemonCard:last-child");
                                $card.append("<h2>"+ result.cards[i].name +"</h2>");
                                $card.append("<img src="+ result.cards[i].imageUrl +">");
                                $card.click(function(){
                                    var pokemonID = result.cards[i].id;
                                    $.ajax({
                                        method: "GET",
                                        url: "https://api.pokemontcg.io/v1/cards?id="+ pokemonID
                                    })

                                    .done(function(response){
                                        $info.empty();
                                        $info.append("<div class='cardInfo'></div>");
                                        var $cardInfo = $("div.cardInfo:last-child");
                                        $cardInfo.append("<p>Supertype: "+ response.cards[0].supertype +"</p>");
                                        $cardInfo.append("<p>Type: "+ response.cards[0].types[0] +"</p>");
                                        $cardInfo.append("<p>HP: "+ response.cards[0].hp +"</p>");
                                        $cardInfo.append("<p>Number: "+ response.cards[0].number +"</p>");
                                        $cardInfo.append("<p>Rarity: "+ response.cards[0].rarity +"</p>");
                                        $info.dialog( "option", "title", response.cards[0].name );
                                        $info.dialog("option", "width", 347);
                                        $info.dialog("option", "height", 480);
                                        $info.dialog("option", "resizable", false);
                                        $info.dialog("open");
                                        audio.play();
                                    })

                                    .fail(function(){
                                        console.error("PETITION NOT WORKING");
                                        alert("PETITION NOT WORKING");
                                    });
                                });
                            }
                            page++;
                            scroll = true;
                        },

                        error: function(){
                            console.error("PETITION NOT WORKING");
                            alert("PETITION NOT WORKING");
                        }
                    });
                }
            }
        }
    });
    
    // SEARCH FUNCTIONALITY
    $("#search").click(function(){
        main = false;
        console.log(main);
        var pokemonName = $("#searchStr").val();
        $cards.empty();
        $.ajax({
            method: "GET",
            url: "https://api.pokemontcg.io/v1/cards?name="+ pokemonName
        })

        .done(function(result){
            console.log(result);
            for(let i = 0; i < result.cards.length; i++){
                $cards.append("<div class='pokemonCard col-md-4'></div>");
                var $card = $("div.pokemonCard:last-child");
                $card.append("<h2>"+ result.cards[i].name +"</h2>");
                $card.append("<img src="+ result.cards[i].imageUrl +">");
                $card.click(function(){
                    var pokemonID = result.cards[i].id;
                    $.ajax({
                        method: "GET",
                        url: "https://api.pokemontcg.io/v1/cards?id="+ pokemonID
                    })

                    .done(function(response){
                        $info.empty();
                        $info.append("<div class='cardInfo'></div>");
                        var $cardInfo = $("div.cardInfo:last-child");
                        $cardInfo.append("<p>Supertype: "+ response.cards[0].supertype +"</p>");
                        $cardInfo.append("<p>Type: "+ response.cards[0].types[0] +"</p>");
                        $cardInfo.append("<p>HP: "+ response.cards[0].hp +"</p>");
                        $cardInfo.append("<p>Number: "+ response.cards[0].number +"</p>");
                        $cardInfo.append("<p>Rarity: "+ response.cards[0].rarity +"</p>");
                        $info.dialog( "option", "title", response.cards[0].name );
                        $info.dialog("option", "width", 347);
                        $info.dialog("option", "height", 480);
                        $info.dialog("option", "resizable", false);
                        $info.dialog("open");
                        audio.play();
                    })

                    .fail(function(){
                        console.error("PETITION NOT WORKING");
                        alert("PETITION NOT WORKING");
                    });
                });
            }
        })

        .fail(function(){
            console.error("PETITION NOT WORKING");
            alert("PETITION NOT WORKING");
        });
    });
});