<template>
    <div>
        <el-card class="box-card">
            <div align="left">甜品报表记录</div>
            <el-divider></el-divider>
            <div align="left">
                <div>查询条件：
                    <template>
                        <el-select v-model="value" placeholder="请选择查询方式" @change="selectWay">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <span>查询内容：</span>
                            <el-input

                                    style="width: 300px"
                                    v-if="value==1"
                                    v-model="mymodelid.flowId"
                                    placeholder="请输入报表ID"></el-input>
                            <el-input
                                    style="width: 300px"
                                    v-if="value==2"
                                    v-model="mymodeltype.flowType"
                                    placeholder="请输入报表类型"></el-input>
                        <el-button
                                v-if="value==1"
                                align="right"
                                size="mini" type="primary" @click="onFindById('myform')">查找
                        </el-button>
                        <el-button
                                v-if="value==2"
                                align="right"
                                type="primary"
                                @click="onFindByType('myform1')">查找
                        </el-button>

                    </template>
                </div>
            </div>
            <el-divider></el-divider>
            <div>
                <el-table
                        :data="tableData"
                        :stripe="true"
                        height="490"
                        style="width: 100%;"
                        :row-style="{height:'20px'}"
                        :cell-style="{padding:'0px'}">
                    <el-table-column
                            prop="flowId"
                            label="记录编号"
                            align="center"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="createdTime"
                            label="创建时间"
                            align="center"
                            width="300">
                    </el-table-column>
                    <el-table-column
                            prop="updateTime"
                            label="更新时间"
                            align="center"
                            width="300">
                    </el-table-column>
                    <el-table-column
                            prop="flowType"
                            label="类型"
                            align="center"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="allPrice"
                            label="总金额"
                            align="center"
                            width="250">
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
    </div>
</template>

<script>
    var va = 0
    export default {
        name: "DesForm",

        data() {
            return {
                tableData: [],
                mymodelid: {
                    flowId: '',
                },
                mymodeltype: {
                    flowType: '',
                },
                options: [{
                    value: 1,
                    label: '报表ID'
                }, {
                    value: 2,
                    label: '报表类型'
                }],
                value: ''
            }
        },

        mounted: function () {
            this.getFlow();
        },

        methods: {
            getFlow() {
                this.$axios.post("/api/dessertFlow/findAllDessertFlow").then(res => {
                    this.tableData = res.data.data;
                });
            },

            selectWay(id) {
                va = id;

            },

            onFindById(formName) {
                if (va == 1) {
                    this.$axios.post("/api/dessertFlow/findDessertFlowById", this.mymodelid).then(res => {
                        this.tableData = res.data.data;
                        if (res.data.data != null) {
                            this.$message("查询成功")
                        } else {
                            this.$message("查询失败")
                        }

                    })
                }

            },

            onFindByType(formName) {
                if (va == 2) {
                    this.$axios.post("/api/dessertFlow/findDessertFlowByType", this.mymodeltype).then(res => {
                        this.tableData = res.data.data;
                        if (res.data.data != null) {
                            this.$message("查询成功")
                        } else {
                            this.$message("查询失败")
                        }
                    })
                }
            }
        }

    }
</script>

<style scoped>
    .box-card {
        margin-top: 10px;
        margin-left: 10px;
        margin-right: 10px;
        height: auto;
    }
</style>