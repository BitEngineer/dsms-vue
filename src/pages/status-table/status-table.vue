<template>
    <div class='status-table-wrapper'>
        <table class='status-table'>
            <tr>
                <td><div class="td-content-wrapper">机组</div></td>
                <td v-for='(item, index) in dateList'><div class="td-content-wrapper">{{item}}</div></td>
            </tr>
            <tr v-for='(item, rowIndex) in powerList'>
                <td><div class="td-content-wrapper line-edit-block">{{item}}</div></td>
                <td v-for='(statusItem, columnIndex) in dateList'>
                    <status-cell ref='statusBlocks' :width='100' :height='30' @on-click="onClick"></status-cell></td>
            </tr>
        </table>
        <!-- <table class='status-table'>
            <tr>
                <td><div class="td-content-wrapper">机组</div></td>
                <td><div class="td-content-wrapper">2018-10-01</div></td>
                <td><div class="td-content-wrapper">2018-10-02</div></td>
                <td><div class="td-content-wrapper">2018-10-03</div></td>
                <td><div class="td-content-wrapper">2018-10-04</div></td>
            </tr>
            <tr> 
                <td><div class="td-content-wrapper">机组1</div></td>
                <td><status-block :width='100' :height='30'></status-block></td>
                <td><status-block :width='100' :height='30'></status-block></td>
                <td><status-block :width='100' :height='30'></status-block></td>
                <td><status-block :width='100' :height='30'></status-block></td>
                <td><status-block :width='100' :height='30'></status-block></td>
                <td><status-block :width='100' :height='30'></status-block></td>
            </tr>
        </table> -->
    </div>
</template>
<script>
import StatusCell from './status-cell.vue'
export default {
    components: {
      StatusCell,
    },
    props: {
        powerList: {
            type: Array
        },
        dateList: {
            type: Array
        },
        initStatusMatrix: [],
    },
    data() {
        return {
            statusMatrix: this.initStatusMatrix,
        }
    },
    methods: {
        getStatusMatrix() {
            var result = [];
            var rowNum = this.powerList.length;
            var columnNum = this.dateList.length;
            for(var i=0;i<this.powerList.length;i++) {
                var row = [];
                for(var j=0;j<this.dateList.length;j++) {
                    var id = i* columnNum + j;
                    var value = this.$refs.statusBlocks[id].getValue();
                    row.push(value);
                }
                result.push(row);
            }
            return result;
        },
        lineClick(rowIndex) {
            var result = [];
            var rowNum = this.powerList.length;
            var columnNum = this.dateList.length;
            for(var i=0;i<this.powerList.length;i++) {
                var row = [];
                if(i === rowIndex) {
                    for(var j=0;j<this.dateList.length;j++) {
                        row.push(0);
                    }
                }else {
                    for(var j=0;j<this.dateList.length;j++) {
                        var id = i* columnNum + j;
                        var value = this.$refs.statusBlocks[id].getValue();
                        row.push(value);
                    }
                }
                result.push(row);
            }
            this.statusMatrix = result;
            // this.$emit('on-status-line-click', result);
        },
        onClick(val) {
            this.$emit('on-status-cell-click', this.getStatusMatrix());
        }
    }
}
</script>
<style>
    .status-table-wrapper {
        width: 1000px;
        overflow: auto;
    }
    .status-table td {
        width: 100px !important;
        height: 30px !important;
        padding: 2px !important;
    }
    .status-table td .td-content-wrapper {
        display:block;
        width:100px;
        height:30px;
        line-height: 30px;
        text-align: center;
        background: #E0E0E0;
    }
    .status-table td .line-edit-block:hover{
        cursor: pointer;
    }
</style>

