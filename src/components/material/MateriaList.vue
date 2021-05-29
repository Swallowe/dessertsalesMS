<template>
    <div>
        <el-card class="box-card">
            <div align="left">原料基本信息
                <el-button
                        size="mini"
                        type="primary"
                        @click="dialog.show = true">添加
                </el-button>
            </div>
            <el-divider></el-divider>
            <div align="left">查询原料
                <div>
                    <el-form :inline="true"
                             ref="myfuzzy"
                             :model="queryMaterial"
                             :rules="myrulesfuzzy"
                             label-width="150px">
                        <el-form-item align="left" label="查询内容：" prop="param" required>
                            <el-input
                                    placeholder="请输入模糊查询的内容"
                                    v-model="queryMaterial.param"
                                    clearable>
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" size="mini" @click="onFuzzy('myfuzzy')">查询</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onFindDisable()">查询已禁用原料</el-button>
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
                            prop="materialId"
                            label="原料编号"
                            align="center"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="materialName"
                            label="原料名称"
                            align="center"
                            width="300">
                    </el-table-column>
                    <el-table-column
                            prop="materialBasePrice"
                            label="原料单价"
                            align="center"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="materialDetailsText"
                            label="原料描述"
                            align="center"
                            width="300">
                    </el-table-column>
                    <el-table-column
                            prop="materialAllNum"
                            label="原料总数"
                            align="center"
                            width="100">
                    </el-table-column>

                    <!--                操作按钮-->
                    <el-table-column
                            label="操作"
                            align="center"
                            width="300">
                        <template slot-scope="scope">
                            <el-tooltip class="item" effect="light" content="修改原料信息">
                                <el-button size="mini" plain type="primary" @click="onEdit(scope.$index)">修改</el-button>
                            </el-tooltip>
                            <el-tooltip class="item" effect="light" content="禁用原料信息">
                                <el-button size="mini" plain type="primary" @click="onDisable(scope.$index)">禁用
                                </el-button>
                            </el-tooltip>
                            <el-tooltip class="item" effect="light" content="启用原料信息">
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
                    <el-form-item hidden prop="materialId" label="ID：">
                        <el-input type="string" v-model="mymodel.materialId"></el-input>
                    </el-form-item>

                    <el-form-item label="原料名称" required>
                        <el-col :span="15">
                            <el-form-item prop="materialName">
                                <el-input type="string" v-model="mymodel.materialName"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="原料单价" required>
                        <el-col :span="15">
                            <el-form-item prop="materialBasePrice">
                                <el-input type="string" v-model="mymodel.materialBasePrice"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="原料描述" required>
                        <el-col :span="15">
                            <el-form-item prop="materialDetailsText">
                                <el-input type="string" v-model="mymodel.materialDetailsText"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="原料基数" required>
                        <el-col :span="15">
                            <el-form-item prop="materialBaseNum">
                                <el-input type="string" v-model="mymodel.materialBaseNum"></el-input>
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

                <el-form-item hidden prop="materialId" label="ID:">
                    <el-input type="string" v-model="myedit.materialId"></el-input>
                </el-form-item>

                <el-form-item label="原料名称" required>
                    <el-col :span="15">
                        <el-form-item prop="materialName">
                            <el-input type="string" v-model="myedit.materialName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>

                <el-form-item label="原料单价">
                    <el-col :span="15">
                        <el-form-item prop="materialBasePrice">
                            <el-input type="string" v-model="myedit.materialBasePrice"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>

                <el-form-item label="原料描述">
                    <el-col :span="15">
                        <el-form-item prop="materialDetailsText">
                            <el-input type="string" v-model="myedit.materialDetailsText"></el-input>
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
                queryMaterial: {
                    param: ''
                },
                selectItemIndex: -1,
                //控制添加对话框
                dialog: {
                    title: '添加原料信息',
                    show: false
                },
                //控制修改对话框
                dialogEdit: {
                    title: '修改原料信息',
                    show: false
                },
                mymodel: {
                    materialId: '',
                    materialName: '',
                    materialBasePrice: '',
                    materialDetailsText: '',
                    materialAllNum: '',
                    enable: '',

                },
                myedit: {
                    materialId: '',
                    materialName: '',
                    materialBasePrice: '',
                    materialDetailsText: ''
                },
                myrulesAdd: {
                    materialName: [
                        {required: true, message: '请输入原料名称', trigger: 'blur'},
                        {min: 1, max: 20, message: '长度在1到20个字符'}
                    ],

                    materialBaseNum: [
                        {required: true, message: '请输入原料数量', trigger: 'blur'},
                        {min: 1, max: 20, message: '长度在1到20个字符'}
                    ],

                },

                myrulesEdit: {
                    materialName: [
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
                this.$axios.post("api/material/findAllMaterial").then(res => {
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
                        this.$axios.post("/api/material/createNewMaterial", this.mymodel).then(res => {
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
                this.$confirm('确认禁用原料信息吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //删除
                    this.mymodel = {
                        materialId: this.tableData[index].materialId,
                        enable: this.tableData[index].enable = false,
                    }
                    this.$axios.post("/api/material/enableMaterial", this.mymodel).then(res => {
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
                        materialId: this.tableData[index].materialId,
                        enable: this.tableData[index].enable = true,
                    }
                    this.$axios.post("/api/material/enableMaterial", this.mymodel).then(res => {
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
                    materialId: this.tableData[index].materialId,
                    materialName: this.tableData[index].materialName,
                    materialBasePrice: this.tableData[index].materialBasePrice,
                    materialDetailsText: this.tableData[index].materialDetailsText
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
                        this.$axios.post("/api/material/updateMaterialInfo", this.myedit).then(res => {
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
                this.$axios.post("/api/material/findMaterialByFuzzy", this.queryMaterial).then(res => {
                    this.$message('查询成功');
                    this.tableData = res.data.data;
                })
            },

            //查询已经被禁用的原料
            onFindDisable(){
                this.$axios.post("/api/material/findAllDisableMaterial").then(res => {
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

    .table {
        height: 100%;
        width: 100%;
    }

    .box-card {
        margin-top: 10px;
        margin-left: 10px;
        margin-right: 10px;
        height: 610px;
    }
</style>