<template>
  <div>
      <h1>{{ msg }}</h1>
      <div><p class="watch">
          {{ hours }} : 
          {{ minutes | zeroPad }} : 
          {{ seconds | zeroPad}} : 
          {{ milliSeconds | zeroPad(3)}}
          </p>
      </div>
      <div>
          <button @click="startTimer" :disabled="isRunning">START</button>
          <button @click="lapTimer" >LAP</button>
          <button @click="stopTimer" :disabled="!isRunning">STOP</button>
          <button @click="resetTimer" :disabled="isRunning">RESET</button>
      </div>
      <div>
          <ul>
              <li v-for="(lap, index) in lapTimes" :key="lap.id">
                  <p>LAP {{ index + 1}}: 
                      {{ lap.hours }} : 
                      {{ lap.minutes | zeroPad }} : 
                      {{ lap.seconds | zeroPad}} : 
                      {{ lap.milliSeconds | zeroPad(3)}}
                      </p>
              </li>
          </ul>
      </div>
  </div>
</template>
<script>
export default {
  name: 'StopWatch',
  props: {
    msg: String
  },
  data () {
      return {
          time_str: "0 : 00 : 00 : 000",
          nowTime: 0,
          diffTime: 0,
          startTime: 0,
          stoppedTime: 0,
          isRunning: false,
          lapTimes: []
      }
  },
  methods: {
      startTimer: function() {
          console.log("START");
          var vm = this;
          vm.isRunning = true;
          vm.startTime = Math.floor(performance.now()) - this.stoppedTime;
          (function loop(){
              vm.nowTime = Math.floor(performance.now());
              vm.diffTime = vm.nowTime - vm.startTime;
              vm.animateFrame = requestAnimationFrame(loop);
          }());
      },
      lapTimer: function() {
          console.log("LAP");
          this.lapTimes.push({
              hours: this.hours,
              minutes: this.minutes,
              seconds: this.seconds,
              milliSeconds: this.milliSeconds
              })
      },
      stopTimer: function() {
          console.log("STOP");
          this.isRunning = false;
          this.stoppedTime = this.diffTime;
          cancelAnimationFrame(this.animateFrame);
      },
      resetTimer: function() {
          console.log("RESET");
          this.diffTime = 0
          this.stoppedTime = 0
          this.lapTimes = []
      }
  },
  computed: {
      hours() {
          return Math.floor(this.diffTime / 1000 / 60 / 60);
      },
      minutes() {
          return Math.floor(this.diffTime / 1000 / 60) % 60;
      },
      seconds() {
          return Math.floor(this.diffTime / 1000) % 60;
      },
      milliSeconds() {
          return Math.floor(this.diffTime % 1000);
      },
      classStart() {
          
      },
      classStop() {
          return {

          }
      },
      classReset() {
          
      }
  },
  filters: {
      zeroPad: function(value, num) {
          var num = typeof num !== 'undefined' ? num : 2;
          value = value.toString()
          return value.padStart(num, "0");
      }
  }
}
</script>
<style>
ul {
    list-style: none;
    padding-inline-start: 0;
}
.watch {
    font-size: 60px;
}
</style>
