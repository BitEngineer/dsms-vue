<template>
    <div>
        <Table 
            :data="data" :columns="columns" :width="width" :height="height" :stripe="stripe" :border="border" :showHeader="showHeader" :highlightRow="highlightRow"
            :rowClassName="rowClassName" :context="context" :noDataText="noDataText" :noFilteredDataText="noFilteredDataText" :disabledHover="disabledHover" :loading="loading"
            @on-current-change="onCurrentChange"
            @on-select="onSelect"
            @on-select-cancel="onSelectCancel"
            @on-select-all="onSelectAll"
            @on-select-all-cancel="onSelectAllCancel"
            @on-selection-change="onSelectionChange"
            @on-sort-change="onSortChange"
            @on-filter-change="onFilterChange"
            @on-row-click="onRowClick"
            @on-row-dblclick="onRowDbclick"
            @on-expand="onExpand"></Table>
        <div v-if="pageable" style="display: flex;justify-content:space-around;border: 1px solid #dcdee2;border-top:0px;">
          <Page :current="current" :total="total" :page-size="pageSize" :pageSizeOpts="pageSizeOpts" :placement="placement" :transfer="transfer"
              :size="size" :simple="simple" :showTotal="showTotal" :showElevator="showElevator" :showSizer="showSizer" :className="className"
              :styles="styles" :prevText="prevText" :nextText="nextText"
              @on-change="onChange" @on-page-size-change="onPageSizeChange"></Page>
        </div>
    </div>
</template>
<script>
import {oneOf} from '../../js/common-utils.js'
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

        // 是否分页
        pageable: {
          type: Boolean,
          default: true
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
      // 表格相关事件
      onCurrentChange(currentRow, oldCurrentRow) {
        this.$emit("on-current-change", currentRow, oldCurrentRow);
      },
      onSelect(selection, row) {
        this.$emit("on-select", selection, row);
      },
      onSelectCancel(selection, row) {
        this.$emit("on-select-cancel", selection, row);
      },
      onSelectAll(selection) {
        this.$emit("on-select-all", selection);
      },
      onSelectAllCancel(selection) {
        this.$emit("on-select-all-cancel", selection);
      },
      onSelectionChange(selection) {
        this.$emit("on-selection-change", selection);
      },
      onSortChange(column, key, order) {
        this.$emit("on-sort-change", column, key, order);
      },
      onFilterChange(column) {
        this.$emit("on-filter-change", column);
      },
      onRowClick(row, index) {
        this.$emit("on-row-click", row, index);
      },
      onRowDbclick(row, index) {
        this.$emit("on-row-dbclick", row, index);
      },
      onExpand(row, status) {
        this.$emit("on-expand", row, status);
      },
      // 分页组件相关事件
      onChange(currentPageNum) {
        this.$emit("on-page-num-change", currentPageNum);
      },
      onPageSizeChange(currentPageSize) {
        this.$emit("on-page-size-change", currentPageSize);
      }
    }
}
</script>
