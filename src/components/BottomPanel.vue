<template>
  <div class="bottom-panel" :class="{isHide:isHide}">
    <div class="panel-inner">
      <div class="brush-btn" :class="{active:mode==='draw'}" @click="changeMode('draw')">
        <i class="material-icons">brush</i>
      </div>
      <div class="eraser-btn" :class="{active:mode==='eraser'}" @click="changeMode('eraser')">
        <i class="material-icons">crop_portrait</i>
      </div>
      <div class="size-selector">
        SIZE:
        <input type="number" min="1" max="100" v-model="brushSize">
        px
      </div>
      <div class="color-selector">
        COLOR:
        <ul class="colors">
          <li
            v-for="(color,index) in defaultColor"
            :key="index"
            :style="color=='#FFFFFF'?{backgroundColor:color,border:`2px solid #000`}:{backgroundColor:color}"
            @click="setColor(color)"
          >
            <i
              class="material-icons"
              v-if="currentColor==color"
              :class="{white:color== '#000000'}"
            >check</i>
          </li>
          <li @click="$refs.colorInput.click()" :style="{backgroundColor:selectedColor}">
            <i class="material-icons">palette</i>
            <input type="color" name id hidden ref="colorInput" @change="selectColor"> 
          </li>
        </ul>
      </div>
    </div>
    <div class="hide-btn" @click.prevent="isHide=!isHide" :class="{isHide:isHide}">
      <i class="material-icons" v-if="!isHide">keyboard_arrow_down</i>
      <i class="material-icons" v-else>brush</i>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "BottomPanel",
  data() {
    return {
      defaultColor: ["#FFFFFF", "#000000", "#9BFFCD", "#00CC99", "#01936F"],
      selectedColor:"#e8e8e8",
      isHide: false
    };
  },
  methods: {
    setColor(color) {
      if (this.mode === "draw") {
        this.$store.dispatch("changeColor", color);
      }
    },
    changeMode(mode) {
      this.$store.dispatch("changeMode", mode);
    },
    selectColor(e){
      this.selectedColor = e.target.value
      this.setColor(e.target.value)
    }
  },
  computed: {
    ...mapGetters(["currentColor", "mode"]),
    brushSize: {
      get() {
        return this.$store.getters.brushSize;
      },
      set(value) {
        console.log(value);
        this.$store.commit("BRUSHSIZE", value);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.bottom-panel {
  height: 80px;
  padding: 0px 42px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 40px;
  border-radius: 50px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.16);
  font-size: 20px;
  font-weight: 700;
  transition: all 0.3s;
  &.isHide {
    transform: translate(-50%, 148px);
  }
}
.panel-inner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  & > div:not(:last-child) {
    height: 48px;
    line-height: 48px;
  }
}
.brush-btn,
.eraser-btn {
  cursor: pointer;
  i {
    font-size: 48px;
  }
  &.active {
    background-color: #e8e8e8;
    border-radius: 10px;
  }
}
.eraser-btn {
  margin-right: 40px;
}
.size-selector {
  display: flex;
  margin-right: 40px;
  input {
    font-size: 20px;
    width: 74px;
    height: 100%;
    font-weight: 700;
    background-color: #e8e8e8;
    margin: 0 2px;
    outline: none;
    border: none;
    border-radius: 24px;
    text-align: center;
    &[type="number"]::-webkit-inner-spin-button,
    &[type="number"]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
}
.color-selector {
  display: flex;
  align-items: center;
  ul {
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    margin-left: 16px;
  }
  li {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    margin: 0 2px;
    cursor: pointer;
    position: relative;
  }
  i {
    pointer-events: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    &.white {
      color: #fff;
    }
  }
}
.hide-btn {
  position: absolute;
  top: -28px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #fff;
  cursor: pointer;
  z-index: -1;
  transition: all 0.5s;
  &.isHide {
    top: -148px;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.16);
    i {
      top: 16px;
    }
  }
  i {
    position: absolute;
    top: 4px;
    left: 16px;
  }
}
</style>
