
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/*
    The first element determines the starting size.
    The second element determines the modifier e.g. how much the element should decrease in size every time another instance is created.

    The modifiers are LINEAR not exponential?
*/

/*

    Scale is only dependant on scale

    Rotation is only dependant on rotation

    Location is dependant on Scale AND rotation

*/

const draw = () => {
  const startRadius = 50;
  const maxLevel = 1000;
  const xMod = 40;
  const yMod = 40;
  const rotationMod = 5;


  let currentLevel = 1;

  const locationVector = new Victor(canvas.width / 1.3, canvas.height - canvas.height / 0.9);
  let rotation = 0;
  locationVector.rotateDeg(rotation);


  const drawRecursiveCircle = (scale) => {
    const newScale = scale * 0.99;
    rotation = rotation + rotationMod;

    const xyModifierVector = new Victor(xMod, yMod);
    xyModifierVector.multiply(new Victor(newScale, newScale));
    xyModifierVector.rotateDeg(rotation);

    locationVector.add(xyModifierVector);

    ctx.beginPath();
    ctx.arc(locationVector.x, locationVector.y, startRadius * newScale, 0, 2 * Math.PI);
    ctx.stroke();

    currentLevel++;

    if (currentLevel !== maxLevel) {
      drawRecursiveCircle(newScale);
    }
  };

  drawRecursiveCircle(1);
};


const resizeCanvas = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  draw();
};


window.addEventListener('resize', resizeCanvas, false);
resizeCanvas();
