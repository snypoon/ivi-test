const hover = function () {
  var wrapper = document.querySelector('.wrapper');
  var diamond = document.querySelector('.diamond__inner');
  diamond.addEventListener('mouseover', (e) => {
    wrapper.classList.add('wrapper__active');
  });
  
  diamond.addEventListener('mouseout', (e) => {
    wrapper.classList.remove('wrapper__active');
  });
}
hover();

const timer = function () {
  var diamondText = document.querySelector('.diamond__text');
  var diamond = document.querySelector('.diamond__inner');
  var timeInterval;
  var count = 0;
  
  diamond.addEventListener('click', function (){
    timeInterval = setInterval(() => {
      count += 1;
      diamondText.innerHTML = count;
      
      if (count === 4) {
        clearInterval(timeInterval);
        count = 0;
        diamondText.innerHTML = 'Go!'
      }
    }, 1000);
  })
}
timer();