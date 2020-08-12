<template>
    <div class='app'>
        <form class="contact-form" @submit.prevent="sendEmail">
            <label>Email</label>
            <input type="email" name="user_email">
            <label>Message</label>
            <textarea name="message"></textarea>
            <input type="submit" value="Send">
        </form>
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
        templateParams: {
            from_name: "D_LINK",
            message_html: "http://localhost:8000/api/" ,
            company_email: "d_link.com",
            target_email: "",
        },
      }
  },
  methods: {
    sendEmail: (e) => {
      axios.get("http://localhost:8000/api/accounts/emailpw/", {
          email: this.templateParams.target_email,
        })
        .then(() => {
            console.log('보내짐')
        })


      emailjs.sendForm('gmail', 'template_Bb6olUlG', e.target, 'user_M9vvPfnsBcPdxG5CdE1mQ')
        .then((result) => {
            console.log('SUCCESS!', result.status, result.text, e);
        }, (error) => {
            console.log('FAILED...', error);
        });
    },
    sendTest() {
        console.log(this.templateParams)
        emailjs.send('gmail', 'template_Bb6olUlG', this.templateParams, 'user_M9vvPfnsBcPdxG5CdE1mQ')
            .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            }, function(error) {
            console.log('FAILED...', error);
            });        
    }
  }
}
</script>