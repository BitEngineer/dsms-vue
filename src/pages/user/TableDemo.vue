<template>
    <div>
        <table-with-page :data="data" :columns="columns" :current="current" :total="total" :pageSize="pageSize" 
            @on-page-num-change="onPageNumChange"></table-with-page>
    </div>
</template>
<script>
export default {
    data() {
        return {
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '用户编码',
                    key: 'staffCode',
                },
                {
                    title: '用户姓名',
                    key: 'staffName'
                },
                {
                    title: '登录名',
                    key: 'loginName'
                },
                {
                    title: '身份证号',
                    key: 'idCardNo'
                },
                {
                    title: '性别',
                    key: 'sex'
                },
                {
                    title: '出生日期',
                    key: 'birthday'
                },
                {
                    title: '电话号码',
                    key: 'phone'
                },
                {
                    title: 'email',
                    key: 'email'
                },
                {
                    title: '地址',
                    key: 'address'
                },
            ],
            data: [],
            current: 1,
            total: 0,
            pageSize: 10
        }
    },
    mounted() {
        this.getUserData();
    },
    methods: {
        getUserData() {
            this.$axios.get('app/user/page?page=' + this.current + '&pageSize=' + this.pageSize)
            .then((response) => {
                this.data = response.data.data.records;
                this.total = response.data.data.total;
            })
            .catch(function(error){
                
            })
        },
        onPageNumChange(currentPageNum) {
            this.current = currentPageNum;
            this.getUserData();
        }
    }
}
</script>

