//Define Character object
//-- healthPoints, baseAttackPower, attackPower, counterAttackPower, image, name

//Organize game in object

//Array storing 4 Character objects
//Selected Character
//Selected enemy
//[Array] Enemy Characters
//Game message

//initialize
//-- create character objects, store them in allCharacters array
//-- update display()

//Select Character method
//-- Clicking a character selects that character for the player to use
//-- All other characters moved into enemies array

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
//-- updateDisplay

//updateDisplay(options)
//-- update allCharacters
//-- update userCharacter - should update HP also
//-- update enemyCharacters
//-- update currentEnemy - should update HP also
//-- update gameMessage = options.message || ""


//jQuery events

//initialize page on load
//select character on click
//select enemy on click
//attack on click