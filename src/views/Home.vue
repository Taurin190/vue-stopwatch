<template>
  <div class="home">
    <StopWatch msg="Welcome to Stop Watch App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import StopWatch from '@/components/StopWatch.vue'

export default {
  name: 'home',
  components: {
    StopWatch
  }
}
</script>
