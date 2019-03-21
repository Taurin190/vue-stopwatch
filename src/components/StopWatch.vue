<template>
  <div>
      <h1>{{ msg }}</h1>
      <TimerDisplay class="large-display" :time="diffTime" :isLarge="true" />
      <div>
          <button @click="startTimer" :disabled="isRunning">START</button>
          <button @click="lapTimer" >LAP</button>
          <button @click="stopTimer" :disabled="!isRunning">STOP</button>
          <button @click="resetTimer" :disabled="isRunning">RESET</button>
      </div>
      <div>
          <ul>
              <li v-for="(lap, index) in lapTimes" :key="lap.id">
                  <p>LAP{{ index + 1}}  
                      <TimerDisplay :time="lap.time" :isLarge="false" />
                  </p>
              </li>
          </ul>
      </div>
  </div>
</template>
<script>
import TimerDisplay from '@/components/TimerDisplay.vue'

export default {
  name: 'StopWatch',
  props: {
    msg: String
  },
  components: {
      TimerDisplay
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
              time: this.diffTime
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
      },
      updateTimeStr: function(timeText) {
          time_str = timeText;
      }
  }
}
</script>
<style>
ul {
    list-style: none;
    padding-inline-start: 0;
}
</style>
