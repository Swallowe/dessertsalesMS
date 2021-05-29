<script src="index.js"></script>
<template>
<div class="index">
    <Head></Head>
    <Left></Left>
    <div class="container">
            <router-view/>
    </div>
    <Foot></Foot>
</div>
</template>

<script>
    import Head from "../components/basic/Head";
    import Left from "../components/basic/Left";
    import Foot from "./basic/Foot";
    export default {
        name:"AppIndex",
        components: {Foot, Left, Head}
    }
</script>

<style scoped>
@import "../css/appindex.css";
</style>