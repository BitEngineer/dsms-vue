<template>
    <div>
        <div>
            <Form ref="searchFormModel" :model="searchFormModel" inline>
                <FormItem prop="staffCode">
                    <Input type="text" v-model="searchFormModel.staffCode" placeholder="用户编码"></Input>
                </FormItem>
                <FormItem prop="staffName">
                    <Input type="text" v-model="searchFormModel.staffName" placeholder="用户名"></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="doSearch">查询</Button>
                    <Button type="primary" @click="doReset('searchFormModel')">重置</Button>
                </FormItem>
            </Form>
            <div class="table-tool-bar" style="margin:5px 0">
                <Button type="primary" @click="doAdd">新增</Button>
                <Button type="primary" @click="doEdit">修改</Button>
                <Button type="primary" @click="doDel">删除</Button>
            </div>
            <Table :data="userTableData" :columns="userTableColumns" stripe
                @on-selection-change="onSelectionChange"></Table>
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Page :total="total" :current="current" :page-size="pageSize" @on-change="changePage"></Page>
                </div>
            </div>
        </div>
        <div>
        <Modal
            v-model="userModal"
            :title="userOperation === 'add' ? '用户新增' : (userOperation === 'edit' ? '用户修改' : '用户查看')"
            :width="720"
            @on-ok="userModalCommit"
            @on-cancel="userModalCancel">
            <Form v-if="userOperation === 'add' || userOperation === 'edit'" ref="userFormData" :model="userFormData" inline label-position="right" :label-width="100">
                <row :gutter="16">
                    <Col span="11">
                        <FormItem prop="staffCode" label="用户编码">
                            <Input type="text" v-model="userFormData.staffCode" placeholder="用户编码"></Input>
                        </FormItem>
                    </Col>
                    <Col span="11">
                        <FormItem prop="staffName" label="用户姓名">
                            <Input type="text" v-model="userFormData.staffName" placeholder="用户名"></Input>
                        </FormItem>
                    </Col>
                </row>
                <row :gutter="16">
                    <Col span="11">
                        <FormItem prop="idCardNo" label="身份证号">
                            <Input type="text" v-model="userFormData.idCardNo" placeholder="身份证号"></Input>
                        </FormItem>
                    </Col>
                    <Col span="11">
                        <FormItem prop="sex" label="性别">
                            <RadioGroup v-model="userFormData.sex">
                                <Radio label="1">男</Radio>
                                <Radio label="0">女</Radio>
                            </RadioGroup>
                        </FormItem>
                    </Col>
                </row>
                <row :gutter="16">
                    <Col span="11">
                        <FormItem prop="birthday" label="出生日期">
                            <DatePicker type="date" v-model="userFormData.birthday" placeholder="出生日期"></DatePicker>
                        </FormItem>
                    </Col>
                    <Col span="11">
                        <FormItem prop="phone" label="电话号码">
                            <Input type="text" v-model="userFormData.phone" placeholder="电话号码"></Input>
                        </FormItem>
                    </Col>
                </row>
                <row :gutter="16">
                    <Col span="11">
                        <FormItem prop="email" label="email">
                            <Input type="text" v-model="userFormData.email" placeholder="emial"></Input>
                        </FormItem>
                    </Col>
                    <Col span="11">
                        <FormItem prop="address" label="地址">
                            <Input type="text" v-model="userFormData.address" placeholder="地址"></Input>
                        </FormItem>
                    </Col>
                </row>
            </Form>
        </Modal>
        </div>
    </div>
</template>
<script>
    import qs from 'qs'
    export default {
        data () {
            return {
                // table
                userTableData: [],
                userTableColumns: [
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
                // 表格选中数据项
                selections: [],
                // page
                total: 0,
                current: 1,
                pageSize: 10,
                searchParam: {},
                searchFormModel: {
                    staffCode: '',
                    staffName: ''
                },
                userModal: false,
                userOperation: '',
                userFormData: {}, 
            }
        },
        mounted: function() {
            this.requestUserTableData({}, this.current, this.pageSize);
        },
        methods: {
            requestUserTableData: function(searchParam, current, pageSize) {
                var requestParam = {
                    page: current,
                    pageSize: pageSize
                };
                Object.assign(requestParam, searchParam);
                // 原生axios的get方法，不能接受数据参数，参数必须跟在url后面
                // this.$axios.get('app/user/page', requestParam)
                this.$axios.get('app/user/page?' + qs.stringify(requestParam))
                // this.$axios.get('app/user/page')
                // https://blog.csdn.net/Dear_Mr/article/details/75734332
                // 写成箭头函数，才能访问vue的实例this
                // .then(function(response) {
                //     this.userTableData = response.data.data.rows;
                //     console.log(this.userTableData);
                // })
                .then((response) => {
                    this.userTableData = response.data.data.records;
                    this.total = response.data.data.total;
                    // this.$Message.success('查询成功');
                })
                .catch((error) => {
                    // this.$Message.error(error.response.status);
                    console.log(error);
                })
            },
            onSelectionChange(selections) {
                this.selections = selections;
            },
            changePage (currentPage) {
                this.current = currentPage;
                this.requestUserTableData({}, this.current, this.pageSize);
            },
            doSearch() {
                this.requestUserTableData(this.searchFormModel, this.current, this.pageSize);
            },
            doReset(name) {
                this.$refs[name].resetFields();
            },
            doAdd() {
                // 弹出窗口
                this.userModal = true;
                this.userOperation = 'add';
                this.userFormData = {};
            },
            doEdit() {
                if(this.selections.length === 0) {
                    return;
                }
                if(this.selections.length > 1) {
                    return;
                }
                this.userModal = true;
                this.userOperation = 'edit';
                this.userFormData = this.selections[0];
            },
            doDel() {

            },
            userModalCommit() {
                if(this.userOperation === 'add') {
                    var params = this.userFormData;
                    this.$axios.post('/app/user', this.userFormData).then(res => {

                    }).catch();
                }
            },
            userModalCancel() {
                if(this.userOperation === 'add') {
                    // 关闭弹窗
                    this.userModal = false;
                }
            }
        }
    }
</script>