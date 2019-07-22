<template>
  <div id="app">
    <TopPanel/>
    <Canvas/>
    <BottomPanel/>
  </div>
</template>

<script>
import TopPanel from "./components/TopPanel"
import BottomPanel from "./components/BottomPanel"
import Canvas from './components/Canvas'
export default {
  name: 'app',
  components: {
    TopPanel,
    BottomPanel,
    Canvas
  }
}
</script>

<style lang="scss">
@import "./reset.scss";
@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700,800');
#app {
  font-family: 'Open Sans', sans-serif;
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
}
</style>
