<template>
  <div class="about">
    <CountDown msg="Welcome to Count Down App" />
  </div>
</template>
<script>
import CountDown from '@/components/CountDown.vue'

export default {
  name: 'about',
  components: {
    CountDown
  }
}
</script>