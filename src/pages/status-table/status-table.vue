<template>
    <div class='status-table-wrapper'>
        <table class='status-table'>
            <tr>
                <td><div class="td-content-wrapper">机组</div></td>
                <td v-for='(item, index) in dateList' :key='index'><div class="td-content-wrapper">{{item}}</div></td>
            </tr>
            <tr v-for='(item, rowIndex) in powerList' :key='rowIndex'>
                <td><div class="td-content-wrapper line-edit-block" @click="lineClick(rowIndex)">{{item}}</div></td>
                <td v-for='(statusItem, columnIndex) in dateList' :key='columnIndex'>
                    <status-cell ref='statusBlocks' v-model='statusMatrix[rowIndex][columnIndex]' :width='100' :height='30'></status-cell></td>
            </tr>
        </table>
        <Button type="primary" @click="getStatusMatrix">获取状态矩阵</Button>
    </div>
</template>
<script>
import StatusCell from './status-cell.vue'
export default {
    components: {
      StatusCell,
    },
    data() {
        return {
            powerList: ['机组1','机组2','机组3','机组4'],
            dateList: ['2018-10-01','2018-10-02','2018-10-03','2018-10-04','2018-10-05','2018-10-06',],
            statusMatrix: [
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
            ],
        }
    },
    methods: {
        getStatusMatrix(){
            console.log(this.statusMatrix);
        },
        lineClick(rowNum) {
            for(let i=0; i<this.statusMatrix.length; i++) {
                if(rowNum === i) {
                    for(let j=0; j<this.statusMatrix[i].length; j++) {
                        // this.statusMatrix[i][j] = 0;
                        this.$set(this.statusMatrix[i], j, 0);
                    }
                }
            }
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

