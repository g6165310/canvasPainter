<template>
  <div>
    <canvas ref="canvas"></canvas>
    <div class="point" :style="pointStyle"></div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "Canvas",
  data() {
    return {
      canvas: null,
      ctx: null,
      isDrawing: false,
      position: { lastX: 0, lastY: 0 },
      pointStyle: {
        top: "0px",
        left: "0px",
        backgroundColor: "#000000",
        width: "20px",
        height: "20px"
      }
    };
  },
  methods: {
    init() {
      this.canvas = this.$refs.canvas;
      this.ctx = this.canvas.getContext("2d");
      this.canvas.height = window.innerHeight;
      this.canvas.width = window.innerWidth;
      this.ctx.lineJoin = "round";
      this.ctx.lineCap = "round";
      this.ctx.fillStyle = "#e8e8e8";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      if (this.clearAll) {
        this.$store.commit("STEP", -1);
      }
      this.saveRecord();
    },
    draw(e) {
      if (!this.isDrawing) {
        return;
      }
      const vm = this;
      this.ctx.beginPath();
      this.ctx.moveTo(this.position.lastX, this.position.lastY);
      this.ctx.lineTo(e.offsetX, e.offsetY);
      this.ctx.strokeStyle = this.currentColor;
      this.ctx.lineWidth = this.brushSize;
      this.ctx.stroke();
      this.position.lastX = e.offsetX;
      this.position.lastY = e.offsetY;
    },
    saveRecord() {
      this.$store.commit("STEP", this.step + 1);
      console.log(this.records);
      this.$store.dispatch("updateRecords", {
        step: this.step,
        data: this.canvas.toDataURL()
      });
    },
    setPosition(e) {
      this.isDrawing = true;
      this.position = {
        lastX: e.offsetX,
        lastY: e.offsetY
      };
    },
    mouseMove(e) {
      if (this.isDrawing) {
        this.draw(e);
      }
      this.pointStyle.top = `${e.clientY - this.brushSize / 2}px`;
      this.pointStyle.left = `${e.clientX - this.brushSize / 2}px`;
      this.pointStyle.backgroundColor = this.currentColor;
      this.pointStyle.width = `${this.brushSize}px`;
      this.pointStyle.height = `${this.brushSize}px`;
    },
    mouseup() {
      this.isDrawing = false;
      this.saveRecord();
    },
    clear() {
      this.ctx.fillStyle = "#e8e8e8";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    },
    resize() {
      this.canvas.height = window.innerHeight;
      this.canvas.width = window.innerWidth;
    }
  },
  computed: {
    ...mapGetters([
      "currentColor",
      "brushSize",
      "clearAll",
      "isSaving",
      "isUndo",
      "isRedo",
      "records",
      "step",
      "isUploading",
      "uploadFile",
      "mode"
    ])
  },
  watch: {
    clearAll: function(newValue) {
      if (newValue) {
        this.init();
        this.$store.commit("CLEARALL", false);
      }
    },
    mode:function(newValue){
      if(newValue==="eraser"){
        this.$store.dispatch("changeColor", "#e8e8e8");
      }else{
        this.$store.dispatch("changeColor", "#000000");
      }
    },
    isSaving: function(newValue) {
      if (newValue) {
        let image = this.canvas.toDataURL();
        let link = document.createElement("a");
        link.href = image;
        link.download = "image.png";
        link.click();
        this.$store.commit("SAVE", false);
      }
    },
    isUndo: function(newValue) {
      const vm = this;
      if (newValue && this.step > 0) {
        this.$store.commit("STEP", this.step - 1);
        let canvasPic = new Image();
        canvasPic.src = this.records[this.step];
        canvasPic.onload = function() {
          vm.ctx.drawImage(canvasPic, 0, 0);
        };
        this.$store.commit("UNDO", false);
      }
    },
    isRedo: function(newValue) {
      const vm = this;
      console.log("here");
      if (newValue && this.step > 0) {
        this.$store.commit("STEP", this.step + 1);
        let canvasPic = new Image();
        console.log(this.records, this.step);
        canvasPic.src = this.records[this.step];
        canvasPic.onload = function() {
          vm.ctx.drawImage(canvasPic, 0, 0);
        };
        this.$store.commit("REDO", false);
      }
    },
    uploadFile: function(newValue) {
      let canvasPic = new Image();
      const vm = this;
      canvasPic.src = newValue;
      canvasPic.onload = function() {
        let x = window.innerWidth / 2 - canvasPic.width / 2;
        let y = window.innerHeight / 2 - canvasPic.height / 2;
        console.log(x, y);
        vm.ctx.drawImage(canvasPic, x, y);
      };
      this.$store.commit("UPLOAD", false);
    }
  },
  mounted() {
    const vm = this;
    this.init();
    this.canvas.addEventListener("mousemove", this.mouseMove);
    this.canvas.addEventListener("mousedown", this.setPosition);
    this.canvas.addEventListener("mouseup", this.mouseup);
    //window.addEventListener("resize",this.resize)
  }
};
</script>
<style lang="scss" scoped>
.point {
  position: absolute;
  background-color: #000;
  border-radius: 50%;
  pointer-events: none;
}
</style>
