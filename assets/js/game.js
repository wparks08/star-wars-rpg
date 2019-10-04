//Define Character object
//-- healthPoints, baseAttackPower, attackPower, counterAttackPower, image, name
var gameContainer = $("<div>");
gameContainer.addClass("container");
var gameMessageElement = $("<div id='message'>");
var characterListElement = $("<ul id='character-list'>");
var selectedCharacterElement = $("<div id='selected-character'>");
var availableEnemiesElement = $("<div id='available-enemies'>");
var fightSectionElement = $("<div id='fight-section'>");
var currentEnemyElement = $("<div id='current-enemy'>");

//Organize game in object
var game = {
    //Array storing 4 Character objects
    characters: [],
    //Selected Character
    userCharacter: Character,
    userHasSelectedCharacter: false,
    //Selected enemy
    selectedEnemy: Character,
    fighting: false,
    //[Array] Enemy Characters
    availableEnemies: [],
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

        this.updateDisplay({ message: "Choose a character to play as!" });
    },

    //Select Character method
    //-- Clicking a character selects that character for the player to use
    //-- All other characters moved into enemies array
    selectCharacter: function(index) {
        if (!this.userHasSelectedCharacter) {
            this.userCharacter = this.characters[index];
            for (let i = 0; i < this.characters.length; i++) {
                if (!(this.userCharacter === this.characters[i])) {
                    this.availableEnemies.push(this.characters[i]);
                }
            }
        }

        this.characters = [];
        this.userHasSelectedCharacter = true;
        
       this.updateDisplay({ message: "Choose an enemy!" });
    },

    //Select Enemy method
    //-- Clicking a character selects that character for the player to fight
    selectEnemy: function(index) {
        if (!this.fighting) {
            this.selectedEnemy = this.availableEnemies[index];
            this.fighting = true;
            this.availableEnemies.splice(index, 1);
        }

        this.updateDisplay({ message: "Click Fight to Attack!" });
    },

    //Attack method
    //-- Player moves first
    //-- subtract user character's attackPower from enemy character's healthPoints
    //-- increase user character's attackPower by baseAttackPower
    //-- check game status()
    //-- subtract enemy character's attackPower from user character's healthPoints
    //-- check game status()
    attack: function() {
        console.log("attacked!");
    },

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
    updateDisplay: function(options) {
        options = Object.assign(
            {
                message: ""
            },
            options
        )
        this.updateCharacterList();
        this.updateUserCharacter();
        this.updateEnemyCharacters();
        this.updateCurrentEnemy();
        this.updateFightSection();
        this.updateGameMessage(options.message);
    },

    updateCharacterList: function() {
        characterListElement.empty();
        $.each(this.characters, function (index, character) {
            var characterElement = character.generateCharacterElement();
            characterElement.attr("data-index", index);
            characterListElement.append(characterElement);
        });
    },

    updateUserCharacter: function() {
        if (this.userHasSelectedCharacter) {
            let selectedCharacter = this.userCharacter;
            selectedCharacterElement.empty()
                .html(selectedCharacter.generateCharacterElement());
        }
    },

    updateEnemyCharacters: function() {
        availableEnemiesElement.empty();
        $.each(this.availableEnemies, function(index, character) {
            var characterElement = character.generateCharacterElement();
            characterElement.attr("data-index", index);
            availableEnemiesElement.append(characterElement);
        })

        $("#available-enemies .character").on("click", function () {
            game.selectEnemy($(this).data("index"));
        });
    },

    updateCurrentEnemy: function() {
        if (this.fighting) {
            let currentEnemy = this.selectedEnemy;
            currentEnemyElement.empty()
                .html(currentEnemy.generateCharacterElement());
        }
    },

    updateFightSection: function() {
        let attackMethod = this.attack;
        fightSectionElement.empty();
        if (this.fighting) {
            let fightButton = $("<button>");
            fightButton.html("Fight!");
            fightSectionElement.append(fightButton);

            fightButton.on("click", function () {
                attackMethod();
            });
        }
    },

    updateGameMessage: function(message) {
        gameMessageElement.empty()
            .html(`<p>${message}</p>`);
    }
}

//jQuery events

//initialize page on load
$(document).ready(function() {
    $("body").prepend(gameContainer);
    gameContainer.append([gameMessageElement, characterListElement, selectedCharacterElement, availableEnemiesElement, fightSectionElement, currentEnemyElement]);

    game.initialize();

    $("#character-list .character").on("click", function() {
        game.selectCharacter($(this).data("index"));
    });

    
});
//select enemy on click
//attack on click