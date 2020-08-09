(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["signup"],{"6ca7":function(e,t,a){},8547:function(e,t,a){"use strict";var i=a("2b0e"),n=a("80d2");t["a"]=i["a"].extend({name:"comparable",props:{valueComparator:{type:Function,default:n["f"]}}})},ec29:function(e,t,a){},f1df:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",{staticClass:"fill-height",attrs:{fluid:""}},[a("v-row",{attrs:{align:"center",justify:"center"}},[a("ValidationObserver",{ref:"observer"},[a("v-form",{model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[a("v-text-field",{attrs:{"error-messages":e.errorsEmail,label:"이메일",required:""},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}}),a("ValidationProvider",{attrs:{name:"password",rules:"required|min:8|max:16"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.errors;return[a("v-text-field",{attrs:{counter:16,type:"password","error-messages":i,label:"비밀번호",required:"",maxlength:"16"},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}})]}}])}),a("ValidationProvider",{attrs:{name:"confirm",rules:"required|passswordConfirm:@password"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.errors;return[a("v-text-field",{attrs:{counter:e.password.length,type:"password","error-messages":i,label:"비밀번호 확인",required:"",maxlength:e.password.length},model:{value:e.confirmation,callback:function(t){e.confirmation=t},expression:"confirmation"}})]}}])}),a("v-text-field",{attrs:{counter:10,"error-messages":e.errorsName,label:"닉네임",required:"",maxlength:"10"},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}}),a("ValidationProvider",{attrs:{rules:"agree",name:"checkbox"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.errors;return[a("v-checkbox",{attrs:{"error-messages":i,value:"1",label:"약관",type:"checkbox",required:""},model:{value:e.checkbox,callback:function(t){e.checkbox=t},expression:"checkbox"}})]}}])}),a("v-btn",{staticClass:"mr-4",attrs:{color:"primary",disabled:!e.valid},on:{click:e.submit}},[e._v("다음")])],1)],1)],1)],1)},n=[],r=(a("b0c0"),a("96cf"),a("1da1")),s=a("5530"),o=a("4c93"),l=a("7bb1"),c=a("c21c");Object(l["d"])("eager"),Object(l["c"])("required",Object(s["a"])(Object(s["a"])({},o["d"]),{},{message:"필수 입력칸입니다."})),Object(l["c"])("min",Object(s["a"])(Object(s["a"])({},o["c"]),{},{message:"{length} 자 이상이어야 합니다"})),Object(l["c"])("max",Object(s["a"])(Object(s["a"])({},o["b"]),{},{message:"{length} 자 까지만 가능합니다"})),Object(l["c"])("email",Object(s["a"])(Object(s["a"])({},o["a"]),{},{message:"이메일 형식이 아닙니다"})),Object(l["c"])("passswordConfirm",{params:["target"],validate:function(e,t){var a=t.target;return e===a},message:"비밀번호가 일치하지 않습니다"}),Object(l["c"])("agree",Object(s["a"])(Object(s["a"])({},o["d"]),{},{message:"약관을 동의해주세요"}));var u={components:{ValidationProvider:l["b"],ValidationObserver:l["a"]},data:function(){return{name:"",email:"",password:"",confirmation:"",checkbox:null,errorsEmail:[],errorsName:[],valid:!1}},watch:{email:function(){var e=this,t=!1;if(0===this.email.length)t=!1,this.errorsEmail=t?[]:["필수 입력칸입니다."];else{var a=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;if(a.test(this.email)){t=!0;var i=new FormData;i.append("email",this.email),c["a"].post("/accounts/duplicated/email/",i).then((function(a){"이미 존재하는 이메일입니다."===a.data.message&&(t=!1),e.errorsEmail=t?[]:["이미 존재하는 이메일입니다."]}))}else t=!1,this.errorsEmail=t?[]:["이메일 형식이 아닙니다"]}},name:function(){var e=this,t=!1;if(0===this.name.length)t=!1,this.errorsName=t?[]:["필수 입력칸입니다."];else if(this.name.length>10)t=!1,this.errorsName=t?[]:["Max 10 characters"];else{var a=/^([\wㄱ-ㅎ가-힣@/./+/-]*)$/;if(a.test(this.name)){t=!0;var i=new FormData;i.append("username",this.name),c["a"].post("/accounts/duplicated/username/",i).then((function(a){"이미 존재하는 닉네임입니다."===a.data.message&&(t=!1),e.errorsName=t?[]:["이미 존재하는 닉네임입니다."]}))}else this.errorsName=t?[]:["닉네임은 문자, 숫자, @ . + - _ 만 가능합니다."]}}},methods:{submit:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$refs.observer.validate();case 2:a=t.sent,a&&c["a"].post("/rest-auth/signup/",{email:e.email,username:e.name,password1:e.password,password2:e.confirmation}).then((function(t){console.log(t);var a=t.data.key;localStorage.setItem("token",a),e.$router.push({name:"taste",params:{username:e.name}})})).catch((function(e){console.log(e)}));case 4:case"end":return t.stop()}}),t)})))()}}},h=u,d=a("2877"),m=a("6544"),p=a.n(m),f=a("8336"),v=(a("d3b7"),a("25f0"),a("6ca7"),a("ec29"),a("9d26")),b=a("c37a"),g=(a("4de4"),a("45fc"),a("5607")),x=a("2b0e"),k=x["a"].extend({name:"rippleable",directives:{ripple:g["a"]},props:{ripple:{type:[Boolean,Object],default:!0}},methods:{genRipple:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.ripple?(e.staticClass="v-input--selection-controls__ripple",e.directives=e.directives||[],e.directives.push({name:"ripple",value:{center:!0}}),e.on=Object.assign({click:this.onChange},this.$listeners),this.$createElement("div",e)):null},onChange:function(){}}}),w=a("8547"),V=a("58df"),O=Object(V["a"])(b["a"],k,w["a"]).extend({name:"selectable",model:{prop:"inputValue",event:"change"},props:{id:String,inputValue:null,falseValue:null,trueValue:null,multiple:{type:Boolean,default:null},label:String},data:function(){return{hasColor:this.inputValue,lazyValue:this.inputValue}},computed:{computedColor:function(){if(this.isActive)return this.color?this.color:this.isDark&&!this.appIsDark?"white":"primary"},isMultiple:function(){return!0===this.multiple||null===this.multiple&&Array.isArray(this.internalValue)},isActive:function(){var e=this,t=this.value,a=this.internalValue;return this.isMultiple?!!Array.isArray(a)&&a.some((function(a){return e.valueComparator(a,t)})):void 0===this.trueValue||void 0===this.falseValue?t?this.valueComparator(t,a):Boolean(a):this.valueComparator(a,this.trueValue)},isDirty:function(){return this.isActive},rippleState:function(){return this.isDisabled||this.validationState?this.validationState:void 0}},watch:{inputValue:function(e){this.lazyValue=e,this.hasColor=e}},methods:{genLabel:function(){var e=this,t=b["a"].options.methods.genLabel.call(this);return t?(t.data.on={click:function(t){t.preventDefault(),e.onChange()}},t):t},genInput:function(e,t){return this.$createElement("input",{attrs:Object.assign({"aria-checked":this.isActive.toString(),disabled:this.isDisabled,id:this.computedId,role:e,type:e},t),domProps:{value:this.value,checked:this.isActive},on:{blur:this.onBlur,change:this.onChange,focus:this.onFocus,keydown:this.onKeydown},ref:"input"})},onBlur:function(){this.isFocused=!1},onChange:function(){var e=this;if(this.isInteractive){var t=this.value,a=this.internalValue;if(this.isMultiple){Array.isArray(a)||(a=[]);var i=a.length;a=a.filter((function(a){return!e.valueComparator(a,t)})),a.length===i&&a.push(t)}else a=void 0!==this.trueValue&&void 0!==this.falseValue?this.valueComparator(a,this.trueValue)?this.falseValue:this.trueValue:t?this.valueComparator(a,t)?null:t:!a;this.validate(!0,a),this.internalValue=a,this.hasColor=a}},onFocus:function(){this.isFocused=!0},onKeydown:function(e){}}}),C=O.extend({name:"v-checkbox",props:{indeterminate:Boolean,indeterminateIcon:{type:String,default:"$checkboxIndeterminate"},offIcon:{type:String,default:"$checkboxOff"},onIcon:{type:String,default:"$checkboxOn"}},data:function(){return{inputIndeterminate:this.indeterminate}},computed:{classes:function(){return Object(s["a"])(Object(s["a"])({},b["a"].options.computed.classes.call(this)),{},{"v-input--selection-controls":!0,"v-input--checkbox":!0,"v-input--indeterminate":this.inputIndeterminate})},computedIcon:function(){return this.inputIndeterminate?this.indeterminateIcon:this.isActive?this.onIcon:this.offIcon},validationState:function(){if(!this.isDisabled||this.inputIndeterminate)return this.hasError&&this.shouldValidate?"error":this.hasSuccess?"success":null!==this.hasColor?this.computedColor:void 0}},watch:{indeterminate:function(e){var t=this;this.$nextTick((function(){return t.inputIndeterminate=e}))},inputIndeterminate:function(e){this.$emit("update:indeterminate",e)},isActive:function(){this.indeterminate&&(this.inputIndeterminate=!1)}},methods:{genCheckbox:function(){return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.$createElement(v["a"],this.setTextColor(this.validationState,{props:{dense:this.dense,dark:this.dark,light:this.light}}),this.computedIcon),this.genInput("checkbox",Object(s["a"])(Object(s["a"])({},this.attrs$),{},{"aria-checked":this.inputIndeterminate?"mixed":this.isActive.toString()})),this.genRipple(this.setTextColor(this.rippleState))])},genDefaultSlot:function(){return[this.genCheckbox(),this.genLabel()]}}}),y=a("a523"),j=a("4bd4"),I=a("0fd9"),S=a("8654"),$=Object(d["a"])(h,i,n,!1,null,null,null);t["default"]=$.exports;p()($,{VBtn:f["a"],VCheckbox:C,VContainer:y["a"],VForm:j["a"],VRow:I["a"],VTextField:S["a"]})}}]);
//# sourceMappingURL=signup.2108742f.js.map