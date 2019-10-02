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
    }

    increaseAttackPower() {
        this.attackPower += this.baseAttackPower;
    }

    generateImgTag() { //Not sure if I'll need this w/ jQuery? Delete later if unused.
        return "<img src='" + this.imageUrl + "' alt='" + this.name + "'>";
    }
};