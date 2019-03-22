<template>
  <div>
      <h1>{{ msg }}</h1>
      <TimerDisplay :time="time" :isLarge="true" />
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
          time: 0
    }
  },
  computed: {
      
  }
}
</script>
