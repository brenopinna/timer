const hourInput = document.getElementById('hour');
const minInput = document.getElementById('min');
const secInput = document.getElementById('sec');

const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');

startButton.addEventListener('click', () => {
   treatInputs(secInput, minInput, hourInput);
   
   if(hourInput.value == 0 && minInput.value == 0 && secInput.value == 0) {
      alert("Insert some time!")
   }else{
      disableInputs([secInput, minInput, hourInput]);
      changeButtons(startButton, stopButton);

      const timer = setInterval(() => {
         let seconds = parseInt(secInput.value);
         let minutes = parseInt(minInput.value);
         let hours = parseInt(hourInput.value);

         let remainsMinutes = minutes > 0;
         let remainsHours = hours > 0;
         let remainsSeconds = seconds > 0;
         let remainsTime = (remainsSeconds || remainsMinutes || remainsHours);

         if(remainsTime){
            if(seconds == 0){
               if(minutes == 0){
                  if(remainsHours){
                     hours--;
                     minutes = 59;
                  }
               }
               seconds = 59;
               if(remainsMinutes){
                  minutes--;
               }
            }else{
               seconds--;
            }
            setTime(secInput, seconds);
            setTime(minInput, minutes);
            setTime(hourInput, hours);
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
      if(input.value == 0){
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