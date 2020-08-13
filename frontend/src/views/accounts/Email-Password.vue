<template>
    <div class='app'>
        <label>Email</label>
        <input v-model='templateParams.target_email' name="user_email" @keypress.enter="sendTest">
        <input @click="sendTest"  value="Send">
    </div>
</template>

<script>
import emailjs from 'emailjs-com';
import axios from 'axios';

export default {
  name : 'emailpw',
  data() {
      return {
        token:"",
        templateParams: {
            from_name: "D_LINK",
            company_email: "d_link.com",
            target_email: "",  
            message_html: `http://localhost:8080/emailpwchange/` ,
        },
        
      }
  },
  methods: {

    sendTest() {

      console.log(this.templateParams)

      axios.get(`http://127.0.0.1:8000/api/accounts/${this.templateParams.target_email}/emailpw/`)
        .then(res => {
            console.log(res.data)
            this.templateParams.message_html += res.data
            emailjs.send('gmail', 'template_Bb6olUlG', this.templateParams, 'user_M9vvPfnsBcPdxG5CdE1mQ')
              .then(function(response) {
              console.log('SUCCESS!', response.status, response.text);
              }, function(error) {
              console.log('FAILED...', error);
              });              
        })


      
    }
  }
}
</script>