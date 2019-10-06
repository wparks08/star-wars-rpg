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

var game = {
    characters: [],
    userCharacter: Character,
    userHasSelectedCharacter: false,
    selectedEnemy: Character,
    fighting: false,
    availableEnemies: [],
    // message: "",

    initialize: function() {
        this.characters.push(
            new Character(150, 10, 15, "assets/images/obi-wan.png", "Obi Wan"),
            new Character(160, 5, 10, "assets/images/luke-skywalker.png", "Luke"),
            new Character(175, 15, 20, "assets/images/kylo-ren.jpg", "Kylo Ren"),
            new Character(190, 20, 25, "assets/images/rey.jpg", "Rey")
        )

        currentEnemyElement.fadeOut();

        this.updateDisplay({ message: "Choose a character to play as!" });
    },

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

    selectEnemy: function(index) {
        if (!this.fighting) {
            this.selectedEnemy = this.availableEnemies[index];
            this.fighting = true;
            this.availableEnemies.splice(index, 1);
            currentEnemyElement.fadeIn();
        }

        this.updateDisplay({ message: "Click Fight to Attack!" });
    },

    attack: function() {
        var userAttackPower = this.userCharacter.attackPower;
        var enemyAttackPower = this.selectedEnemy.counterAttackPower;
        console.log("attacked!");
        this.selectedEnemy.reduceHp(userAttackPower);
        this.userCharacter.increaseAttackPower();
        this.checkGameStatus();
        this.userCharacter.reduceHp(enemyAttackPower);
        this.checkGameStatus();
        if (this.fighting) {
            this.updateDisplay({ message: `You hit for ${userAttackPower} damage! ${this.selectedEnemy.name} hit you for ${enemyAttackPower}!` });
        }
    },

    checkGameStatus: function() {
        let message = "";
        console.log("checkGameStatus() called");
        if (this.userCharacter.healthPoints == 0) {
            message = "You have taken fatal damage!";
        } else if (this.selectedEnemy.healthPoints == 0) {
            message = "You win! Select another enemy to continue fighting!";
            currentEnemyElement.fadeOut();
        }
        this.updateDisplay({ message: message });
        if (message !== "") {
            this.fighting = false;
        }
    },

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
        let game = this;
        fightSectionElement.empty();
        if (this.fighting) {
            let fightButton = $("<button>");
            fightButton.html("Fight!");
            fightSectionElement.append(fightButton);

            fightButton.on("click", function () {
                game.attack();
            });
        }
    },

    updateGameMessage: function(message) {
        gameMessageElement.empty()
            .html(`<p>${message}</p>`);
    }
}

$(document).ready(function() {
    $("body").prepend(gameContainer);
    gameContainer.append([gameMessageElement, characterListElement, selectedCharacterElement, availableEnemiesElement, fightSectionElement, currentEnemyElement]);

    game.initialize();

    $("#character-list .character").on("click", function() {
        game.selectCharacter($(this).data("index"));
    });

    
});
