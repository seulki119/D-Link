<template>
    <div class='app'>
        <label>비밀번호 변경</label>
        <br>
        <label>새로운 비밀번호</label>
        <input v-model='PassWord.new_password1' name="user_email" @keypress.enter="sendChange">
        <label>새로운 비밀번호 확인</label>
        <input v-model='PassWord.new_password2' name="user_email" @keypress.enter="sendChange">
        <input @click="sendChange"  value="Send">
    </div>
</template>

<script>

import axios from 'axios';

export default {
    name:'emailpwchange',
    data() {
        return {
            PassWord: {
                new_password1:'',
                new_password2:'',
            },
            Token:document.location.href.split('change/')[1]

        }
    },
    methods: {
        sendChange() {
 
        const config = {
            headers: {
                Authorization: `Token ${this.Token}`
            }
        }
        console.log(this.Token)
        console.log(this.PassWord)
        console.log(this.config)
        axios.post('http://localhost:8000/api/password/change/', this.PassWord, config)
            .then(() => {
                console.log('비밀번호 변경 완료')
            })
            .catch(err => {
                console.log(err)
            })
            
        }
    }
}
</script>

<style>

</style>