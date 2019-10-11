
var gameContainer = $(".container");
var gameMessageElement = $("#message");
var characterListElement = $("#character-list");
var selectedCharacterElement = $("#selected-character");
var availableEnemiesElement = $("#available-enemies");
var fightSectionElement = $("#fight-section");
var currentEnemyElement = $("#current-enemy");
var fightMessageElement = $("#fight-message");

var game = {
    characters: [],
    userCharacter: Character,
    userHasSelectedCharacter: false,
    selectedEnemy: Character,
    fighting: false,
    availableEnemies: [],
    defeated: false,

    initialize: function() {
        this.characters = [];
        this.characters.push(
            new Character(155, 20, 20, "assets/images/obi-wan.png", "Obi Wan"),
            new Character(160, 17, 10, "assets/images/luke-skywalker.png", "Luke"),
            new Character(165, 15, 50, "assets/images/kylo-ren.jpg", "Kylo Ren"),
            new Character(175, 20, 35, "assets/images/rey.jpg", "Rey")
        );
        this.userCharacter = Character;
        this.userHasSelectedCharacter = false;
        this.selectedEnemy = Character;
        this.fighting = false;
        this.availableEnemies = [];
        this.defeated = false;

        currentEnemyElement.fadeOut();
        selectedCharacterElement.empty();
        availableEnemiesElement.empty();

        this.updateDisplay({ message: "Choose a character to play as!" });
        this.updateFightMessage("");
        $("#character-list .character").on("click", function () {
            game.selectCharacter($(this).data("index"));
        });
    },

    selectCharacter: function(index) {
        if (!this.userHasSelectedCharacter) {
            this.userCharacter = this.characters[index];
            //move enemy characters into appropriate array
            for (let i = 0; i < this.characters.length; i++) {
                if (!(this.userCharacter === this.characters[i])) {
                    this.availableEnemies.push(this.characters[i]);
                }
            }
        }

        //reset characters array, now that enemies have been moved over
        this.characters = [];
        this.userHasSelectedCharacter = true;
        
       this.updateDisplay({ message: "Choose an enemy!" });
    },

    selectEnemy: function(index) {
        if (this.defeated) {
            return; //enforcing "game over" scenario
        }
        if (!this.fighting) {
            this.selectedEnemy = this.availableEnemies[index];
            this.fighting = true;
            this.availableEnemies.splice(index, 1);
            currentEnemyElement.fadeIn();
        }

        this.updateDisplay({ message: "Click Fight to Attack!" });
    },

    attack: function() {
        if (!this.fighting) {
            return; //can't attack if you're not fighting :)
        }
        var userAttackPower = this.userCharacter.attackPower;
        var enemyAttackPower = this.selectedEnemy.counterAttackPower;
        this.selectedEnemy.reduceHp(userAttackPower);
        this.userCharacter.increaseAttackPower();
        this.checkGameStatus();
        if (this.fighting) {
            this.userCharacter.reduceHp(enemyAttackPower);
            this.checkGameStatus();
            this.updateDisplay({ fightMessage: `You hit for ${userAttackPower} damage! ${this.selectedEnemy.name} hit you for ${enemyAttackPower}!` });
        } else {
            this.updateFightSection();
            this.updateFightMessage(`You hit for ${userAttackPower} damage! ${this.selectedEnemy.name} falls!`)
        }
        
    },

    checkGameStatus: function() {
        let message = "";
        if (this.userCharacter.healthPoints == 0) {
            message = "You have taken fatal damage!";
            this.defeated = true;
        } else if (this.selectedEnemy.healthPoints == 0) {
            if (this.availableEnemies.length === 0) {
                message = "Congratulations! All enemies have been defeated!";
            } else {
                message = "You win! Select another enemy to continue fighting!";
            }
            currentEnemyElement.fadeOut();
        }
        this.updateDisplay({ message: message });
        if (message !== "") { //I'm sure there's better ways to do this....
            this.fighting = false;
        }
    },

    updateDisplay: function(options) {
        options = Object.assign(
            {
                message: gameMessageElement.html(), //make sure messages don't change if a new one isn't specified
                fightMessage: fightMessageElement.html()
            },
            options
        )
        this.updateCharacterList();
        this.updateUserCharacter();
        this.updateEnemyCharacters();
        this.updateCurrentEnemy();
        this.updateFightSection();
        this.updateGameMessage(options.message);
        this.updateFightMessage(options.fightMessage);
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
        if (this.fighting && !this.defeated) {
            let fightButton = $("<button>");
            fightButton.html("Fight!");
            fightSectionElement.append(fightButton);

            fightButton.on("click", function () {
                game.attack();
            });
        } else if (this.defeated || (this.availableEnemies.length === 0 && this.userHasSelectedCharacter)) { //conditions for the game being won
            fightSectionElement.empty();
            let resetButton = $("<button>");
            resetButton.html("Reset");
            fightSectionElement.append(resetButton);

            resetButton.on("click", function () {
                game.initialize();
            });
        }
    },

    updateGameMessage: function(message) {
        gameMessageElement.empty()
            .html(`<p>${message}</p>`);
    },

    updateFightMessage: function(message) {
        fightMessageElement.empty()
            .html(`<p>${message}</p>`);
    }
}

$(document).ready(function() {
    game.initialize();
});
