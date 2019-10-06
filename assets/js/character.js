//character constructor lives here
//-- healthPoints, baseAttackPower, attackPower, counterAttackPower, imageUrl, name
class Character {
    constructor(healthPoints, baseAttackPower, counterAttackPower, imageUrl, name) {
        this.healthPoints = healthPoints;
        this.baseAttackPower = baseAttackPower;
        this.attackPower = baseAttackPower;
        this.counterAttackPower = counterAttackPower;
        this.imageUrl = imageUrl;
        this.name = name;
    }

    reduceHp(damage) {
        this.healthPoints -= damage;
        if (this.healthPoints < 0) {
            this.healthPoints = 0;
        }
    }

    increaseAttackPower() {
        this.attackPower += this.baseAttackPower;
    }

    generateImgTag() { //Not sure if I'll need this w/ jQuery? Delete later if unused.
        return `<img src='${this.imageUrl}' alt='${this.name}' width='200'>`;
    }

    generateCharacterElement() {
        var characterContainer = $("<div>");
        characterContainer.addClass("character");
        var characterName = $("<div>");
        characterName.addClass("character-name")
            .html(this.name);
        var characterImage = $("<div>");
        characterImage.addClass("character-image")
            .html(this.generateImgTag());
        var characterHP = $("<div>");
        characterHP.addClass("character-hp")
            .html(this.healthPoints);

        characterContainer.append([characterName, characterImage, characterHP]);
        return characterContainer;
    }
};