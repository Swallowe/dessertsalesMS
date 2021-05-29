<template>
    <div>

        <el-card class="box-card">
            <div align="center">销售记录</div>
            <el-divider></el-divider>
            <div>
                <el-table
                        :data="tableData"
                        :stripe="true"
                        height="380"
                        style="width: 100%;"
                        :row-style="{height:'20px'}"
                        :cell-style="{padding:'0px'}">
                    <el-table-column
                            prop="flowId"
                            label="记录编号"
                            align="center"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="createdTime"
                            label="记录时间"
                            align="center"
                            width="350">
                    </el-table-column>
                    <el-table-column
                            prop="dessertName"
                            label="甜品名称"
                            align="center"
                            width="250">
                    </el-table-column>
                    <el-table-column
                            prop="dessertFlowNum"
                            label="销售数量"
                            align="center"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="allPrice"
                            label="销售金额"
                            align="center"
                            width="250">
                    </el-table-column>
                </el-table>
            </div>

            <div >
                <el-form label-width="150px">
                    <el-row>
                        <el-col :span="15">
                            <el-form-item
                                    align="left"
                                    label-width="150px"
                                    label="今日销售总金额："
                                    style="width: 400px">
                                <el-col :span="15">
                                    <el-form-item>
                                        <el-input :readonly="true" v-model="myform.todayPrice"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-form-item>
                        </el-col>
                        <el-col :span="15">
                            <el-form-item
                                    align="right"
                                    label="今月销售总金额："
                                    style="width: 400px">
                                <el-col :span="15">
                                    <el-form-item>
                                        <el-input :readonly="true" v-model="myform.monthPrice"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </el-card>


    </div>
</template>

<script>
    export default {
        name: "SaleList",
        data() {
            return {
                tableData: [],
                mymodel: {
                    flowId: '',
                    createdTime: '',
                    dessertName: '',
                    dessertFlowNum: '',
                    allPrice: '',

                },
                myform: {
                    todayPrice: '',
                    monthPrice: ''
                }
            }
        },

        mounted() {
            this.getFlow();
        },

        methods: {
            getFlow() {
                this.$axios.post("/api/dessertFlow/findSaleDessertFlow").then(res => {
                    this.tableData = res.data.data;
                });

                this.$axios.post("/api/dessertFlow/isSameDate").then(res1 => {
                    this.myform = res1.data.data;
                })
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