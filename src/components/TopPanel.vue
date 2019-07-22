<template>
  <div class="top-panel" :class="{isHide:isHide}">
    <div class="btn-container">
      <div class="btn save-btn" @click="save">
        <i class="material-icons">save</i>SAVE
      </div>
      <div class="btn addphoto-btn" @click="$refs.uploadInput.click()">
        <i class="material-icons">add_photo_alternate</i>PHOTO
        <input
          type="file"
          hidden
          accept="image/jpeg, image/png"
          ref="uploadInput"
          @change="uploadFile()"
        >
      </div>
      <div class="btn clear-btn" @click="changeAllClear">
        <i class="material-icons">crop_free</i>CLEAR ALL
      </div>
      <div class="btn undo-btn" :class="{disable:step===0}" @click="undo">
        <i class="material-icons">undo</i>UNDO
      </div>
      <div class="btn redo-btn" :class="{disable:step===records.length-1||step===0}" @click="redo">
        <i class="material-icons">redo</i>REDO
      </div>
    </div>
    <div class="hide-btn" @click.prevent="isHide=!isHide">
      <i class="material-icons" v-if="!isHide">keyboard_arrow_up</i>
      <i class="material-icons" v-else>keyboard_arrow_down</i>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TopPanel",
  data() {
    return {
      isHide: false
    };
  },
  computed: {
    ...mapGetters(["step", "records"])
  },
  methods: {
    changeAllClear() {
      this.$store.commit("CLEARALL", true);
    },
    save() {
      this.$store.commit("SAVE", true);
    },
    undo() {
      this.$store.commit("UNDO", true);
    },
    redo() {
      this.$store.commit("REDO", true);
    },
    uploadFile() {
      this.$store.commit("UPLOAD",true)
      const file = this.$refs.uploadInput.files[0];
      const vm = this
      if (file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function() {
          vm.$store.commit("STEP", vm.step + 1);
          vm.$store.dispatch("updateRecords", {step:vm.step,data:reader.result});
          vm.$store.commit("UPLOADFILE",reader.result);
        };
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.top-panel {
  width: 100%;
  height: 80px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 100;
  transition: all 0.5s;
  &.isHide {
    transform: translateY(-80px);
  }
}
.btn-container {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  height: 100%;
}
.btn {
  color: #000;
  font-size: 20px;
  padding: 10px;
  line-height: 27px;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 20px;
  cursor: pointer;
  &:last-child {
    margin-right: 0px;
  }
  i {
    font-size: 48px;
    pointer-events: none;
  }
  &:hover{
    background-color: #e8e8e8;
    border-radius: 10px;
    transition: all .5s;
  }
}
.hide-btn {
  position: absolute;
  bottom: -28px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #fff;
  cursor: pointer;
  i {
    position: absolute;
    bottom: 4px;
    left: 16px;
  }
}
.undo-btn.disable,
.redo-btn.disable {
  pointer-events: none;
}
</style>