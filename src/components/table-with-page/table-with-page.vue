<template>
    <div>
        <Table 
            :data="data" :columns="columns" :width="width" :height="height" :stripe="stripe" :border="border" :showHeader="showHeader" :highlightRow="highlightRow"
            :rowClassName="rowClassName" :context="context" :noDataText="noDataText" :noFilteredDataText="noFilteredDataText" :disabledHover="disabledHover"
            :loading="loading"></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :current="current" :total="total" :page-size="pageSize" :pageSizeOpts="pageSizeOpts" :placement="placement" :transfer="transfer"
                    :size="size" :simple="simple" :showTotal="showTotal" :showElevator="showElevator" :showSizer="showSizer" :className="className"
                    :styles="styles" :prevText="prevText" :nextText="nextText"
                    @on-change="onChange" @on-page-size-change="onPageSizeChange"></Page>
            </div>
        </div>
    </div>
</template>
<script>
import {oneOf} from '../../utils/common'
export default {
    props: {
        // table属性
        data: {
            type: Array,
            default() {
                return [];
            }
        },
        columns: {
            type: Array,
            default() {
                return [];
            }
        },
        width: {
            type: [Number, String]
        },
        height: {
            type: [Number, String]
        },
        stripe: {
            type: Boolean,
            default: false
        },
        border: {
            type: Boolean,
            default: false
        },
        showHeader: {
            type: Boolean,
            default: true
        },
        highlightRow: {
            type: Boolean,
            default: false
        },
        rowClassName: {
            type: Function,
            default () {
                return '';
            }
        },
        context: {
            type: Object
        },
        noDataText: {
            type: String
        },
        noFilteredDataText: {
            type: String
        },
        disabledHover: {
            type: Boolean
        },
        loading: {
            type: Boolean,
            default: false
        },

        // page属性
        current: {
            type: Number,
            default: 1
        },
        total: {
            type: Number,
            default: 0
        },
        pageSize: {
            type: Number,
            default: 10
        },
        pageSizeOpts: {
            type: Array,
            default () {
                return [10, 20, 30, 40];
            }
        },
        placement: {
            validator (value) {
                return oneOf(value, ['top', 'bottom']);
            },
            default: 'bottom'
        },
        transfer: {
            type: Boolean,
            // default () {
            //     return this.$IVIEW.transfer === '' ? false : this.$IVIEW.transfer;
            // }
            default: false
        },
        size: {
            validator (value) {
                return oneOf(value, ['small']);
            }
        },
        simple: {
            type: Boolean,
            default: false
        },
        showTotal: {
            type: Boolean,
            default: false
        },
        showElevator: {
            type: Boolean,
            default: false
        },
        showSizer: {
            type: Boolean,
            default: false
        },
        className: {
            type: String
        },
        styles: {
            type: Object
        },
        prevText: {
            type: String,
            default: ''
        },
        nextText: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            
        }
    },
    methods: {
        onChange(currentPageNum) {
            this.$emit("on-page-num-change", currentPageNum);
        },
        onPageSizeChange(currentPageSize) {
            this.$emit("on-page-size-change", currentPageSize);
        }
    }
}
</script>