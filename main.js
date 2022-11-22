////////////////////////////////////////////////////////////////
const gameBoard = (function () {
  const gameBoardArr = new Array(9);

  const fillGameBoardArr = function (index, player) {
    if (gameBoardArr[index] === undefined) {
      gameBoardArr[index] = player.chooseChess();
    }
  };

  const renderGameBoard = function (index, gridEle) {
    if (gameBoardArr[index] === `x`) {
      gridEle.insertAdjacentHTML(
        "afterbegin",
        `<img class="xImg" src="Sources/X.svg" alt="" />`
      );
    } else {
      gridEle.insertAdjacentHTML(
        "afterbegin",
        `<img class="oImg" src="Sources/O.svg" alt="" />`
      );
    }
  };

  const resetBoardArr = function () {
    for (let i = 0; i < gameBoardArr.length; i++) {
      gameBoardArr[i] = undefined;
      const gridNode = document.querySelector(`[data-grid="${i}"]`);
      if (gridNode.hasChildNodes()) gridNode.removeChild(gridNode.firstChild);
    }
  };

  return { fillGameBoardArr, renderGameBoard, resetBoardArr };
})();

//////////////////////////////////////////////////////
const gameController = (function () {
  const player1 = players(`x`);
  const player2 = players(`o`);
  let isPlayed = false;

  const gameBoardElement = document.querySelector(`.gameBoard`);
  const resetBtn = document.querySelector(`.reset`);

  gameBoardElement.addEventListener(`click`, function (e) {
    const index = e.target.dataset.grid;
    const gridEle = document.querySelector(`[data-grid="${index}"]`);

    if (isPlayed === false) {
      gameBoard.fillGameBoardArr(index, player1);
      gameBoard.renderGameBoard(index, gridEle);
      isPlayed = true;
    } else if (isPlayed === true) {
      gameBoard.fillGameBoardArr(index, player2);
      gameBoard.renderGameBoard(index, gridEle);
      isPlayed = false;
    }
  });

  resetBtn.addEventListener(`click`, function () {
    gameBoard.resetBoardArr();
    isPlayed = false;
  });
})();

////////////////////////////////////////////////////////////////
function players(chess) {
  function chooseChess() {
    return chess;
  }

  return { chooseChess };
}
