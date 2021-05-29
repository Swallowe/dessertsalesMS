<template>
    <div class="body-main">
        <div class="login-main">
            <h1 class="h1">系统登录</h1>
            <el-form
                    :model="mymodel"
                    :rules="myrules"
                    ref="myform">
                <el-form-item prop="userAccount">
                    <el-input type="text" placeholder="输入帐号" v-model="mymodel.userAccount"></el-input>
                </el-form-item>
                <el-form-item prop="userPassword">
                    <el-input type="password" placeholder="输入密码" v-model="mymodel.userPassword"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="login('myform')">登录</el-button>
                </el-form-item>
                <div>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data(){
            return{

                mymodel : {
                    userAccount:'',
                    userPassword:'',
                    userName: ''
                },

                myrules : {
                    userAccount: [
                        {required: true, message:'请输入登录账号',trigger:'blur'}
                    ],
                    userPassword: [
                        {required: true, message: '请输入登录密码', trigger: 'blur'}
                    ]
                }

            }
        },

        methods:{
            login(formName) {
                //表单校验
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let login = {
                            userAccount: this.mymodel.userAccount,
                            userPassword: this.mymodel.userPassword,
                            userName:this.mymodel.userName
                        }

                        this.$axios.post("/api/user/login",login).then(res =>{
                            if (res.data.data !=null ){
                                this.$message("登录成功")
                                localStorage.setItem('userInfo', JSON.stringify(this.mymodel))
                                this.$router.push('/appindex')
                            } else
                               {
                                this.$message({
                                    message:'用户名和密码错误',
                                    type: 'error'
                                })

                            }
                        })
                    } else {
                        this.$message({
                            message: '用户名和密码不能为空',
                            type:'error'
                        })
                        return false;
                    }
                })
            }
        }
    }
</script>

<style scoped>
    @import "../css/login.css";

</style>