<template>
    <el-row class="menu_page">
        <el-container style="height: 100vh">
            <el-aside width="200px">
                <el-menu
                        class="el-menu-vertial"
                        background-color="#f8dcd3"
                        text-color="#AB9089"
                        active-text-color="#ffa9b8">

                     <el-submenu index="1">
                         <template slot="title">
                             <i class="el-icon-edit-outline"></i>
                             <span>原料管理</span>
                         </template>
                         <el-menu-item-group>
                             <router-link to="/appindex/matlist">
                                 <i class="el-icon-tickets"></i>
                                 <el-menu-item index="2">原料信息管理</el-menu-item>
                             </router-link>
                             <router-link to="/appindex/matbuy">
                                 <i class="el-icon-edit"></i>
                                 <el-menu-item index="3">原料采购</el-menu-item>
                             </router-link>
                             <router-link to="/appindex/matuse">
                                 <i class="el-icon-edit"></i>
                                 <el-menu-item index="4">原料使用</el-menu-item>
                             </router-link>
                         </el-menu-item-group>
                     </el-submenu>

                    <el-submenu index="5">
                        <template slot="title">
                            <i class="el-icon-edit-outline"></i>
                            <span>甜品管理</span>
                        </template>
                        <el-menu-item-group>
                            <router-link to="/appindex/deslist">
                                <i class="el-icon-tickets"></i>
                                <el-menu-item index="6">甜品信息管理</el-menu-item>
                            </router-link>
                            <router-link to="/appindex/desmake">
                                <i class="el-icon-edit"></i>
                                <el-menu-item index="7">甜品制作管理</el-menu-item>
                            </router-link>
                        </el-menu-item-group>
                    </el-submenu>

                    <el-submenu index="8">
                        <template slot="title">
                            <i class="el-icon-edit-outline"></i>
                            <span>销售管理</span>
                        </template>
                            <el-menu-item-group>
                        <router-link to="/appindex/dessale">
                            <i class="el-icon-edit"></i>
                            <el-menu-item index="9">甜品销售</el-menu-item>
                        </router-link>
                        <router-link to="/appindex/salelist">
                            <i class="el-icon-document-copy"></i>
                            <el-menu-item index="10">销售记录</el-menu-item>
                        </router-link>
                            </el-menu-item-group>
                    </el-submenu>

<!--                    <router-link to="/appindex/userlist">-->
<!--                    <el-menu-item index="4">-->
<!--                        <template slot="title">-->
<!--                            <i class="el-icon-s-home"></i>-->
<!--                            <span>用户管理</span>-->
<!--                        </template>-->
<!--                    </el-menu-item>-->
<!--                    </router-link>-->

                    <router-link  to="/appindex/suplist">
                    <el-menu-item index="11">
                        <template slot="title">
                            <i class="el-icon-edit-outline"></i>
                            <span>供应商管理</span>
                        </template>
                    </el-menu-item>
                    </router-link>


                    <el-submenu index="12">
                        <template slot="title">
                            <i class="el-icon-edit-outline"></i>
                            <span>报表管理</span>
                        </template>
                        <el-menu-item-group>
                            <router-link to="/appindex/desform">
                                <i class="el-icon-document"></i>
                                <el-menu-item index="13">甜品报表管理</el-menu-item>
                            </router-link>
                            <router-link to="/appindex/matform">
                                <i class="el-icon-document"></i>
                                <el-menu-item index="14">原料报表管理</el-menu-item>
                            </router-link>
                        </el-menu-item-group>
                    </el-submenu>

                </el-menu>
            </el-aside>
        </el-container>
    </el-row>
</template>

<script>
    export default {
        name: "Left"
    }
</script>

<style scoped>
@import "../../css/left.css";

 a {
     text-decoration: none;
 }

</style>