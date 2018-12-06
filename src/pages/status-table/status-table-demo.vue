<template>
    <div class='status-table-wrapper'>
        <Select v-model="station" @on-change="stationChange" clearable>
          <Option value="1">小中甸</Option>
          <Option value="2">吉沙</Option>
        </Select>
        <status-table :powerList='powerList' :dateList='dateList'></status-table>
        <!-- <Button type="primary" @click="getStatusMatrix">获取状态矩阵</Button> -->
    </div>
</template>
<script>
import StatusTable from './status-table1.vue'
export default {
    components: {
      StatusTable,
    },
    data() {
        return {
          station: 1,
          powerList: ['机组1','机组2','机组3','机组4'],
          dateList: ['2018-10-01','2018-10-02','2018-10-03','2018-10-04','2018-10-05','2018-10-06',],
        }
    },
    methods: {
        // getStatusMatrix(){
        //     console.log(this.statusMatrix);
        // },
      stationChange(val) {
        if(val == 1) {
          this.powerList = ['机组1','机组2','机组3','机组4'];
          this.dateList = ['2018-10-01','2018-10-02','2018-10-03','2018-10-04','2018-10-05','2018-10-06',];
        }else if(val == 2) {
          this.powerList = ['机组1','机组2','机组3'];
          this.dateList = ['2018-10-01','2018-10-02','2018-10-03','2018-10-04','2018-10-05',];
        }
      }
    }
}
</script>

