let answer = document.querySelector('.answer');
let playBtn = document.querySelector('.playBtn');
let pauseBtn = document.querySelector('.pauseBtn');

function Timer() {
    this.workTiming = {
        minutes: 1,
        seconds: 10
    }
    this.breakTiming = {
        minutes: 1,
        seconds: 5
    }
    this.session = 1;
    this.workPlaying = true;
    this.workTime;
    this.breakTime;    
    this.test = function() {
        this.workTiming.seconds--;
        answer.innerHTML = this.workTiming.seconds;
    }
    this.startTimer = function() {
        if(this.workPlaying) {
           workTime =  setInterval(() => {
                this.Work(this.workTiming.seconds,this.workTiming.minutes,workTime);
            },1000)
        } else {
            breakTime = setInterval(() => {
               this.BreakTime(this.breakTiming.seconds,this.breakTiming.minutes,breakTime);
           })
        }
    }
    this.BreakTime = function(s,m,x) {
        if (this.breakTiming.seconds > 0) {
            this.breakTiming.seconds--;
        }
        if(this.breakTiming.seconds == 0 && this.breakTiming.minutes != 0) {
            this.breakTiming.minutes--;
            this.breakTiming.seconds = 5;
        }
        answer.innerHTML = leadingZeros(this.breakTiming.seconds) + ':' +  leadingZeros(this.breakTiming.minutes);
        
        if(this.breakTiming.seconds == 0 && this.breakTiming.minutes == 0) {
            answer.innerHTML = leadingZeros(m) + ':' +  leadingZeros(s);
            m = 1;
            s = 5;
            clearInterval(x);
            this.workPlaying = true;
            
            this.startTimer();
        }
        console.log('goodbye');
    }
    this.Work = function(s,m,x) {
       
        if(this.workTiming.seconds > 0) {
            this.workTiming.seconds--;
        
           
         }
      
      
         // this is when we go down a minute
         if(this.workTiming.seconds == 0 && this.workTiming.minutes != 0) {
            this.workTiming.minutes--;
             this.workTiming.seconds = 10;
         }
        
         answer.innerHTML =` ${leadingZeros(m) } : ${leadingZeros(s)} `
     
        
         // this is when we switch to break and then back
         if(m == 0 && s == 0) {
             answer.innerHTML = leadingZeros(m) + ':' +  leadingZeros(s);
             clearInterval(x);
             this.workTiming.minutes = 1;
             this.workTiming.seconds = 10;
             this.session++;
             // since I wanted it to end on work session I
             // made it last for 4 sessions here
             console.log('hello');
       
             if(this.session < 5) {
                 
             this.workPlaying = false;
             this.startTimer();
             } else {
                 console.log('we are done');
             }
         }
         
    }
    this.pause = function() {
        this.startTimer();
        console.log(this.workTime);
  
    }

}

function leadingZeros(y) {
    if( y < 10) {
        y = '0' + y;
    }
    return y;
 
}


let pomodoro = new Timer();
pomodoro.startTimer();



playBtn.addEventListener('click', () => {
    checkPlay();
 
 
  
    

})
pauseBtn.addEventListener('click', () => {
   pomodoro.pause();

})

