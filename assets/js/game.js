//Define Character object
//-- healthPoints, baseAttackPower, attackPower, counterAttackPower, image, name

//Organize game in object
var game = {
    //Array storing 4 Character objects
    characters: [],
    //Selected Character
    userCharacter: Character,
    //Selected enemy
    selectedEnemy: Character,
    //[Array] Enemy Characters
    allEnemies: [],
    //Game message
    message: "",

    initialize: function() {
        //-- create character objects, store them in allCharacters array
        //-- update display() [leave this up to jQuery?]
        this.characters.push(
            new Character(150, 10, 15, "placeholderImage", "Obi Wan"),
            new Character(160, 5, 10, "placeholderImage", "Luke"),
            new Character(175, 15, 20, "placeholderImage", "Kylo Ren"),
            new Character(190, 20, 25, "placeholderImage", "Rey")
        )

        console.log(this.characters);
    },

    //Select Character method
    //-- Clicking a character selects that character for the player to use
    //-- All other characters moved into enemies array
    selectCharacter: function(index) {
        this.userCharacter = this.characters[index];
        for (let i = 0; i < this.characters.length; i++) {
            if (!(this.userCharacter === this.characters[i])) {
                this.allEnemies.push(this.characters[i]);
            }
        }
    },

    //Select Enemy method
    //-- Clicking a character selects that character for the player to fight

    //Attack method
    //-- Player moves first
    //-- subtract user character's attackPower from enemy character's healthPoints
    //-- increase user character's attackPower by baseAttackPower
    //-- check game status()
    //-- subtract enemy character's attackPower from user character's healthPoints
    //-- check game status()

    //calculateMove(attacker, defender)
    //-- subtract attacker.attackPower from defender.healthPoints

    //checkGameStatus
    //-- if user is still alive, allow enemy selection
    //-- if user is not alive, game over
    //-- updateDisplay [leave this up to jQuery?]

    //updateDisplay(options)
    //-- update allCharacters
    //-- update userCharacter - should update HP also
    //-- update enemyCharacters
    //-- update currentEnemy - should update HP also
    //-- update gameMessage = options.message || ""
}

//jQuery events

//initialize page on load
$(document).ready(function() {
    game.initialize();
    $.each(game.characters, function( index, character ) {
        var characterElement = $("<li>").html(`Name: ${character.name} HP: ${character.healthPoints}`);
        characterElement.attr("data-index", index);
        characterElement.addClass("character");
        $("#character-list").append(characterElement);
    })
});
//select character on click
//select enemy on click
//attack on click