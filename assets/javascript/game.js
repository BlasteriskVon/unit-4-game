$(document).ready(function() {
            var pokemonParty = [];
            var pokemonSelected = 0;
            var chosenPokemon;
            var chosenPokemonReference;
            var opponentPokemon;
            var thereIsPichu = 0;
            var width20IfPichu = "25%";
            function Pokemon(name, hp, attackName, attackPower){
                this.name = name;
                this.hp = hp;
                this.attackName = attackName;
                this.attackPower = attackPower;
                this.picture = $("<img>");
                this.picture.attr("id", name.toLowerCase() + "Pic");
                this.picture.attr("src", "assets/images/" + name.toLowerCase() + ".png");
                
                this.activeMode = function() {
                    this.picture.attr("src", "assets/images/" + name.toLowerCase() + ".gif");
                }
                this.deActiveMode = function() {
                    this.picture.attr("src", "assets/images/" + name.toLowerCase() + ".png");
                }
                
                pokemonParty.push(this);
            }
            
            var pikachu = new Pokemon("Pikachu", 60, "Thunderbolt", 4);
            var charizard = new Pokemon("Charizard", 100, "Flamethrower", 10);
            var jigglypuff = new Pokemon("Jigglypuff", 55, "Pound", 6);
            var mewtwo = new Pokemon("Mewtwo", 150, "Psychic", 40);
            var pichu = new Pokemon("Pichu", 50, "Thunder", Number.MAX_VALUE);
            pokemonParty.pop();

            function activateAllPokemon(){
                for(var index = 0;index < pokemonParty.length;index++){
                    pokemonParty[index].activeMode();
                }
            }

            function deActivateAllPokemon(){
                for(var index = 0;index < pokemonParty.length;index++){
                    pokemonParty[index].deActiveMode();
                }
            }

            function call(pokemon){
                var calling = document.createElement("audio");
                calling.setAttribute("src", "assets/sounds/" + pokemon.name.toLowerCase() + "Cry.wav");
                calling.play();
            }

            function choose(pokemon){
                var choice = document.createElement("audio");
                choice.setAttribute("src", "assets/sounds/" + pokemon.name.toLowerCase() + "Select.wav");
                choice.play();
            }

            function pokemonCard(x, appendClass){
                $("." + appendClass).empty();
                var card = $("<div>");
                card.addClass("card card-" + appendClass + "-" + x.name.toLowerCase());
                card.css({"width":"100%","height":"auto","background-color":"red"}); //creates the card
                $("." + appendClass).append(card);
                var cardPic = $("<img>");
                cardPic.attr("src", x.picture.attr("src"));
                cardPic.addClass("card-img-top img" + appendClass); //sets up the pokemon image at the top of the card
                $(".card-" + appendClass + "-" + x.name.toLowerCase()).append(cardPic);
                var cardBody = $("<div>");
                cardBody.addClass("card-body body-" + appendClass + "-" + x.name.toLowerCase());
                $(".card-" + appendClass + "-" + x.name.toLowerCase()).append(cardBody); //sets up the card body that will display the name and hp
                var cardName = $("<h3>");
                cardName.addClass("card-title");
                cardName.text(x.name);
                $(".body-" + appendClass + "-" + x.name.toLowerCase()).append(cardName); //adds name
                var cardHP = $("<h3>");
                cardHP.addClass("card-title");
                cardHP.text("Hit Points: " + x.hp);
                $(".body-" + appendClass + "-" + x.name.toLowerCase()).append(cardHP); //adds health
                $(".card-" + appendClass + "-" + x.name.toLowerCase()).on("click", function() {
                    call(x)
                    setTimeout(function() {alert("Name: " + x.name + "\nAtttack: " + x.attackName + "\nAttack Power: " + x.attackPower);},50)
                })
            }

            function findPokemonById(x){
                for(var index = 0;index < pokemonParty.length;index++){
                    if(x === pokemonParty[index].name.toLowerCase()){
                        return pokemonParty[index];
                    } else {
                        continue;
                    }
                }
            }

            function battleSetUp() {
                if(thereIsPichu === 1){
                    width20IfPichu = "20%";
                    pokemonParty.push(pichu);
                    thereIsPichu++;
                    alert("Pikachu's defeat inspires a hero to step forth! New Pok\xE9mon Pichu enters the fray!");
                }
                $(".container").empty();
                $(".middle-Corner").off("click");
                pokemonSelected = 0;
                var newRow1 = $("<div>");
                newRow1.attr("class", "row row1");
                $(".container").append(newRow1);

                var selectOptions = $("<div>");
                selectOptions.attr("class", "jumbotron col-md-12 select-Options");
                selectOptions.css("padding", "0")
                $(".row1").append(selectOptions);

                for(var index = 0;index < pokemonParty.length;index++){
                    var pokemonOption = $("<img>");
                    pokemonOption.attr("src", pokemonParty[index].picture.attr("src"));
                    pokemonOption.css({"width":width20IfPichu,"height":"auto"});
                    pokemonOption.attr("id", pokemonParty[index].name.toLowerCase());
                    pokemonOption.attr("class", "pokemon-Option");
                    selectOptions.append(pokemonOption);
                }

                var newRow2 = $("<div>");
                newRow2.attr("class", "row row2");
                $(".container").append(newRow2);

                var firstCorner = $("<div>");
                firstCorner.addClass("col-md-4 first-Corner");
                $(".row2").append(firstCorner);
                
                var middleCorner = $("<div>");
                middleCorner.addClass("col-md-4 middle-Corner jumbotron");
                middleCorner.text("Please select a Pokemon from one of the following options!");
                $(".row2").append(middleCorner);

                var secondCorner = $("<div>");
                secondCorner.addClass("col-md-4 second-Corner");
                $(".row2").append(secondCorner);

                selectCharacter();
            }

            

            function selectCharacter(){
                $(".pokemon-Option").on("click", function(e) {
                    if(pokemonSelected === 0){
                        pokemonSelected++;
                        var selectedPokemon = findPokemonById(e.target.id);
                        chosenPokemon = new Pokemon(selectedPokemon.name, selectedPokemon.hp, selectedPokemon.attackName, selectedPokemon.attackPower);
                        chosenPokemonReference = new Pokemon(selectedPokemon.name, selectedPokemon.hp, selectedPokemon.attackName, selectedPokemon.attackPower);
                        pokemonParty.pop();
                        pokemonParty.pop();
                        chosenPokemon.activeMode();
                        choose(chosenPokemon);
                        pokemonCard(chosenPokemon, "first-Corner");
                        selectOpponent();
                    }
                })
            }

            function selectOpponent(){
                $(".middle-Corner").off("click");
                $(".middle-Corner").text("Select your opponent!");
                $(".second-Corner").empty();
                $(".pokemon-Option").on("click", function(e) {
                    if(pokemonSelected === 1){
                        pokemonSelected++;
                        var selectedPokemon = findPokemonById(e.target.id);
                        opponentPokemon = new Pokemon(selectedPokemon.name, selectedPokemon.hp, selectedPokemon.attackName, selectedPokemon.attackPower);
                        pokemonParty.pop();
                        opponentPokemon.activeMode();
                        choose(opponentPokemon);
                        pokemonCard(opponentPokemon, "second-Corner");
                        battle();
                    }
                })
            }

            function battle(){
                var battleDelay;
                var reBattle;
                $(".middle-Corner").text("Click your (or your opponent's) Pok\xE9mon icon to get attack information! Click the \"Attack!\" button to attack!");
                var breakLine = $("<br>");
                $(".middle-Corner").append(breakLine);
                var attackButton = $("<button>");
                attackButton.text("Attack!");
                attackButton.css({"width":"50%", "height":"auto"});
                attackButton.attr("id", "attack-Button");
                $(".middle-Corner").append(attackButton);
                $("#attack-Button").on("click", function() {
                    $(".middle-Corner").empty();
                    if(opponentPokemon.name === "Pichu" && chosenPokemon.name != "Pichu"){
                        attackPhase(opponentPokemon, chosenPokemon);
                        pokemonCard(chosenPokemon, "first-Corner");
                        if(chosenPokemon.hp > 0){
                            battleDelay = setTimeout(function() {
                                attackPhase(chosenPokemon, opponentPokemon);
                                pokemonCard(opponentPokemon, "second-Corner");
                                if(opponentPokemon.hp > 0){
                                    reBattle = setTimeout(battle, 3000);
                                } else {
                                    reBattle = setTimeout(chosenWin, 3000);
                                }
                            }, 3000)
                        } else {
                            reBattle = setTimeout(opponentWin, 3000);
                        }
                    } else {
                        attackPhase(chosenPokemon, opponentPokemon);
                        pokemonCard(opponentPokemon, "second-Corner");
                        if(opponentPokemon.hp > 0){
                            battleDelay = setTimeout(function() {
                                attackPhase(opponentPokemon, chosenPokemon);
                                pokemonCard(chosenPokemon, "first-Corner");
                                if(chosenPokemon.hp > 0){
                                    reBattle = setTimeout(battle, 3000);
                                } else {
                                    reBattle = setTimeout(opponentWin, 3000);
                                }
                            }, 3000)
                        } else {
                            reBattle = setTimeout(chosenWin, 3000);
                        }
                    }
                })
            }

            function opponentWin(){
                var gameOver;
                var restart;
                $(".middle-Corner").empty();
                $(".middle-Corner").text(chosenPokemon.name + " has fainted!");
                gameOver = setTimeout(function() {
                    $(".middle-Corner").text("Game Over!");
                }, 3000);
                restart = setTimeout(function() {
                    $(".middle-Corner").text("Click this text to try again!");
                    $(".middle-Corner").on("click", function(){
                        if(chosenPokemon.name === "Pikachu"){
                            thereIsPichu++;
                        }
                        resetChosen();
                        battleSetUp();
                    });
                }, 6000)
            }

            function chosenWin(){
                var youWin;
                var restart;
                $(".middle-Corner").empty();
                $(".middle-Corner").text(opponentPokemon.name + " has fainted!");
                youWin = setTimeout(function() {
                    $(".middle-Corner").text("You win! " + chosenPokemon.attackName + " has powered up by 10 points!");
                    chosenPokemon.attackPower += 10;
                }, 3000);
                restart = setTimeout(function() {
                    $(".middle-Corner").text("Click this text to battle another Pok\xE9mon!");
                    $(".middle-Corner").on("click", function(){
                        resetChosen();
                        pokemonCard(chosenPokemon,"first-Corner");
                        pokemonSelected = 1;
                        selectOpponent();
                    });
                }, 6000)
            }

            function resetChosen(){
                chosenPokemon.hp = chosenPokemonReference.hp;
            }

            function attackPhase(x, y){
                if(x.name === "Pichu"){
                    var pichuThunder = document.createElement("audio");
                    pichuThunder.setAttribute("src", "assets/sounds/pichuThunder.wav");
                    pichuThunder.play();

                }
                $(".middle-Corner").text(x.name + " used " + x.attackName + "! " + y.name + " has taken " + x.attackPower + " damage!");
                y.hp -= x.attackPower;
            }


            $("#clickToContinue").on("click", function() {
                $("body").css({"background-image":"url('assets/images/battle.gif'", "background-size":"200px 100px"});
                battleSetUp();
            })
        });