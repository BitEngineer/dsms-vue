<template>
    <div>
        <status-table ref='powerUnit' :powerList='powerList' :dateList='dateList' @on-status-cell-click="cellClick"></status-table>
        <Button type="primary" @click="getStatusMatrix">获取状态矩阵</Button>
    </div>
</template>
<script>
import DateTimeFragmentUtil from './DateTimeFragmentUtil'
import StatusTable from './status-table'
export default {
    components: {
        StatusTable
    },
    props: {
        // 电站id
        stationId: '',
        // 电站名称
        stationName: '',
        // 调度开始时间
        startDate: null,
        // 调度结束时间
        endDate: null
    },
    data() {
        return {
            powerList: ['机组1','机组2','机组3','机组4'],
            dateList: ['2018-10-01','2018-10-02','2018-10-03','2018-10-04','2018-10-05','2018-10-06',],
            // statusMatrix: [
            //     [1,1,1,1,1,0],
            //     [0,1,1,1,1,0],
            //     [0,1,1,1,1,1],
            //     [1,1,1,1,1,1],
            // ]
        }
    },
    mounted () {
        // console.log(this.formatDate(new Date()));
        // console.log(this.formatDate(new Date(2018,10,12,10,2,35,112)));
        // console.log(this.formatDate(new Date(2018,10,12,10,2,35)));
        // console.log(this.formatDate(new Date(2018,10,12)));
        // var dates = this.getDates(new Date(2018,10,12,2,8,35), new Date(2018,10,12,10,19,35), '15分');
        // var dates = this.getDates(new Date(2018,10,12,2,8,35), new Date(2018,10,12,10,19,35), '时');
        // var dates = this.getDates(new Date(2018,10,12,2,8,35), new Date(2018,11,13,10,19,35), '日');
        // var dates = this.getDates(new Date(2018,10,12,2,8,35), new Date(2020,3,25,10,19,35), '月');
        // var dates = DateTimeFragmentUtil.getDates(new Date(2018,10,12,2,8,35), new Date(2020,10,12,10,19,35), '年');
        // dates.forEach(item => {
        //     console.log(this.formatDate(item));
        // });
    },
    methods: {
        // formatDate(date) {
        //     return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate() + ' '
        //         + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '.' + date.getMilliseconds();
        // },
        getStatusMatrix() {
            let result = this.$refs.powerUnit.getStatusMatrix();
            console.log(result);
            return result;
        },
        cellClick(statusMatrix) {
            // this.updateSetting();
            // console.log(statusMatrix);
            
        },
        updateSetting() {
            let tableData = this.getStatusMatrix();
            let settingItem = {
                stationId: '',
                stationName: '电站1',
                powerUnitPlan: tableData
            };
            let exist = false;
            settingArr.forEach(item => {
                if(item.powerName === this.stationName) {
                    exist = true;
                }
            });
            if(!exist) {
                settingArr.push(settingItem);
            }else {
                for(let i=0; i<settingArr.length; i++) {
                    let item = settingArr[i];
                    if(item.powerName === this.stationName) {
                        settingArr[i] = settingItem;
                    }
                }
            }
        }
    }
}
</script>
<style>
    td,th {
        padding: 2px;
    }
</style>
