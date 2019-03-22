<template>
  <div class="home">
    <WorldWatch msg="Welcome to World Watch App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import WorldWatch from '@/components/WorldWatch.vue'

export default {
  name: 'home',
  components: {
    WorldWatch
  }
}
</script>