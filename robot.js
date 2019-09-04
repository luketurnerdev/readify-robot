class Robot {

    constructor(position = "", direction = []) {
    //Do not construct with a positional value, because we haven't called PLACE yet.
        this.robotPosition = position;
        this.robotDirection = direction;

        this.obstructedCells = [];

        //Check if the robot has been placed before executing other functions
        this.hasBeenPlaced = false;
    }

    //Place the robot at the given co-ordinates, and facing either N,S,E or W.

    place(position, direction) {
        let cellObstructed = false;
        let allowedDirections = ["NORTH", "NORTHEAST", "NORTHWEST", "SOUTH", "SOUTHEAST", "SOUTHWEST", "EAST", "WEST"]; 

        //Check if position is on the table
        if ((position[0] >=0 && position[0] <=5 && position[1] >= 0 && position[1] <=5)
            &&
            (allowedDirections.includes(direction))) {

                //Check if the requested cell is obstructed
                this.obstructedCells.forEach(element => {
                    if (element[0] === position[0] && element[1] === position[1]){
                        cellObstructed = true;

                        return console.log("Cannot place, there is an obstruction there!")
                    } 
                    
                });

                //Set position + direction
                if (!cellObstructed) {
                    this.robotPosition = position
                    if (!this.hasBeenPlaced) {
                        this.robotDirection = direction;
                        this.hasBeenPlaced = true;
                    }
                    
                    //Successfully place at the given spot due to no obstructions
                    console.log(`Placed robot at ${this.robotPosition}, facing ${this.robotDirection}!`);
                    
                }
        } else {
            console.log('Please provide a valid position and direction for placement.');
            //hasBeenPlaced remains false
        }

    }

    //Move the robot one step forward in the direction it is facing

    move() {
        let moved = true;
        if (!this.hasBeenPlaced) {
            return console.log('You must place the robot first.');
        }
        //1. Determine position and direction.
        //2. Ensure that positional values are not 5.
        //3. Increase the x or y value by one, depending on these factors.

        //instead of setting a previous position, we could instead make suggestedpos

        //Move position to new position
        let x = this.robotPosition[0]
        let y = this.robotPosition[1]
        let suggestedPosition = [x,y];

        switch (this.robotDirection) {
            case "NORTH":
                (this.robotPosition[1] === 5 ) ? (this.fallOffError("NORTH"), moved = false) : (suggestedPosition[1] = this.robotPosition[1] +1);
                 break;
            case "SOUTH":
                (this.robotPosition[1] === 0) ? (this.fallOffError("SOUTH"), moved = false)  : (suggestedPosition[1] = this.robotPosition[1] -1);
                break;
            case "EAST":
                (this.robotPosition[0] === 5) ? (this.fallOffError("EAST"), moved = false)  : (suggestedPosition[0] = this.robotPosition[0] +1);
                break;
            case "WEST":
                (this.robotPosition[0] === 0) ? (this.fallOffError("WEST"), moved = false)  : (suggestedPosition[0] = this.robotPosition[0] -1);
            default:
                break;
            }


            //Check if new position collides with an obstacle
    
            this.obstructedCells.forEach(element => {
                if (element[0] === suggestedPosition[0] && element[1] === suggestedPosition[1]){
                    moved = false;
                }
                
            });


            if (moved) {
                console.log(`Moved one spot ${this.robotDirection}!`);
                this.robotPosition = suggestedPosition;
            } else {
                console.log("There was an obstruction in the way!")
                //Reset the robots position because there was an obstruction
                // this.robotPosition = previousPosition;
            }


            
    }

    fallOffError(direction){
        console.log(`I cannot go any further ${this.robotDirection}, or I'll fall!`);
    }

    left() {
        if (!this.hasBeenPlaced) {
            return console.log('You must place the robot first.');
        }
        //Change the direction 45 degrees to the left
        switch (this.robotDirection) {
            case "NORTH":
                this.robotDirection = "NORTHWEST";
                break;
            case "SOUTH":
                this.robotDirection = "SOUTHEAST";
                break;
            case "EAST":
                this.robotDirection = "NORTHEAST";
                break;
            case "WEST":
                this.robotDirection = "SOUTHWEST";
            case "NORTHWEST":
                this.robotDirection = "WEST"
                break;
            case "NORTHEAST":
                this.robotDirection = "NORTH"
                break;
            case "SOUTHWEST":
                this.robotDirection = "SOUTH"
                break;
            case "SOUTHEAST":
                this.robotDirection = "EAST"
                break;
            }

            console.log(`Robot is now facing ${this.robotDirection}!`);
    }

    right() {

        if (!this.hasBeenPlaced) {
            return console.log('You must place the robot first.');
        }

        //Change the direction 45 degrees to the right
        switch (this.robotDirection) {
            case "NORTH":
                this.robotDirection = "NORTHEAST";
                break;
            case "SOUTH":
                this.robotDirection = "SOUTHWEST";
                break;
            case "EAST":
                this.robotDirection = "SOUTHEAST";
                break;
            case "WEST":
                this.robotDirection = "NORTHWEST";

            /// Didn't have time to finish the rest of the directions, but the logic is there ///


            // case "NORTHWEST":
            //     this.robotDirection = "WEST"
            //     break;
            // case "NORTHEAST":
            //     this.robotDirection = "NORTH"
            //     break;
            // case "SOUTHWEST":
            //     this.robotDirection = "SOUTH"
            //     break;
            // case "SOUTHEAST":
            //     this.robotDirection = "EAST"
            //     break;
            }
            console.log(`Robot is now facing ${this.robotDirection}!`);

    }
    report() {
        if (!this.hasBeenPlaced) {
            return console.log('You must place the robot first.');
        }
        console.log(`Robot is currently at ${this.robotPosition}, facing ${this.robotDirection}!`)
    }


    avoid(x,y) {
        if ((x === this.robotPosition[0] && y === this.robotPosition[1]) || x>5 || y>5 ) {
            return console.log("Invalid position to avoid!")
        }
        //Mark this cell as an obstruction
        this.obstructedCells.push(([x,y]));
    }

}

function run() {
    let jimmy = new Robot();
    jimmy.place([1,2], 'EAST', jimmy.allowedDirections);
    jimmy.avoid(2,2);
    jimmy.avoid(2,3);
    jimmy.move();
    jimmy.place([2,3], 'EAST', jimmy.allowedDirections);
    jimmy.move();
    jimmy.left();
    jimmy.move();
    jimmy.report();




    // console.log('Test 1: Expected output: 0,1,NORTH');
    // jimmy.report();

    // // //Second test
    // jimmy.place([0,0], 'NORTH', jimmy.allowedDirections);
    // jimmy.left();
    // console.log('Test 2: Expected output: 0,0,WEST');
    // jimmy.report();

    // // //Third test
    // jimmy.place([1,2], 'EAST', jimmy.allowedDirections);
    // jimmy.move();
    // jimmy.move();
    // jimmy.left();
    // jimmy.move();
    // console.log('Test 3: Expected output: 3,3,NORTH');
    // jimmy.report();

    //CUSTOM TESTS (uncomment to test)

    //Placing the robot on an invalid square

    /*
    jimmy.place([5,-5], 'EAST', jimmy.allowedDirections);
    jimmy.report();
    */

    //Moving the robot off the board

    /*
    jimmy.place([4,4], 'NORTH', jimmy.allowedDirections);
    jimmy.move();
    jimmy.report();
    jimmy.left();
    jimmy.move();
    jimmy.report();
    */

    //Multiple PLACE commands

    /*
    jimmy.place([3,1], 'WEST', jimmy.allowedDirections);
    jimmy.move();
    jimmy.report();
    jimmy.place([1,4], 'SOUTH', jimmy.allowedDirections);
    jimmy.move();
    jimmy.report();
    */



}

// Iteration 1 - we need to increase the table size to 6x6
// What needs to happen here?
//  Move conditionals need to be changed from 4 to 5

//Iteration 2 - make avoid command 
//Need to create an obstruction first.
// If a cell is an obstruction, activate a boolean flag
// Then if a robot tries to MOVE or PLACE onto the given cell, display an error message

//Create obstructed cells array that determines which cells have obstructions on them
//Check on MOVE and PLACE if the cell is obstructed. If they are, do not execute the command.


run();
