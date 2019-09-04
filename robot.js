class Robot {

    constructor(position = "", direction = []) {
    //Do not construct with a positional value, because we haven't called PLACE yet.
        this.robotPosition = position;
        this.robotDirection = direction;

        //Check if the robot has been placed before executing other functions
        this.hasBeenPlaced = false;
    }

    //Place the robot at the given co-ordinates, and facing either N,S,E or W.

    place(position, direction) {
        let allowedDirections = ["NORTH", "SOUTH", "EAST", "WEST"]; 

        //Check if position is on the table
        //If first and second position are both between 0 and 5 and the direction is valid, let it go through
        if (
            (position[0] >=0 && position[0] <=5 && position[1] >= 0 && position[1] <=5)
            &&
            (allowedDirections.includes(direction))) {
                //Set positions
                this.robotPosition = position;
                this.robotDirection = direction;
                console.log(`Placed robot at ${this.robotPosition}, facing ${this.robotDirection}!`);
                this.hasBeenPlaced = true;
        } else {
            console.log('Please provide a valid position and direction for placement.');
            //hasBeenPlaced remains false
        }

    }

    //Move the robot one step forward in the direction it is facing

    move() {
        let moved = false;
        if (!this.hasBeenPlaced) {
            return console.log('You must place the robot first.');
        }

        //1. Determine position and direction.
        //2. Ensure that positional values are not 5.
        //3. Increase the x or y value by one, depending on these factors.

        //Move position
        switch (this.robotDirection) {
            case "NORTH":
                (this.robotPosition[1] === 5) ? this.fallOffError("NORTH") : (this.robotPosition[1] ++, moved = true);
                break;
            case "SOUTH":
                (this.robotPosition[1] === 0) ? this.fallOffError("SOUTH") : (this.robotPosition[1]--, moved = true);
                break;
            case "EAST":
                (this.robotPosition[0] === 5) ? this.fallOffError("EAST") : (this.robotPosition[0]++, moved = true);
                break;
            case "WEST":
                (this.robotPosition[0] === 0) ? this.fallOffError("WEST") : (this.robotPosition[0]--, moved = true);
            default:
                break;
            }

            if (moved) {
                console.log(`Moved one spot ${this.robotDirection}!`);
            }


            
    }

    fallOffError(direction){
        console.log(`I cannot go any further ${this.robotDirection}, or I'll fall!`);
    }

    left() {
        if (!this.hasBeenPlaced) {
            return console.log('You must place the robot first.');
        }
        //Change the direction 90 degrees to the left
        switch (this.robotDirection) {
            case "NORTH":
                this.robotDirection = "WEST";
                break;
            case "SOUTH":
                this.robotDirection = "EAST";
                break;
            case "EAST":
                this.robotDirection = "NORTH";
                break;
            case "WEST":
                this.robotDirection = "SOUTH";
            }

            console.log(`Robot is now facing ${this.robotDirection}!`);
    }

    right() {

        if (!this.hasBeenPlaced) {
            return console.log('You must place the robot first.');
        }

        //Change the direction 90 degrees to the right
        switch (this.robotDirection) {
            case "NORTH":
                this.robotDirection = "EAST";
                break;
            case "SOUTH":
                this.robotDirection = "WEST";
                break;
            case "EAST":
                this.robotDirection = "SOUTH";
                break;
            case "WEST":
                this.robotDirection = "NORTH";

            }

            console.log(`Robot is now facing ${this.robotDirection}!`);

    }
    report() {
        if (!this.hasBeenPlaced) {
            return console.log('You must place the robot first.');
        }
        console.log(`Robot is currently at ${this.robotPosition}, facing ${this.robotDirection}!`)
    }

}

function run() {
    let jimmy = new Robot();
    //First test
    jimmy.place([5,5], 'NORTH', jimmy.allowedDirections);
    jimmy.move();
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

run();