

// Toy Robot Simulator
// --------------------
// Create a library that can read in commands of the following form:

// PLACE X,Y,DIRECTION
// MOVE
// LEFT
// RIGHT
// REPORT

// . The library allows for a simulation of a toy robot moving on a 5 x 5 square tabletop.
// . There are no obstructions on the table surface.
// . The robot is free to roam around the surface of the table, but must be prevented from falling to destruction. Any movement that would result in this must be prevented, however further valid movement commands must still be allowed.
// . PLACE will put the toy robot on the table in position X,Y and facing NORTH, SOUTH, EAST or WEST.
// . (0,0) can be considered as the SOUTH WEST corner and (4,4) as the NORTH EAST corner.
// . The first valid command to the robot is a PLACE command. After that, any sequence of commands may be issued, in any order, 
// including another PLACE command. The library should discard all commands in the sequence until a valid PLACE command has been executed.
// . The PLACE command should be discarded if it places the robot outside of the table surface.
// . MOVE will move the toy robot one unit forward in the direction it is currently facing.
// . LEFT and RIGHT will rotate the robot 90 degrees in the specified direction without changing the position of the robot.
// . REPORT will announce the X,Y and orientation of the robot.
// . A robot that is not on the table can choose to ignore the MOVE, LEFT, RIGHT and REPORT commands.
// . The library should discard all invalid commands and parameters.

// Example Input and Output:
// a)
// PLACE 0,0,NORTH
// MOVE
// REPORT
// Output: 0,1,NORTH

// b)
// PLACE 0,0,NORTH
// LEFT
// REPORT
// Output: 0,0,WEST

// c)
// PLACE 1,2,EAST
// MOVE
// MOVE
// LEFT
// MOVE
// REPORT
// Output: 3,3,NORTH

// - Use your preferred language, platform and IDE to implement this solution.
// - Your solution should be clean and easy to read, maintain and execute.
// - There must be a way to supply the library with input data. 
// - Writing an interface (command prompt or otherwise) is not mandatory.
// - You should provide sufficient evidence that your solution is complete by, as a minimum, indicating that it works correctly against the supplied test data.
// - You should provide build scripts or instructions to build and verify the solution.
// - The code should be original and you may not use any external libraries or open source code to solve this problem, but you may use external libraries or tools for building or testing purposes.

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
        //If first and second position are both between 0 and 4 and the direction is valid, let it go through
        if (
            (position[0] >=0 && position[0] <=4 && position[1] >= 0 && position[1] <=4)
            &&
            (allowedDirections.includes(direction))) {
                //Set positions
                this.robotPosition = position;
                this.robotDirection = direction;
                console.log(`Placed robot at ${this.robotPosition}, facing ${this.robotDirection}!`);
                this.hasBeenPlaced = true;
        } else {
            console.log('Please provide a valid position and direction for placement.');
        }

    }

    //Move the robot one step forward in the direction it is facing

    move() {
        let moved = false;
        if (!this.hasBeenPlaced) {
            return console.log('You must place the robot first.');
        }

        //1. Determine position and direction.
        //2. Ensure that positional values are not 4.
        //3. Increase the x or y value by one, depending on these factors.

        //Move position
        switch (this.robotDirection) {
            case "NORTH":
                (this.robotPosition[1] === 4) ? this.fallOffError("NORTH") : (this.robotPosition[1] ++, moved = true);
                break;
            case "SOUTH":
                (this.robotPosition[1] === 0) ? this.fallOffError("SOUTH") : (this.robotPosition[1] --, moved = true);
                break;
            case "EAST":
                (this.robotPosition[0] === 4) ? this.fallOffError("EAST") : (this.robotPosition[0] --, moved = true);
                break;
            case "WEST":
                (this.robotPosition[0] === 0) ? this.fallOffError("WEST") : (this.robotPosition[1] --, moved = true);
                break;
            default:
                console.log("Invalid direction!");
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
                break;
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
                break;
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
    jimmy.place([4,4], 'NORTH', jimmy.allowedDirections);
    jimmy.move();
    jimmy.left();
    jimmy.move();
    jimmy.report();
}

run();
