<template>
  <div style='display:block;text-align:center' class='status-block' 
    :style='{width: width+"px", height: height+"px", lineHeight: height+"px", background: backcolor}'
    @click="onClick">
    {{text}}
  </div>
</template>
<script>
export default {
  props: {
    width: {
      type: String|Number,
      default: 100,
    },
    height: {
      type: String|Number,
      default: 20,
    },
    // prop值不应该在组件内部改变--单向数据流
    // value: {
    //   type: Number,
    //   default: 1
    // },
    initValue: {
      type: Number,
      default: 1
    },
    valueMap: {
      type: Array,
      default: function() {
        return [{
          value: 0,
          text: '不可用',
          backcolor: '#ff9980'
        }, {
          value: 1,
          text: '可用',
          backcolor: '#80ffbf'
        }]
      }
    }
  },
  data() {
    return {
      value: this.initValue,
    }
  },
  computed: {
    // backcolor: function() {
    //     this.valueMap.forEach(e => {
    //         if(this.value == e.value) {
    //             return e.backcolor;
    //         }
    //     });
    // },
    // text: function() {
    //     this.valueMap.forEach(e => {
    //         if(this.value == e.value) {
    //             return e.text;
    //         }
    //     });
    // }

    // 上面的代码不生效，可能与forEach的特性有关，return必须放在forEach外面

    backcolor: function() {
      var backcolor = '';
      this.valueMap.forEach(e => {
        if(this.value == e.value) {
          backcolor = e.backcolor;
        }
      });
      return backcolor;
    },
    text: function() {
      var text = '';
      this.valueMap.forEach(e => {
        if(this.value == e.value) {
            text = e.text;
        }
      });
      return text;
    }
  },
  watch: {
  },
  mounted() {
  },
  methods: {
    onClick() {
      if(this.value == 0) {
        this.value = 1;
        this.$emit('on-click', this.value);
        return;
      }
      if(this.value == 1) {
        this.value = 0;
        this.$emit('on-click', this.value);
        return;
      }
    },
    getValue() {
      return this.value;
    }
  }
}
</script>
<style>
  .status-block:hover {
      cursor: pointer;
  }
</style>
