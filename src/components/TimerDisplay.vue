<template>
<div>
    <p :class="{watch : isLarge}">
        {{ hours}} : 
        {{ minutes | zeroPad }} : 
        {{ seconds | zeroPad}}
        <span v-if="showMilliSeconds"> : {{ milliSeconds | zeroPad(3)}}</span>
    </p>
</div>
</template>
<script>
export default {
    name: 'TimerDisplay',
    props: {
        time: Number, 
        isLarge: Boolean, 
        showMilliSeconds: {
            type: Boolean,
            default: true
        }
    },
    computed: {
      hours() {
          return Math.floor(this.time / 1000 / 60 / 60);
      },
      minutes() {
          return Math.floor(this.time / 1000 / 60) % 60;
      },
      seconds() {
          return Math.floor(this.time / 1000) % 60;
      },
      milliSeconds() {
          return Math.floor(this.time % 1000);
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
.watch {
    font-size: 60px;
}
</style>