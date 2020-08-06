<template>
  <v-container max-width="600" min-width="300">
    <v-row align="center" justify="center">
      <ValidationObserver ref="observer">
        <ValidationProvider name="password" rules="required|min:8|max:16" v-slot="{ errors }">
          <v-text-field
            v-model="password"
            :counter="16"
            type="password"
            :error-messages="errors"
            label="비밀번호"
            required
          ></v-text-field>
        </ValidationProvider>

        <ValidationProvider
          name="confirm"
          rules="required|passswordConfirm:@password"
          v-slot="{ errors }"
        >
          <v-text-field
            v-model="confirmation"
            :counter="password.length"
            type="password"
            :error-messages="errors"
            label="비밀번호 확인"
            required
          ></v-text-field>
        </ValidationProvider>
      </ValidationObserver>
    </v-row>
  </v-container>
</template>

<script>
import { required, max, min } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from "vee-validate";
import http from "@/util/http-common";
setInteractionMode("eager");

extend("required", {
  ...required,
  message: "필수 입력칸입니다."
});

extend("min", {
  ...min,
  message: "{length} 자 이상이어야 합니다"
});

extend("max", {
  ...max,
  message: "{length} 자 까지만 가능합니다"
});

extend("passswordConfirm", {
  params: ["target"],
  validate(value, { target }) {
    return value === target;
  },
  message: "비밀번호가 일치하지 않습니다"
});
export default {};
</script>
