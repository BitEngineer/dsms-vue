<template>
    <div>
        <table-with-page :data="data" :columns="columns" :current="1" :total="2" @on-page-num-change="onPageNumChange"></table-with-page>
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
                    }
            ],
            data: [
                {
                    staffCode: '1001',
                    staffName: 'test1'
                },
                {
                    staffCode: '1002',
                    staffName: 'test2'
                }
            ]
        }
    },
    methods: {
        onPageNumChange() {

        }
    }
}
</script>

