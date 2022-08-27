const hourInput = document.getElementById('hour');
const minInput = document.getElementById('min');
const secInput = document.getElementById('sec');

const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');

startButton.addEventListener('click', () => {
   treatInputs(secInput, minInput, hourInput);

   if(hourInput.value == minInput.value == secInput.value == 0) {
      alert("Insert some time!")
   }else{
      disableInputs([secInput, minInput, hourInput]);
      changeButtons(startButton, stopButton);

      let timeLeft = (parseInt(secInput.value) + parseInt(minInput.value * 60) + parseInt(hourInput.value * 60 * 60));

      const timer = setInterval(() => {
         timeLeft--;
         const remainsTime = timeLeft > 0;
         if(remainsTime){
            const hours = Math.floor(timeLeft / 3600);
            const minutes = Math.floor((timeLeft / 60) % 60);
            const seconds = Math.floor(timeLeft % 60);
            setTime(hourInput, hours);
            setTime(minInput, minutes);
            setTime(secInput, seconds);
         }else{
            resetTimer();
         }
      }, 1000);

      stopButton.addEventListener('click', () => {
         resetTimer();
      });

      function resetTimer(){
         disableInputs([secInput, minInput, hourInput], false);
         changeButtons(stopButton, startButton);
         setTime(secInput, 0);
         setTime(minInput, 0);
         setTime(hourInput, 0);
         clearInterval(timer);
      }
   }
});

function disableInputs([...inputs], disable=true){
   for(const input of inputs){
      input.disabled = disable;
   }
}

function treatInputs(...inputs){
   for(let input of inputs){
      if(input.value <= 0){
         input.value = '00';
      }else{
         setTime(input, input.value);
      }
      if(input.value.length > 2){
         input.value = input.value.slice(0, 2);
      }
   }
}

function setTime(input, value){
   value < 10 ? 
   input.value = `0${value}` :
   input.value = value;
}

function changeButtons(oldButton, newButton){
   oldButton.style.display = 'none';
   newButton.style.display = 'inline-block';
}