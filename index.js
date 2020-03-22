const Victor = require('victor');
const Color = require('color');

const raf = requestAnimationFrame
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

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

  const startRadius = 40;
  
  
  const maxLevel = 130;
  const xMod = 13;
  const yMod = 13;
  const rotationMod = 5.5;
  const scaleModifier = 0.967;
  const startColor = Color({r: 0, g: 255, b: 0});
  const colorModifier = 5;

  const locationVector = new Victor(innerWidth / 2, innerHeight / 2);

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

      raf(() => drawRecursiveCircle(newScale, newRotation - 90, newLocation, newLevel, newColor));
    }

    if (newLevel > 0) {
      raf(() => drawRecursiveCircle(newScale, newRotation, newLocation, newLevel, newColor));
    }
  };

  raf(() => {
    drawRecursiveCircle(1, 180, locationVector, maxLevel, startColor);
    drawRecursiveCircle(1, 90, locationVector, maxLevel, startColor);
    drawRecursiveCircle(1, 0, locationVector, maxLevel, startColor);
    drawRecursiveCircle(1, -90, locationVector, maxLevel, startColor);
  });
};


const resizeCanvas = () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
};

draw();

window.addEventListener('resize', resizeCanvas, false);
resizeCanvas();
