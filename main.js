const setGameBoard = (function () {
  const gameBoardArr = [
    [``, ``, ``],
    [``, ``, ``],
    [``, ``, ``],
  ];

  const extractGameBoard = function () {
    return gameBoardArr;
  };

  return { extractGameBoard };
})();

/////////////////////////////////////////////
const player = function (chess) {
  const yourChess = chess;

  function setChess() {
    return chess;
  }

  return {
    setChess,
  };
};

/////////////////////////////////////////////
const gameLogic = (function () {
  let turn = 0;
  const gameBoard = setGameBoard.extractGameBoard();
  const wrapper = document.querySelector(`.wrapper`);
  wrapper.insertAdjacentHTML(`afterbegin`, ``);

  const fillGameBoardArr = function (rowIndex, eleIndex, chess) {
    gameBoard[rowIndex][eleIndex] = chess;
  };

  const countTurn = function () {
    turn++;
  };

  const winCondition = function (turn) {
    if (turn < 9) {
      for (let i = 0; i <= 2; i++) {
        if (
          gameBoard[i].every((ele) => ele === `x`) ||
          gameBoard.every((arr) => arr[i] === `x`) ||
          (gameBoard[0][0] === `x` &&
            gameBoard[1][1] === `x` &&
            gameBoard[2][2] === `x`) ||
          (gameBoard[0][2] === `x` &&
            gameBoard[1][1] === `x` &&
            gameBoard[2][0] === `x`)
        ) {
          wrapper.insertAdjacentHTML(
            `afterbegin`,
            `<div class="bannerContainer">
            <div class="banner">X is the Winner 🏆</div>
          </div>`
          );
        } else if (
          gameBoard[i].every(
            (ele) =>
              ele === `o` ||
              gameBoard.every((arr) => arr[i] === `o`) ||
              (gameBoard[0][0] === `o` &&
                gameBoard[1][1] === `o` &&
                gameBoard[2][2] === `o`) ||
              (gameBoard[0][2] === `o` &&
                gameBoard[1][1] === `o` &&
                gameBoard[2][0] === `o`)
          )
        ) {
          wrapper.insertAdjacentHTML(
            `afterbegin`,
            `<div class="bannerContainer">
            <div class="banner">O is the Winner 🏆</div>
          </div>`
          );
        }
      }
    } else if (turn === 9) {
      wrapper.insertAdjacentHTML(
        `afterbegin`,
        `<div class="bannerContainer">
        <div class="banner">Draw</div>
      </div>`
      );
    }
  };

  return { fillGameBoardArr, countTurn, winCondition };
})();

/////////////////////////////////////////////
const gameRender = (function () {
  const gameBoard = setGameBoard.extractGameBoard();

  const renderGameBoard = function (rowIndex, eleIndex, chess) {
    document
      .querySelector(`[data-grid="${rowIndex}${eleIndex}"]`)
      .insertAdjacentHTML(`afterbegin`, chess);
  };

  return { renderGameBoard };
})();

/////////////////////////////////////////////
const gameController = (function () {
  //Query Selectors
  const gameBoardEle = document.querySelector(`.gameBoard`);

  //Import Parameters
  const gameBoard = setGameBoard.extractGameBoard();

  //Initialized Parameters
  const yourChess = player(`x`).setChess();
  const computerChess = player(`o`).setChess();
  let aComputer, bComputer;

  let index;
  let turn = 0;

  //event listener
  gameBoardEle.addEventListener(`click`, function (e) {
    if (e.target.dataset) {
      [a, b] = e.target.dataset.grid.split(``);
      if (gameBoard[a][b] === `` && turn < 9) {
        console.log(turn);
        gameLogic.fillGameBoardArr(a, b, yourChess);
        gameRender.renderGameBoard(a, b, yourChess);
        gameLogic.winCondition(turn);
        turn++;

        aComputer = getRandomNumber();
        bComputer = getRandomNumber();

        if (turn < 9) {
          while (gameBoard[aComputer][bComputer] !== ``) {
            aComputer = getRandomNumber();
            bComputer = getRandomNumber();
          }

          gameLogic.fillGameBoardArr(aComputer, bComputer, computerChess);
          gameRender.renderGameBoard(aComputer, bComputer, computerChess);
          gameLogic.winCondition(turn);
          turn++;
        }
      }
    }
  });

  //function
  function getRandomNumber() {
    return Math.floor(Math.random() * 3);
  }
})();
