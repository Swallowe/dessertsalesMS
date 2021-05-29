<template>
    
</template>

<script>
    export default {
        name: "Test",
        mymodel: {
            id:1
        },

        methods:{
            test(){
                this.$axios.post("127.0.0.1:8080/api/dessert/getDessertInfo",this.mymodel).then(res =>{
                    console.log(JSON.stringify((res.data)))
                }).catch(function (error) {
                    console.log(error)
                });
            }
        }
    }

</script>

<style scoped>

</style>