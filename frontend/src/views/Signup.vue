<template>
  <ValidationObserver ref="observer">
    <form>
      <ValidationProvider
        v-slot="{ errors }"
        name="email"
        rules="required|email"
      >
        <v-text-field
          v-model="email"
          :error-messages="errors"
          label="이메일"
          required
        ></v-text-field>
      </ValidationProvider>

      <ValidationProvider
        name="password"
        rules="required|min:8|max:16"
        v-slot="{ errors }"
      >
        <v-text-field
          v-model="password"
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
          type="password"
          :error-messages="errors"
          label="비밀번호 확인"
          required
        ></v-text-field>
      </ValidationProvider>

      <ValidationProvider
        v-slot="{ errors }"
        name="Name"
        rules="required|max:10"
      >
        <v-text-field
          v-model="name"
          :counter="10"
          :error-messages="errors"
          label="닉네임"
          required
        ></v-text-field>
      </ValidationProvider>

      <ValidationProvider v-slot="{ errors }" rules="required" name="checkbox">
        <v-checkbox
          v-model="checkbox"
          :error-messages="errors"
          value="1"
          label="Option"
          type="checkbox"
          required
        ></v-checkbox>
      </ValidationProvider>

      <v-btn class="mr-4" @click="submit">submit</v-btn>
      <v-btn @click="clear">clear</v-btn>
    </form>
  </ValidationObserver>
</template>

<script>
import { required, email, max, min } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

extend("min", {
  ...min,
  message: "{_field_} may not be less than {length} characters",
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});

extend("email", {
  ...email,
  message: "Email must be valid",
});

extend("passswordConfirm", {
  params: ["target"],
  validate(value, { target }) {
    return value === target;
  },
  message: "Password confirmation does not match",
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    name: "",
    email: "",
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: null,
  }),

  methods: {
    submit() {
      this.$refs.observer.validate();
    },
    clear() {
      this.name = "";
      this.email = "";
      this.select = null;
      this.checkbox = null;
      this.$refs.observer.reset();
    },
  },
};
</script>
