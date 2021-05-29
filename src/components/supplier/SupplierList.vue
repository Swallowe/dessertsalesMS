<template>
    <div>
        <el-card class="box-card">
            <div align="left">供应商基本信息
                <el-button
                        size="mini"
                        type="primary"
                        @click="dialog.show = true">添加</el-button>
            </div>
            <el-divider></el-divider>
            <div align="left">查询供应商
                <div>
                    <el-form
                            :inline="true"
                            :model="querySupplier"
                            ref="myfuzzy"
                            class="demo-form-inline">
                        <el-form-item label="模糊查询内容：">
                            <el-input
                                    placeholder="请输入查询的供应商内容"
                                    v-model="querySupplier.param"
                                    clearable>
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" size="mini" @click="onFuzzy('myfuzzy')">查询</el-button>
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
                            prop="supplierId"
                            label="供应商编号"
                            align="center"
                            width="300">
                    </el-table-column>
                    <el-table-column
                            prop="supplierName"
                            label="供应商名称"
                            align="center"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="supplierPhone"
                            label="供应商电话"
                            align="center"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="supplierEmail"
                            label="供应商邮箱"
                            align="center"
                            width="200">
                    </el-table-column>

                    <!--                操作按钮-->
                    <el-table-column
                            label="操作"
                            align="center"
                            width="300">
                        <template slot-scope="scope">
                            <el-tooltip class="item" effect="light" content="修改供应商信息">
                                <el-button size="mini" plain type="primary" @click="onEdit(scope.$index)">修改</el-button>
                            </el-tooltip>
                            <el-tooltip class="item" effect="light" content="删除供应商信息">
                                <el-button size="mini" plain type="primary" @click="onDelete(scope.$index)">删除</el-button>
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

                    <el-form-item hidden prop="supplierId" label="ID:">
                        <el-input type="string" v-model="mymodel.supplierId"></el-input>
                    </el-form-item>

                    <el-form-item label="供应商名称" required>
                        <el-col :span="15">
                            <el-form-item prop="supplierName">
                                <el-input type="string" v-model="mymodel.supplierName"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="供应商电话" required>
                        <el-col :span="15">
                            <el-form-item prop="supplierPhone">
                                <el-input type="string" v-model="mymodel.supplierPhone"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="供应商邮箱" required>
                        <el-col :span="15">
                            <el-form-item prop="supplierManame">
                                <el-input type="string" v-model="mymodel.supplierEmail"></el-input>
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

                <el-form-item hidden prop="supplierId" label="ID:">
                    <el-input type="string" v-model="myedit.supplierId"></el-input>
                </el-form-item>

                <el-form-item label="供应商名称" required>
                    <el-col :span="15">
                        <el-form-item prop="supplierName">
                            <el-input type="string" v-model="myedit.supplierName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>

                <el-form-item label="供应商电话" required>
                    <el-col :span="15">
                        <el-form-item prop="supplierPhone">
                            <el-input type="string" v-model="myedit.supplierPhone"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>

                <el-form-item label="供应商邮箱" required>
                    <el-col :span="15">
                        <el-form-item prop="supplierEmail">
                            <el-input type="string" v-model="myedit.supplierEmail"></el-input>
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
        name: "SupplierList",
        data() {
            return {
                tableData: [],
                selectItemIndex: -1,
                querySupplier: {
                        param:''
                },
                //控制添加对话框
                dialog: {
                    title: '添加供应商信息',
                    show: false
                },
                //控制修改对话框
                dialogEdit: {
                    title: '修改供应商信息',
                    show: false
                },
                mydelete:{
                    supplierId:''
                },
                mymodel: {
                    supplierId:'',
                    supplierName:'',
                    supplierPhone:'',
                    supplierEmail:''
                },
                myedit: {
                    supplierId:'',
                    supplierName:'',
                    supplierPhone:'',
                    supplierEmail:''
                },
                myrulesAdd: {
                    supplierName: [
                        {required: true, message: '请输入供应商名称',trigger: 'blur'},
                        {min:1, max :20,message: '长度在1到20个字符'}
                    ],
                    supplierPhone: [
                        {required: true, message: '请输入供应商电话',trigger: 'blur'},
                        {min:1, max :20,message: '长度在1到20个字符'}
                    ],
                },

                myrulesEdit: {
                    supplierName: [
                        {required: true, message: '请输入供应商名称',trigger: 'blur'},
                        {min:1, max :20,message: '长度在1到20个字符'}
                    ],
                    supplierPhone: [
                        {required: true, message: '请输入供应商电话',trigger: 'blur'},
                        {min:1, max :20,message: '长度在1到20个字符'}
                    ],

                }
            }
        },

        mounted() {
                this.getSupplierList();
        },

        methods:{
            getSupplierList(){
                this.$axios.post("/api/supplier/findAllSupplier").then(res => {
                    this.tableData = res.data.data;
                })
            },

            onFuzzy(formName) {
                this.$axios.post("/api/supplier/findSupplierByFuzzy",this.querySupplier).then(res => {
                    if (res.data.code == 0){
                        this.$message("查询成功")
                    } else {
                        this.$message("查询失败")
                    }
                    this.tableData = res.data.data;
                })
            },

            //响应添加对话框的保存按钮
            onSubmitAdd(formName) {
                this.$axios.post("/api/supplier/createNewSupplier",this.mymodel).then(res => {
                    if(res.data.code == 0){
                        this.$message("添加成功")
                        this.tableData.push(res.data.data);
                    } else {
                        this.$message("添加失败")
                    }
                    this.dialog.show = false;
                })
            },

            //响应修改按钮
            onEdit(index){
                this.dialogEdit = {
                    show: true,
                    option: "edit"
                }
                //更新数据
                this.myedit = {
                    supplierId:this.tableData[index].supplierId,
                    supplierName:this.tableData[index].supplierName,
                    supplierPhone:this.tableData[index].supplierPhone,
                    supplierEmail:this.tableData[index].supplierEmail
                }

                // 设置哪行被选中
                this.selectItemIndex = index;
            },

            //响应修改中的保存按钮
            onSubmitEdit(formName) {
                this.$axios.post("/api/supplier/updateSupplierInfo",this.myedit).then(res => {
                    if (res.data.code == 0) {
                        this.$message("修改供应商信息成功")
                    } else {
                        this.$message("修改失败")
                    }
                    this.dialogEdit.show = false;
                })
            },

            //响应删除按钮
            onDelete(index) {
                this.$confirm('确认删除供应商信息吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
            }).then(()=>{
                this.mydelete.supplierId=this.tableData[index].supplierId
                this.$axios.post("/api/supplier/deleteSupplierInfo",this.mydelete).then(res => {
                  if (res.data.code == 0){
                      this.$message("删除供应商信息成功")
                  } else {
                      this.$message("删除失败")
                  }
                })
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
    }
</style>