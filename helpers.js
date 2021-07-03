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

function pathFinding(oldPos, newPos) {
  let path = [];

  console.log(oldPos, newPos);

  // for (let i = 0; i < gameData.squares.length - 1; i++) {
  //   for (let j = 0; j < gameData.squares[i].length - 1; j++) {
  //     if(newPos[0] > oldPos.posMatrix[0]) {
  //       break;
  //     } else {

  //     }
  //   }
  // }
}
