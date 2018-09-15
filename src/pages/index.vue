<style scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
</style>
<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        <MenuItem name="1">
                            <Icon type="ios-navigate"></Icon>
                            Item 1
                        </MenuItem>
                        <MenuItem name="2">
                            <Icon type="ios-keypad"></Icon>
                            Item 2
                        </MenuItem>
                        <MenuItem name="3">
                            <Icon type="ios-analytics"></Icon>
                            Item 3
                        </MenuItem>
                        <MenuItem name="4">
                            <Icon type="ios-paper"></Icon>
                            Item 4
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <!-- Layout 下默认所有元素 text-align:center，该属性会继承 -->
            <Layout :style="{'text-align': 'left'}">
                <Sider hide-trigger :style="{background: '#fff'}">
                    <Menu active-name="1-1" theme="light" width="auto" :open-names="['1']"
                        @on-select="selectSiderMenu">
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="ios-navigate"></Icon>
                                系统管理
                            </template>
                            <MenuItem name="1-1">用户管理</MenuItem>
                            <MenuItem name="1-2">角色管理</MenuItem>
                            <MenuItem name="1-3">菜单管理</MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                视频
                            </template>
                            <MenuItem name="2-1">vue整合videojs演示</MenuItem>
                            <MenuItem name="2-2">动态切换数据源</MenuItem>
                            <MenuItem name="2-3">提示加载flash</MenuItem>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="ios-analytics"></Icon>
                                地图
                            </template>
                            <MenuItem name="3-1">Option 1</MenuItem>
                            <MenuItem name="3-2">Option 2</MenuItem>
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '0 24px 24px 24px'}">
                    <!-- <Breadcrumb :style="{margin: '24px 0'}">
                        <BreadcrumbItem>Home</BreadcrumbItem>
                        <BreadcrumbItem>Components</BreadcrumbItem>
                        <BreadcrumbItem>Layout</BreadcrumbItem>
                    </Breadcrumb> -->
                    <Layout :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                        <router-view/>
                    </Layout>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>
<script>
    export default {
        data: function() {
            return {

            }
        },
        methods: {
            selectSiderMenu: function(name) {
                if(name === '1-1') {
                    this.$router.push('/user');
                }else if(name === '2-1') {
                    this.$router.push('/video');
                }else if(name === '2-2') {
                    this.$router.push('/video1');
                }else if(name === '2-3') {
                    this.$router.push('/video2');
                }
            }
        }
    }
</script>