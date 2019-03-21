<template>
  <div>
      <h1>{{ msg }}</h1>
      <TimerDisplay class="large-display" :time="time" :isLarge="true" />
      <div>
          <span>
            <label>Hours: </label>
            <input type="number" 
            v-model.number="hour_input"
            v-on:input="updateTime"
            :disabled="isRunning" />
          </span>
          <label>Minute: </label>
          <input type="number" 
          v-model.number="minute_input"
          v-on:input="updateTime"
          :disabled="isRunning" />
          <label>Second: </label>
          <input type="number" 
          v-model.number="second_input"
          v-on:input="updateTime"
          :disabled="isRunning" />
      </div>
      <button @click="countStart" 
      :disabled="!canStart || isRunning">START</button>
      <button @click="countStop" :disabled="!isRunning">STOP</button>
      <button @click="countClear" :disabled="!canStart || isRunning">CLEAR</button>
  </div>
</template>
<script>
import TimerDisplay from '@/components/TimerDisplay.vue'

export default {
  name: 'CountDown',
  props: {
    msg: String
  },
  components: {
      TimerDisplay
  },
  data() {
      return {
          isRunning: false,
          time: 0,
          originalTime: 0,
          hour_input: 0,
          minute_input: 0,
          second_input: 0,
          nowTime: 0,
          diffTime: 0,
          startTime: 0,
          stoppedTime: 0,
      }
  },
  methods: {
      countStart: function() {
          var vm = this;
          vm.isRunning = true;
          vm.originalTime = vm.time;
          vm.startTime = Math.floor(performance.now());
          (function loop(){
              vm.nowTime = Math.floor(performance.now());
              vm.diffTime = vm.nowTime - vm.startTime;
              vm.time = vm.originalTime - vm.diffTime;
              vm.animateFrame = requestAnimationFrame(loop);
          }());
      },
      countStop: function() {
          this.isRunning = false;
          cancelAnimationFrame(this.animateFrame);
      },
      countClear: function() {
          this.isRunning = false;
          this.hour_input = 0;
          this.minute_input = 0;
          this.second_input = 0;
          this.time = 0;
      },
      updateTime: function(num) {
          this.time = this.hour_input * 1000 * 60 * 60 
          + this.minute_input * 1000 * 60
          + this.second_input * 1000;
          
      }
  },
  computed: {
      canStart() {
          return (this.time > 0);
      }
  },
  filters: {
      zeroPad: function(value, num) {
          var num = typeof num !== 'undefined' ? num : 2;
          value = value.toString()
          return value.padStart(num, "0");
      }
  },
  watch: {
      time(value, oldValue) {
          if (value <= 0 && this.isRunning) {
              this.isRunning = false;
              cancelAnimationFrame(this.animateFrame);
              this.hour_input = 0;
              this.minute_input = 0;
              this.second_input = 0;
              this.time = 0;
              alert("Time Over!");
          }
      }
  }
}
</script>