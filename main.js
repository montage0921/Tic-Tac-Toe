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

  const fillGameBoardArr = function (rowIndex, eleIndex, chess) {
    gameBoard[rowIndex][eleIndex] = chess;
  };

  const countTurn = function () {
    turn++;
  };

  const extractTurn = function () {
    return turn;
  };

  return { fillGameBoardArr, countTurn, extractTurn };
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
        turn += 2;
        console.log(turn);
        gameLogic.fillGameBoardArr(a, b, yourChess);
        gameRender.renderGameBoard(a, b, yourChess);

        aComputer = getRandomNumber();
        bComputer = getRandomNumber();

        if (turn < 9) {
          while (gameBoard[aComputer][bComputer] !== ``) {
            aComputer = getRandomNumber();
            bComputer = getRandomNumber();
          }

          gameLogic.fillGameBoardArr(aComputer, bComputer, computerChess);
          gameRender.renderGameBoard(aComputer, bComputer, computerChess);
        }
      }
    }
  });

  //function
  function getRandomNumber() {
    return Math.floor(Math.random() * 3);
  }
})();
