<template>
    <div>
        <el-card class="box-card">
            <div class="body">
                <div align="center">甜品制作</div>

                <el-col>
                    <el-button align="left" @click="onAddLine()">添加行数</el-button>
                </el-col>

                <el-table
                        :data="tableData"
                        style="width: 100%">
                    <el-table-column prop="dessertId" label="甜品ID">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.dessertId" placeholder="甜品ID"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="dessertFlowNum" label="制作数量">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.dessertFlowNum" placeholder="制作数量"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="dessertUnitPrice" label="甜品单价">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.dessertUnitPrice" placeholder="甜品单价"></el-input>
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
        name: "DessertsMake",
        data() {
            return {
                tableData: [],
            }
        },
        methods: {

            //添加行数
            onAddLine: function () {
                let newValue = {
                    dessertId: '',
                    dessertFlowNum: '',
                    dessertUnitPrice: ''
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
                let postModel = {
                    flowType: 1,
                    dessertFlowItemList: this.tableData,
                };

                this.$axios.post("/api/dessertFlow/createNewFlow", postModel).then(result => {
                    let res = result.data;
                    if (res.code === 0) {
                        this.$message("制作成功")
                    } else {
                        this.$message("制作失败")
                    }
                })

            }
        }
    }
</script>

<style scoped>
    @import "../../css/appindex.css";
</style>