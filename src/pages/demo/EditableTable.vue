<template>
    <div>
        <editable-table :columns='columns' :value='value' editable></editable-table>
    </div>
</template>
<script>
import EditableTable from '../../components/iview-editable-table/tables'
export default {
    components: {
        EditableTable,
    },
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
                    editable: true
                },
                {
                    title: '用户姓名',
                    key: 'staffName'
                }
            ],
            value: [
                {staffCode: '1', staffName: 'dengjian'},
                {staffCode: '2', staffName: 'test'},
            ],
        }
    }
}
</script>

