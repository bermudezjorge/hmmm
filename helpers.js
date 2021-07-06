function getSquareData(pos) {
  return gameData.squares[pos[0]][pos[1]];
}

function shadeColor(color, percent) {
  color = color.substr(1);
  var num = parseInt(color, 16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) + amt,
    G = ((num >> 8) & 0x00ff) + amt,
    B = (num & 0x0000ff) + amt;
  return (
    "#" +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  );
}

function drawCube(x, y, wx, wy, h, color) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x - wx, y - wx * 0.5);
  ctx.lineTo(x - wx, y - h - wx * 0.5);
  ctx.lineTo(x, y - h * 1);
  ctx.closePath();
  ctx.fillStyle = shadeColor(color, -12);
  ctx.strokeStyle = color;
  ctx.stroke();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + wy, y - wy * 0.5);
  ctx.lineTo(x + wy, y - h - wy * 0.5);
  ctx.lineTo(x, y - h * 1);
  ctx.closePath();
  ctx.fillStyle = shadeColor(color, 10);
  ctx.strokeStyle = shadeColor(color, 50);
  ctx.stroke();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(x, y - h);
  ctx.lineTo(x - wx, y - h - wx * 0.5);
  ctx.lineTo(x - wx + wy, y - h - (wx * 0.5 + wy * 0.5));
  ctx.lineTo(x + wy, y - h - wy * 0.5);
  ctx.closePath();
  ctx.fillStyle = shadeColor(color, 20);
  ctx.strokeStyle = shadeColor(color, 60);
  ctx.stroke();
  ctx.fill();
}

function drawLine(x, y, wx, wy, color, path) {
  ctx.beginPath();
  path.moveTo(x, y - 3);
  path.lineTo(x - wx, y - 3 - wx * 0.5);
  path.lineTo(x - wx + wy, y - 3 - (wx * 0.5 + wy * 0.5));
  path.lineTo(x + wy, y - 3 - wy * 0.5);
  path.closePath();
  ctx.strokeStyle = color;
  ctx.stroke(path);
}

function pathFinding(newPos) {
  const squaresData = gameData.squares.map((innerSquares) =>
    innerSquares.map((square) => (square.content ? 0 : 1))
  );

  var graph = new Graph(squaresData, { diagonal: true });
  const oldPos = getSquareData(gameData.currentSquare).posMatrix;

  var start = graph.grid[oldPos[0]][oldPos[1]];
  var end = graph.grid[newPos[0]][newPos[1]];

  // result is an array containing the shortest path
  var result = astar.search(graph, start, end, {
    heuristic: astar.heuristics.diagonal,
  });

  moveCharToPos(result);
}

function moveCharToPos(positions) {
  const startingPos = [positions[0].parent.x, positions[0].parent.y];

  const positionsInSpace = [
    getSquareData(startingPos).posPx,
    ...positions.map((pos) => getSquareData([pos.x, pos.y]).posPx),
  ];
  const positionsInSpaceLength = positionsInSpace.length - 1;

  gameData.player.movingArr = [];

  for (let i = 1; i <= positionsInSpaceLength; i++) {
    const isXPositive = positionsInSpace[i - 1].x < positionsInSpace[i].x;
    const isYPositive = positionsInSpace[i - 1].y < positionsInSpace[i].y;

    const movingData = {
      posMatrix: [positions[i - 1].x, positions[i - 1].y],
      isMovingPositive: {
        x: isXPositive,
        y: isYPositive,
      },
      to: {
        x: positionsInSpace[i].x,
        y: positionsInSpace[i].y,
      },
    };

    gameData.player.movingArr.push(movingData);
  }
}

// var graphDiagonal = new Graph(
//   [
//     [1, 1, 1, 1],
//     [0, 1, 1, 0],
//     [0, 0, 1, 1],
//   ],
// { diagonal: true }
// );

// var start = graphDiagonal.grid[0][0];
// var end = graphDiagonal.grid[1][2];
// var resultWithDiagonals = astar.search(graphDiagonal, start, end, {
//   heuristic: astar.heuristics.diagonal,
// });

// console.log(resultWithDiagonals);

// // Weight can easily be added by increasing the values within the graph, and where 0 is infinite (a wall)
// var graphWithWeight = new Graph([
//   [1, 1, 4, 30],
//   [0, 1, 1.3, 0],
//   [0, 0, 5, 1],
// ]);
// var startWithWeight = graphWithWeight.grid[0][0];
// var endWithWeight = graphWithWeight.grid[1][2];
// var resultWithWeight = astar.search(
//   graphWithWeight,
//   startWithWeight,
//   endWithWeight
// );

// console.log(resultWithWeight);
