const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gameData = {
  squares: [],
  currentSquare: [0, 0],
  hoverSquare: null,

  player: {
    oldSquare: [],
    pos: {
      x: 0,
      y: 0,
    },
    movingArr: [],
  },

  floorColor: "#567d46",
  playerColor: "#131ab1",
};

canvas.addEventListener("mousemove", (evt) => {
  gameData.squares.forEach((squareInner) => {
    squareInner.forEach((squareSelected) => {
      if (
        ctx.isPointInPath(squareSelected.path, evt.offsetX, evt.offsetY) &&
        !squareSelected.content
      ) {
        gameData.hoverSquare = squareSelected.posMatrix;
      }
    });
  });
});

canvas.addEventListener("click", (evt) => {
  gameData.squares.forEach((innerSquare, i) => {
    innerSquare.forEach((specificSquare, j) => {
      if (
        ctx.isPointInPath(specificSquare.path, evt.offsetX, evt.offsetY) &&
        getSquareData(gameData.currentSquare).id != specificSquare.id
      ) {
        pathFinding([i, j]);

        gameData.currentSquare = specificSquare.posMatrix;
      }
    });
  });
});

const ctx = canvas.getContext("2d");

function draw() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //floor
  drawCube(
    window.innerWidth / 2,
    window.innerHeight / 2 + 300,
    Number(320),
    Number(320),
    Number(20 + 20 * 0.1),
    gameData.floorColor
  );

  //squares
  Array(16)
    .fill("")
    .forEach((_, i) => {
      gameData.squares[i] = Array(16);
      Array(16)
        .fill("")
        .forEach((_, j) => {
          const squareData = {
            id: `${i}${j}`,
            path: new Path2D(),
            posMatrix: [i, j],
            posPx: {
              x: window.innerWidth / 2 + j * 20 - i * 20,
              y: window.innerHeight / 2 - (20 - j * 10) + i * 10,
            },
            content: null,
          };

          gameData.squares[i][j] = squareData;

          drawLine(
            squareData.posPx.x,
            squareData.posPx.y,
            Number(20),
            Number(20),
            shadeColor(gameData.floorColor, 20),
            squareData.path
          );
        });
    });
  if (gameData.hoverSquare) {
    drawLine(
      getSquareData(gameData.hoverSquare).posPx.x,
      getSquareData(gameData.hoverSquare).posPx.y,
      Number(20),
      Number(20),
      shadeColor("#ffffff", -12),
      getSquareData(gameData.hoverSquare).path
    );
  }

  //player
  if (gameData.player.movingArr.length > 0) {
    if (
      gameData.player.pos.x === gameData.player.movingArr[0].to.x &&
      gameData.player.pos.y === gameData.player.movingArr[0].to.y
    ) {
      gameData.player.movingArr.shift();
    }

    if (gameData.player.movingArr.length > 0) {
      gameData.currentSquare = gameData.player.movingArr[0].posMatrix;

      if (
        gameData.player.pos.x < gameData.player.movingArr[0].to.x &&
        gameData.player.movingArr[0].isMovingPositive.x
      ) {
        gameData.player.pos.x += Math.min(2, gameData.player.movingArr[0].to.x);
      }

      if (
        gameData.player.pos.x > gameData.player.movingArr[0].to.x &&
        !gameData.player.movingArr[0].isMovingPositive.x
      ) {
        gameData.player.pos.x -= Math.min(2, gameData.player.movingArr[0].to.x);
      }

      if (
        gameData.player.pos.y < gameData.player.movingArr[0].to.y &&
        gameData.player.movingArr[0].isMovingPositive.y
      ) {
        gameData.player.pos.y += Math.min(1, gameData.player.movingArr[0].to.y);
      }

      if (
        gameData.player.pos.y > gameData.player.movingArr[0].to.y &&
        !gameData.player.movingArr[0].isMovingPositive.y
      ) {
        gameData.player.pos.y -= Math.min(1, gameData.player.movingArr[0].to.y);
      }
    }

    drawCube(
      gameData.player.pos.x,
      gameData.player.pos.y - 3,
      Number(20),
      Number(20),
      Number(50 + 50 * 0.1),
      gameData.playerColor
    );
  } else {
    gameData.player.pos.x = getSquareData(gameData.currentSquare).posPx.x;
    gameData.player.pos.y = getSquareData(gameData.currentSquare).posPx.y;

    drawCube(
      getSquareData(gameData.currentSquare).posPx.x,
      getSquareData(gameData.currentSquare).posPx.y - 3,
      Number(20),
      Number(20),
      Number(50 + 50 * 0.1),
      gameData.playerColor
    );
  }

  window.requestAnimationFrame(draw);
}
draw();
