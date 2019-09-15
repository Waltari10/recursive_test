const Victor = require('victor');
const Color = require('color');

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
  const startRadius = 10;
  const maxLevel = 141;
  const xMod = 11;
  const yMod = 11;
  const rotationMod = 4;
  const scaleModifier = 0.967;
  const startColor = Color({r: 0, g: 255, b: 0});
  const colorModifier = 5;

  const locationVector = new Victor(canvas.width / 2, canvas.height / 2);


  const drawRecursiveCircle = (scale, rotation, location, level, color) => {
    const newScale = scale * scaleModifier;
    const newRotation = rotation + rotationMod;
    const newLocation = location.clone();
    const newColor = color.rotate(colorModifier);

    const xyModifierVector = new Victor(xMod, yMod);
    xyModifierVector.multiply(new Victor(newScale, newScale));
    xyModifierVector.rotateDeg(newRotation);

    newLocation.add(xyModifierVector);

    ctx.strokeStyle = newColor.hex();
    ctx.beginPath();
    ctx.arc(newLocation.x, newLocation.y, startRadius * newScale, 0, 2 * Math.PI);
    ctx.stroke();

    const newLevel = level - 1;

    if (newLevel % 10 === 0 && newLevel > 0 && level !== maxLevel) {
      drawRecursiveCircle(newScale, newRotation - 90, newLocation, newLevel, newColor);
    }

    if (newLevel > 0) {
      drawRecursiveCircle(newScale, newRotation, newLocation, newLevel, newColor);
    }
  };

  drawRecursiveCircle(1, 180, locationVector, maxLevel, startColor);
  drawRecursiveCircle(1, 90, locationVector, maxLevel, startColor);
  drawRecursiveCircle(1, 0, locationVector, maxLevel, startColor);
  drawRecursiveCircle(1, -90, locationVector, maxLevel, startColor);
};


const resizeCanvas = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  draw();
};


window.addEventListener('resize', resizeCanvas, false);
resizeCanvas();
