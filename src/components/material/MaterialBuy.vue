<template>
    <div>
        <el-card class="box-card">
            <div class="body">
                <div align="center">原料采购</div>
                    <div>
                        <div>
                            <el-form
                                    :model="mymodel"
                                    label-width="150px">
                                <el-form-item label="供应商编号:" prop="flowSupid">
                                    <el-input placeholder="请输入供应商编号"
                                              v-model="mymodel.flowSupid"
                                              style="width: 300px"
                                              clearable></el-input>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                <el-col>
                    <el-button align="left" @click="onAddLine()">添加行数</el-button>
                </el-col>

                <el-table
                        :data="tableData"
                        style="width: 100%">
                    <el-table-column prop="materialId" label="原料ID">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.materialId" placeholder="原料ID"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="materialFlowNum" label="采购数量">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.materialFlowNum" placeholder="采购数量"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="materialUnitPrice" label="原料单价">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.materialUnitPrice" placeholder="原料单价"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    type="danger"
                                    icon="el-icon-delete"
                                    @click="handleDelete(scope.$index,scope.row)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!--            确定和取消-->
        </el-card>
        <div align="center" >
            <el-button type="primary" @click="onSubmit()">确定</el-button>
            <el-button type="primary">取消</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MaterialBuy",
        data() {
            return {
                tableData: [],
                mymodel:{
                    flowSupid: ''
                }
            }
        },
        methods: {

            //添加行数
            onAddLine: function () {
                let newValue = {
                    materialId: '',
                    materialFlowNum: '',
                    materialUnitPrice: '',
                };
                //添加新的行数
                this.tableData.push(newValue);
            },

            //删除行数
            handleDelete: function (index, row) {
                this.tableData.splice(index, 1)
            },

            //响应确定按钮
            onSubmit: function () {
                const postModel = {
                    flowType: 3,
                    flowSupid:this.mymodel.flowSupid,
                    materialFlowItemList: this.tableData,
                };

                this.$axios.post("/api/materialFlow/createNewFlow", postModel).then(result => {
                    let res = result.data;
                    if (res.code === 0) {
                        this.$message("采购成功")
                    } else {
                        this.$message("采购失败")
                    }
                })

            }
        }
    }
</script>

<style scoped>
    @import "../../css/appindex.css";
</style>