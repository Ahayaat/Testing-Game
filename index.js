#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
const sleep = () => new Promise((res, rej) => setTimeout(res, 2000));
async function Welcome() {
    const rainbowTitle = chalkAnimation.rainbow(`Let's Start the Game!!!`); //start
    await sleep();
    rainbowTitle.stop();
}
//Welcome();
let playerLife = 3;
async function askQuestion() {
    let randomNumber = Math.floor(Math.random() * 10 + 1);
    do {
        playerLife--;
        console.log(`Player Life left ${playerLife}`);
        var que = await inquirer
            .prompt([
            {
                type: "number",
                name: "usr_num",
                message: chalk.rgb(250, 128, 114)("Select any number between 1 - 10: "),
                validate: (answers) => {
                    if (isNaN(answers)) {
                        return chalk.red(`Please enter a valid number!!`);
                    }
                    return true;
                }
            }
        ]);
        //console.log(que);
        if (que.usr_num === randomNumber) {
            console.log(chalk.green(`Congratulation!! You guess the right number`));
        }
        else if (que.usr_num < randomNumber) {
            console.log(chalk.red(`Your number ${que.usr_num} is less than guess Number`));
        }
        else if (que.usr_num > randomNumber) {
            console.log(chalk.red(`Your number ${que.usr_num} is greater than guess Number`));
        }
    } while (playerLife > 0 && randomNumber !== que.usr_num);
    if (playerLife == 0 && randomNumber !== que.usr_num) {
        console.log(chalk.redBright(`GAME OVER!!`));
    }
}
//askQuestion();
async function startAgain() {
    do {
        console.clear();
        await Welcome();
        playerLife = 3;
        await askQuestion();
        var restart = await inquirer.prompt([
            {
                type: "input",
                name: "start_again",
                message: chalk.rgb(250, 128, 114)("Do you want to restart the game? Press Y or N: ")
            }
        ]);
    } while (restart.start_again === 'Y' || restart.start_again === 'yes' || restart.start_again === 'YES');
}
startAgain();
