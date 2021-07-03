const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gameData = {
  squares: [],
  currentSquare: null,

  floorColor: "#567d46",
  playerColor: "#131ab1",
};

window.addEventListener("resize", () => {
  draw();
});

canvas.addEventListener("mousemove", (evt) => {
  gameData.squares.forEach((squareInner) => {
    squareInner.forEach((currentSquare) => {
      if (
        ctx.isPointInPath(currentSquare.path, evt.offsetX, evt.offsetY) &&
        !currentSquare.content
      ) {
        draw();

        ctx.strokeStyle = shadeColor("#ffffff", -12);
        ctx.stroke(currentSquare.path);

        drawCube(
          gameData.currentSquare.posPx.x,
          gameData.currentSquare.posPx.y - 3,
          Number(20),
          Number(20),
          Number(50 + 50 * 0.1),
          gameData.playerColor
        );
      }
    });
  });
});

canvas.addEventListener("click", (evt) => {
  gameData.squares.forEach((innerSquare, i) => {
    innerSquare.forEach((specificSquare, j) => {
      if (
        ctx.isPointInPath(specificSquare.path, evt.offsetX, evt.offsetY) &&
        gameData.currentSquare.id != specificSquare.id
      ) {
        pathFinding(gameData.currentSquare, [i, j]);

        gameData.currentSquare = specificSquare;

        draw();
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

          if (!gameData.currentSquare) {
            gameData.currentSquare = squareData;
          }

          gameData.squares[i][j] = squareData;

          const posX = squareData.posPx.x;
          const posY = squareData.posPx.y;
          const path = squareData.path;

          drawLine(
            posX,
            posY,
            Number(20),
            Number(20),
            shadeColor(gameData.floorColor, 20),
            path
          );
        });
    });

  //player
  drawCube(
    gameData.currentSquare.posPx.x,
    gameData.currentSquare.posPx.y - 3,
    Number(20),
    Number(20),
    Number(50 + 50 * 0.1),
    gameData.playerColor
  );
}

draw();

// const element = document.getElementById('some-element-you-want-to-animate');
// let start;

// function step(timestamp) {
//   if (start === undefined)
//     start = timestamp;
//   const elapsed = timestamp - start;

//   // `Math.min()` is used here to make sure that the element stops at exactly 200px.
//   element.style.transform = 'translateX(' + Math.min(0.1 * elapsed, 200) + 'px)';

//   if (elapsed < 2000) { // Stop the animation after 2 seconds
//     window.requestAnimationFrame(step);
//   }
// }

// window.requestAnimationFrame(step);
