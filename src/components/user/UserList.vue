<template>
    <div>
        <el-card class="box-card">
            <div align="left">用户基本信息
                <el-button
                        size="mini"
                        type="primary"
                        @click="dialog.show = true">添加</el-button>
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
                            prop="userId"
                            label="用户编号"
                            align="center"
                            width="100">
                    </el-table-column>

                    <el-table-column
                            prop="userName"
                            label="登录账号"
                            align="center"
                            width="300">
                    </el-table-column>

                    <el-table-column
                            prop="userMobile"
                            label="用户手机"
                            align="center"
                            width="200">
                    </el-table-column>

                    <el-table-column
                            prop="userEmail"
                            label="用户邮箱"
                            align="center"
                            width="300">
                    </el-table-column>

<!--                    操作按钮-->
                    <el-table-column
                            label="操作"
                            align="center"
                            width="300">
                        <template slot-scope="scope">
                            <el-tooltip class="item" effect="light" content="修改用户信息">
                                <el-button size="mini" plain type="primary" @click="dialogEdit.show = true">修改</el-button>
                            </el-tooltip>
                            <el-tooltip class="item" effect="light" content="删除用户信息">
                                <el-button size="mini" plain type="primary" >删除</el-button>
                            </el-tooltip>
                            <el-tooltip class="item" effect="light" content="重置密码">
                                <el-button size="mini" plain type="primary" @click="dialogPwd.show=true" >重置密码</el-button>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
<!--添加用户信息对话框-->
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
                        label-width="150px"
                        style="margin: 10px;width: auto">

                    <el-form-item hidden prop="userId" label="ID:">
                        <el-input type="string" v-model="mymodel.userId"></el-input>
                    </el-form-item>

                    <el-form-item label="登录账号" required>
                        <el-col :span="15">
                            <el-form-item prop="userName">
                                <el-input type="string" v-model="mymodel.userName"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="用户密码" required>
                        <el-col :span="15">
                            <el-form-item prop="userPassword">
                                <el-input type="string" v-model="mymodel.userConpassword"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="确认密码" required>
                        <el-col :span="15">
                            <el-form-item prop="userConpassword">
                                <el-input type="string" v-model="mymodel.userConpassword"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="用户手机" required>
                        <el-col :span="15">
                            <el-form-item prop="userMobile">
                                <el-input type="string" v-model="mymodel.userMobile"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="用户邮箱" required>
                        <el-col :span="15">
                            <el-form-item prop="userEmail">
                                <el-input type="string" v-model="mymodel.userEmail"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-form-item>

                    <el-form-item class="text-right">
                        <el-button type="primary">保存</el-button>
                        <el-button @click="dialog.show = false">取消</el-button>
                    </el-form-item>

                </el-form>
            </div>
        </el-dialog>
<!--        修改用户信息对话框-->
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
                    :model="mymodel"
                    label-width="150px"
                    style="margin: 10px;width: auto">

                <el-form-item hidden prop="userId" label="ID:">
                    <el-input type="string" v-model="mymodel.userId"></el-input>
                </el-form-item>

                <el-form-item label="登录账号" required>
                    <el-col :span="15">
                        <el-form-item prop="userName">
                            <el-input type="string" v-model="mymodel.userName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>

                <el-form-item label="用户手机" required>
                    <el-col :span="15">
                        <el-form-item prop="userMobile">
                            <el-input type="string" v-model="mymodel.userMobile"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>

                <el-form-item label="用户邮箱" required>
                    <el-col :span="15">
                        <el-form-item prop="userEmail">
                            <el-input type="string" v-model="mymodel.userEmail"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>

                <el-form-item class="text_right">
                    <el-button type="primary">保存</el-button>
                    <el-button @click="dialogEdit.show = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

<!--        重置用户密码-->
        <el-dialog
                width="80%"
                :title="dialogPwd.title"
                :visible.sync="dialogPwd.show"
                :close-on-click-modal="false"
                :close-on-press-escape="false"
                :modal-append-to-body="false">

            <el-form
                    ref="myformpw"
                    :model="mymodel"
                    label-width="150px"
                    style="margin: 10px;width: auto">

                <el-form-item hidden prop="userId" label="ID:">
                    <el-input type="string" v-model="mymodel.userId"></el-input>
                </el-form-item>

                <el-form-item label="登录账号">
                    <el-col :span="15">
                        <el-form-item prop="userName">
                            <el-input type="string" readonly v-model="mymodel.userName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>

                <el-form-item label="登录密码">
                    <el-col :span="15">
                        <el-form-item prop="userPassword">
                            <el-input type="string" readonly v-model="mymodel.userPassword"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>

                <el-form-item label="确认密码">
                    <el-col :span="15">
                        <el-form-item prop="userConPassword">
                            <el-input type="string" readonly v-model="mymodel.userConpassword"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>

                <el-form-item class="text-right">
                    <el-button type="primary">保存</el-button>
                    <el-button @click="dialogPwd.show=false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "UserList",
        data() {
            return{

                tableData: [
                    {
                        userId:'1',
                        userName:'admin',
                        userPassword:'123456',
                        userConpassword:'123456',
                        userMobile:'17832277839',
                        userEmail:'1270828529@qq.com'
                    }
                ],
                mymodel: {
                    userId:'',
                    userName:'',
                    userPassword:'',
                    userConpassword:'',
                    userMobile:'',
                    userEmail:''
                },
                dialog: {
                    show: false,
                    title: "",
                    option: ""
                },
                dialogEdit: {
                    show: false,
                    title: "",
                    option: ""
                },
                dialogPwd: {
                    show: false,
                    title: "",
                    option: ""
                },
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