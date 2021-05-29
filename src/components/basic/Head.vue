<template>
    <!--    定义一个头部导航栏-->
    <header class="header">
        <div>

            <el-col :span="10">
                <img width="65" height="50" src="../../assets/logo.png" class="icon">
                <span class="title">甜品销售管理系统</span>
            </el-col>

            <el-col :span="6" class="user">
                <span>{{userInfo.userAccount}}</span>

                <el-button type="text" @click="dialog.show = true">修改密码</el-button>

                <el-link type="primary">
                    <i class="el-icon-switch-button" @click="logout()"></i>
                </el-link>
            </el-col>

            <el-dialog
                    width="80%"
                    :title="dialog.title"
                    :visible.sync="dialog.show"
                    :close-on-click-modal="false"
                    :close-on-press-escape="false"
                    :modal-append-to-body="false">
                <el-form
                        ref="myform"
                        :model="mymodel"
                        :rules="myrules"
                        label-width="150px"
                        style="margin: 10px;width: auto">


                    <el-form-item label="用户账号">
                        <el-col :span="15">
                            <el-form-item prop="userAccount">
                                <el-input readonly="true" type="string" v-model="mymodel.userAccount"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="旧密码">
                        <el-col :span="15">
                            <el-form-item prop="userOldPwd">
                                <el-input type="password" v-model="mymodel.userOldPwd"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="新密码">
                        <el-col :span="15">
                            <el-form-item prop="userNewPwd">
                                <el-input type="password" v-model="mymodel.userNewPwd"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-form-item>

                    <el-form-item class="text_right">
                        <el-button type="primary" @click="onSubmit('myform')">保存</el-button>
                        <el-button @click="dialog.show = false">取消</el-button>
                    </el-form-item>

                </el-form>
            </el-dialog>
        </div>
    </header>


</template>

<script>
    export default {
        name: "Head",
        data() {
            return {
                userInfo: {
                    userAccount: '',
                },
                dialog: {
                    title: '修改密码',
                    show: false
                },
                mymodel: {
                    userAccount: '',
                    userOldPwd: '',
                    userNewPwd: ''
                },
                myrules: {
                    userOldPwd: [
                        {required: true, message: '请输入旧密码', trigger: 'blur'}
                    ],
                    userNewPwd: [
                        {required: true, message: '请输入新密码', trigger: 'blur'}
                    ]
                }

            }
        },

        created() {
            this.userInfo = JSON.parse(localStorage.getItem("userInfo"))
            this.mymodel.userAccount = this.userInfo.userAccount
        },
        methods: {
            logout() {
                this.$message("退出成功")
                localStorage.removeItem("userInfo")
                this.$router.push('/')
            },

            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (!valid) {
                        this.$message({
                            message: '输入项有误',
                            type: 'error'
                        });
                        return false;
                    } else {
                        this.$axios.post("/api/user/updateUserPwd", this.mymodel).then(res => {
                            this.$message("修改密码成功，请重新登录")
                            this.$router.push('/')
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped>
    @import "../../css/head.css";


    .el-col {
        font-size: 20px;
        min-height: 50px;
    }
</style>