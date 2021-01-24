const background = document.querySelector('.background');
const dino = document.querySelector('.dino');
const gameOver = document.querySelector('.game-over');
const gameOverPoints = document.querySelector('.game-over-points');
const restart = document.querySelector('.restart');
let isJumping = false;
let dinoPosition = 0;
let points = 0;
let intervalPoints;

function start() {
  const obstacles = document.getElementsByClassName('cactus');
  for(var i = 0; i< obstacles.length; i++){
    background.removeChild(obstacles[i]);
  }
  gameOver.classList.add('hide');
  gameOverPoints.classList.add('hide');
  restart.classList.add('hide');
  dino.classList.remove('hide');
  background.classList.remove('hide');
  points = 0;
  createObstacle(screen.width, 0);
  pointsCount();
}

function pointsCount() { 
  intervalPoints = setTimeout(()=>{
    points+=2;
    pointsCount();
  }, 100)
};

function handleKeyUp(event) {
  if(event.keyCode === 32 || event.keyCode === 38){
    if(dino.classList.contains('hide')){
      start();
    }
    else {
      if(!isJumping){
        jump();
      }
    }
  }
}

function jump(){
  isJumping = true;
  let upInterval = setInterval(() => {
    if (dinoPosition >= 200) {
      clearInterval(upInterval);

      //Descendo
      let donwInterval = setInterval(() => {
        if (dinoPosition === 0) {
          clearInterval(donwInterval);
          isJumping = false; 
        }
        else {
          dinoPosition -= 30;
          dino.style.bottom = dinoPosition +'px';
        }
      }, 20);
      
    }
    else{
      // Subindo
      dinoPosition += 30;
      dino.style.bottom = dinoPosition +'px';
    }
  }, 20);
}

function createObstacle(leftPosition, bottomPosition) {
  const obstacle = document.createElement('div');
  const randomTime = Math.random() * 6000;
  let obcstacleLeftPosition = leftPosition;

  obstacle.classList.add('cactus');
  obstacle.style.left = obcstacleLeftPosition + 'px';
  obstacle.style.bottom = bottomPosition + 'px';
  background.appendChild(obstacle);

  let leftInterval = setInterval(() => {
    if(obcstacleLeftPosition < -60){
      clearInterval(leftInterval);
      background.removeChild(obstacle);
    }
    else {
      if (obcstacleLeftPosition > 0 && obcstacleLeftPosition < 60 && dinoPosition < 60){
        background.removeChild(obstacle);
        background.classList.add('hide');
        dino.classList.add('hide');
        gameOver.classList.remove('hide');
        gameOverPoints.classList.remove('hide');
        restart.classList.remove('hide');
        clearInterval(leftInterval);
        clearInterval(intervalPoints);
        clearTimeout(interval);
        clearInterval();
        gameOverPoints.innerHTML = `${points} pontos`
      }
      else {
      obcstacleLeftPosition -= 10;
      obstacle.style.left = obcstacleLeftPosition + 'px';
      }
    }
  }, 20);

  const interval = setTimeout(() => {
    createObstacle(screen.width, 0);
  }, randomTime);
}

start();
document.addEventListener('keyup', handleKeyUp);