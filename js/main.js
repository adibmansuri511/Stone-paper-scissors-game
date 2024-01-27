const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const newGameBtn = document.querySelector("#new-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");

let turnO = true; // Player O
let count = 0;    // To Track Draw

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];


const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
}


boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("Box was clicked.")
        if (turnO) { // Player O turn
            box.innerHTML = `<span style="color: #294B29">O</span>`;
            turnO = false;
        } else { // Player X turn
            box.innerText = "X";
            turnO = true;
        }

        box.disabled = true;
        count++;

        const isWinner = checkWinner();

        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});


const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};


const disableBoxes = () => {
    for (const box of boxes) {
        box.disabled = true;
    }
};


const enableBoxes = () => {
    for (const box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};


const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is : ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};


const checkWinner = () => {
    for (const pattern of winPatterns) {
        // console.log(pattern[0], pattern[1], pattern[2]);

        // console.log(
        //     boxes[pattern[0]].innerText,
        //     boxes[pattern[1]].innerText,
        //     boxes[pattern[2]].innerText
        // );

        const pos1Val = boxes[pattern[0]].innerText;
        const pos2Val = boxes[pattern[1]].innerText;
        const pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "", pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log(`Winner ${pos1Val}`);
                showWinner(pos1Val);
                return true;
            }
        }
    }
};


newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);