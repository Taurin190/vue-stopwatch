<template>
  <div>
      <h1 >{{ msg }}</h1>
      <TimerDisplay v-on:load="start" :time="time" :isLarge="true" :showMilliSeconds="false" />
      <select name="timezone" v-model="selected">
          <option 
          v-for="(timeDiff, country) in timezones"
          :key="country"
          :value="timeDiff">{{ country }} UTC
          <span v-if="timeDiff > 0">+{{ timeDiff }}</span>
          <span v-else-if="timeDiff < 0">{{ timeDiff}}</span>
          <span v-else>±{{ timeDiff}}</span>
          </option>
      </select>
  </div>
</template>
<script>
import TimerDisplay from '@/components/TimerDisplay.vue'

export default {
  name: 'WorldWatch',
  props: {
    msg: String
  },
  components: {
      TimerDisplay
  },
  data () {
      return {
          time: 0,
          selected: 0,
          timeDifference: 0,
          timezones: {
              "イギリス": 0,
              "フランス": 1,
              "インド": 3.5,
              "シンガポール": 8,
              "日本": 9,
              "シカゴ": -6
          }
    }
  },
  mounted: function(){
      this.start()
  },
  methods: {
      start: function () {
          var vm = this;
          vm.isRunning = true;
          vm.time = Date.now() + vm.selected * (1000 * 60 * 60);
          (function loop(){
              vm.time = Date.now() % (1000 * 60 * 60 * 24);
              vm.time += vm.selected * (1000 * 60 * 60);
              if (vm.time < 0) {
                  vm.time += 1000 * 60 * 60 * 24;
              } 
              vm.time = vm.time % (1000 * 60 * 60 * 24)
              vm.animateFrame = requestAnimationFrame(loop);
          }());
      }
  },
  computed: {
      
  }
}
</script>
