<template>
    <div>
        <el-card class="box-card">
            <div align="left">甜品基本信息
                <el-button
                        size="mini"
                        type="primary"
                        @click="dialog.show = true">添加
                </el-button>
            </div>
            <el-divider></el-divider>
            <div align="left">查询甜品
                <div>
                    <el-form :inline="true"
                             ref="myfuzzy"
                             :model="queryDesserts"
                             :rules="myrulesfuzzy"
                             label-width="150px">
                        <el-form-item label="查询内容：" prop="param" required>
                            <el-input
                                    placeholder="请输入模糊查询的内容"
                                    v-model="queryDesserts.param"
                                    clearable>
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" size="mini" @click="onFuzzy('myfuzzy')">查询</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onFindDisable()">查询已禁用甜品</el-button>
                        </el-form-item>
                    </el-form>
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
                            v-if="show"
                            type="index"
                            align="center">
                    </el-table-column>
                    <el-table-column
                            prop="dessertId"
                            label="甜品编号"
                            align="center"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="dessertName"
                            label="甜品名称"
                            align="center"
                            width="300">
                    </el-table-column>
                    <el-table-column
                            prop="dessertBasePrice"
                            label="甜品单价"
                            align="center"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="dessertDetailsText"
                            label="甜品描述"
                            align="center"
                            width="300">
                    </el-table-column>
                    <el-table-column
                            prop="dessertAllNum"
                            label="甜品总数"
                            align="center"
                            width="100">
                    </el-table-column>

                    <!--                操作按钮-->
                    <el-table-column
                            label="操作"
                            align="center"
                            width="300">
                        <template slot-scope="scope">
                            <el-tooltip class="item" effect="light" content="修改甜品信息">
                                <el-button size="mini" plain type="primary" @click="onEdit(scope.$index)">修改</el-button>
                            </el-tooltip>
                            <el-tooltip class="item" effect="light" content="禁用甜品信息">
                                <el-button size="mini" plain type="primary" @click="onDisable(scope.$index)">禁用
                                </el-button>
                            </el-tooltip>
                            <el-tooltip class="item" effect="light" content="启用甜品信息">
                                <el-button size="mini" plain type="primary" @click="onEnable(scope.$index)">启用
                                </el-button>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>

        <!--        添加原料弹出的对话框-->
        <el-dialog
                width="80%"
                :title="dialog.title"
                :visible.sync="dialog.show"
                :close-on-click-modal="false"
                :close-on-press-escape="false"
                :modal-append-to-body="false">
            <div class="form">
                <!--                使用el-form组件进行数据添加和修改-->
                <el-form
                        ref="myform"
                        :model="mymodel"
                        :rules="myrulesAdd"
                        label-width="150px"
                        style="margin: 10px;width: auto">
                    <el-form-item hidden prop="dessertId" label="ID：">
                        <el-input type="string" v-model="mymodel.dessertId"></el-input>
                    </el-form-item>

                    <el-form-item label="甜品名称" required>
                        <el-col :span="15">
                            <el-form-item prop="dessertName">
                                <el-input type="string" v-model="mymodel.dessertName"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="甜品单价" required>
                        <el-col :span="15">
                            <el-form-item prop="dessertBasePrice">
                                <el-input type="string" v-model="mymodel.dessertBasePrice"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="甜品描述" required>
                        <el-col :span="15">
                            <el-form-item prop="dessertDetailsText">
                                <el-input type="string" v-model="mymodel.dessertDetailsText"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="甜品基数" required>
                        <el-col :span="15">
                            <el-form-item prop="dessertBaseNum">
                                <el-input type="string" v-model="mymodel.dessertBaseNum"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-form-item>

                    <el-form-item class="text-right">
                        <el-button type="primary" @click="onSubmitAdd('myform')">保存</el-button>
                        <el-button @click="dialog.show = false">取消</el-button>
                    </el-form-item>

                </el-form>
            </div>
        </el-dialog>

        <!--        修改原料信息对话框-->
        <el-dialog
                width="80%"
                :title="dialogEdit.title"
                :visible.sync="dialogEdit.show"
                :close-on-click-modal="false"
                :close-on-press-escape="false"
                :modal-append-to-body="false">
            <!--&lt;!&ndash;            使用el-form组件进行数据添加和修改&ndash;&gt;-->
            <el-form
                    ref="myformedit"
                    :model="myedit"
                    :rules="myrulesEdit"
                    label-width="150px"
                    style="margin: 10px;width: auto">

                <el-form-item hidden prop="dessertId" label="ID:">
                    <el-input type="string" v-model="myedit.dessertId"></el-input>
                </el-form-item>

                <el-form-item label="甜品名称" required>
                    <el-col :span="15">
                        <el-form-item prop="dessertName">
                            <el-input type="string" v-model="myedit.dessertName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>

                <el-form-item label="甜品单价">
                    <el-col :span="15">
                        <el-form-item prop="dessertBasePrice">
                            <el-input type="string" v-model="myedit.dessertBasePrice"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>

                <el-form-item label="甜品描述">
                    <el-col :span="15">
                        <el-form-item prop="dessertDetailsText">
                            <el-input type="string" v-model="myedit.dessertDetailsText"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>

                <el-form-item class="text_right">
                    <el-button type="primary" @click="onSubmitEdit('myformedit')">保存</el-button>
                    <el-button @click="dialogEdit.show = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "DessertsList",
        data() {
            return {
                show: false,
                tableData: [],
                queryDesserts: {
                    param: ''
                },
                selectItemIndex: -1,
                //控制添加对话框
                dialog: {
                    title: '添加甜品信息',
                    show: false
                },
                //控制修改对话框
                dialogEdit: {
                    title: '修改甜品信息',
                    show: false
                },
                mymodel: {
                    dessertId: '',
                    dessertName: '',
                    dessertBasePrice: '',
                    dessertDetailsText: '',
                    dessertAllNum: '',
                    enable: '',

                },
                myedit: {
                    dessertId: '',
                    dessertName: '',
                    dessertBasePrice: '',
                    dessertDetailsText: ''
                },
                myrulesAdd: {
                    dessertName: [
                        {required: true, message: '请输入原料名称', trigger: 'blur'},
                        {min: 1, max: 20, message: '长度在1到20个字符'}
                    ],

                    dessertBaseNum: [
                        {required: true, message: '请输入原料数量', trigger: 'blur'},
                        {min: 1, max: 20, message: '长度在1到20个字符'}
                    ],

                },

                myrulesEdit: {
                    dessertName: [
                        {required: true, message: '请输入原料名称', trigger: 'blur'},
                        {min: 1, max: 20, message: '长度在1到20个字符'}
                    ],
                },

                myrulesfuzzy: {
                    param: [
                        {required: true, message: '请输入甜品ID/甜品名称/甜品描述', trigger: 'blur'},
                        {min: 1, max: 20, message: '长度在1到20个字符'}
                    ]
                }
            }
        },

        mounted: function () {
            this.getData();
        },

        methods: {

            //数据库：从服务器获得数据，对甜品表格进行初始化
            getData() {
                this.$axios.post("/api/dessert/findAllDessert").then(res => {
                    this.tableData = res.data.data;
                });
            },

            //响应添加对话框中的保存按钮
            onSubmitAdd(formName) {
                //表单校验
                this.$refs[formName].validate((valid) => {
                    if (!valid) {
                        this.$message({
                            message: '输入项有错误',
                            type: 'error'
                        });
                        return false;
                    } else {
                        //添加，调用post请求
                        this.$axios.post("/api/dessert/createNewDessert", this.mymodel).then(res => {
                            //操作成功
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });

                            //更新table
                            this.tableData.push(res.data.data);
                            //关闭对话框
                            this.dialog.show = false;
                        });


                    }
                })
            },

            //响应禁用按钮
            onDisable: function (index) {
                this.$confirm('确认禁用改甜品信息吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //删除
                    this.mymodel = {
                        dessertId: this.tableData[index].dessertId,
                        enable: this.tableData[index].enable = false,
                    }
                    this.$axios.post("/api/dessert/enableDessert", this.mymodel).then(res => {
                        this.tableData.enable = false;
                    });
                })
            },

            //响应启用按钮
            onEnable: function (index) {
                this.$confirm('确认启用甜品信息吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.mymodel = {
                        dessertId: this.tableData[index].dessertId,
                        enable: this.tableData[index].enable = true,
                    }
                    this.$axios.post("/api/dessert/enableDessert", this.mymodel).then(res => {
                        this.tableData.enable = true;
                    });
                })
            },


            //响应修改按钮
            onEdit(index) {
                this.dialogEdit = {
                    show: true,
                    option: "edit"
                }
                //表单校验
                this.$nextTick(() => {
                    this.$refs['myformedit'].clearValidate();
                });
                //更新model数据
                this.myedit = {
                    dessertId: this.tableData[index].dessertId,
                    dessertName: this.tableData[index].dessertName,
                    dessertBasePrice: this.tableData[index].dessertBasePrice,
                    dessertDetailsText: this.tableData[index].dessertDetailsText
                }
                //设置哪一行被选中了
                this.selectItemIndex = index;
            },

            //响应修改中的保存按钮
            onSubmitEdit(formName) {
                //表单校验
                this.$refs[formName].validate((valid) => {
                    if (!valid) {
                        this.$message({
                            message: '输入项有错误！',
                            type: 'error'
                        });
                        return false;
                    } else {
                        this.$axios.post("/api/dessert/updateDessertInfo", this.myedit).then(res => {
                            this.$message({
                                message: '修改成功！',
                                type: 'success'
                            });
                            this.dialogEdit.show = false;
                        })
                    }
                })
            },

            //响应模糊查询按钮
            onFuzzy(formName) {
                this.$nextTick(() => {
                    this.$refs['myfuzzy'].clearValidate();
                });
                this.$axios.post("/api/dessert/findDessertByFuzzy", this.queryDesserts).then(res => {
                    this.$message('查询成功');
                    this.tableData = res.data.data;
                })
            },

            //查询已经被禁用的甜品
            onFindDisable(){
                this.$axios.post("/api/dessert/findAllDisableDessert").then(res => {
                    if (res.data.code == 0){
                        this.$message('查询成功');
                        this.tableData = res.data.data;
                    }
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