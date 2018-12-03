<template>
  <div id="hot-preview">
    <HotTable ref="hotTable" :settings="settings"></HotTable>
    <button @click="loadNewData">Load new data!</button>
  </div>
</template>

<script>
  import { HotTable } from '@handsontable/vue'
  import 'handsontable/dist/handsontable.full.css'

  export default {
    data: function() {
      return {
        settings: {
          data: [
            ["", "Ford", "Volvo", "Toyota", "Honda"],
            ["2016", 10, 11, 12, 13],
            ["2017", 20, 11, 14, 13],
            ["2018", 30, 15, 12, 13]
          ],
          colHeaders: true,
          rowHeaders: true,
        }
      };
    },
    methods: {
      loadNewData() {
        this.$refs.hotTable.hotInstance.loadData([
          ["", "Ford", "Volvo", "Toyota", "Honda"],
          ["2016", 10, 11, 12, 13],
        ]);
      }
    },
    components: {
      HotTable
    }
  }
</script>

<!--
<style src="../node_modules/handsontable/dist/handsontable.full.css"></style>
<style>
  #test-hot {
    width: 600px;
    height: 400px;
    overflow: hidden;
  }
</style>
-->