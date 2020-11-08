<template>
  <div class="row-dark">
    <div class="containera">
      <footer>
        <div class="info">
          <h3>Contact us</h3>
          <ul class="fa-ul">
            <li>
              <span class="fa-li"><i class="fas fa-map-marker-alt"></i></span>
              <a v-bind:href="footer_address_link">{{ footer_address }}</a>
            </li>
            <li>
              <span class="fa-li"><i class="fas fa-phone"></i></span>
              {{ footer_phone }}
            </li>
            <li>
              <span class="fa-li"><i class="fas fa-envelope"></i></span>
              <span ref="email"></span>
            </li>
          </ul>
        </div>
        <form name="contact" method="POST" data-netlify="true">
          <h3>Send us a message</h3>
          <label><input type="text" placeholder="Name" required /></label>
          <label><input type="email" placeholder="Email" required /></label>
          <label>
            <textarea placeholder="Message" required maxlength="500" />
          </label>
          <button type="submit">Send</button>
        </form>
      </footer>
    </div>
  </div>
</template>

<script>
import EmailObfuscator from "email-obfuscate";

export default {
  props: {
    footer_address: {
      type: String,
      // required: true,
    },
    footer_address_link: {
      type: String,
      // required: true,
    },
    footer_phone: {
      type: String,
      // required: true,
    },
    footer_email: {
      type: String,
      // required: true,
    },
  },
  mounted() {
    this.getEmail();
  },
  methods: {
    getEmail() {
      const ref = this.$refs.email;
      new EmailObfuscator(ref, {
        name: this.footer_email,
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
footer {
  display: grid;
  grid-template-columns: repeat(2, min(750px, 1fr));
  justify-content: center;
  color: var(--color-white);
}

.info {
  font-size: 0.8rem;
  text-align: left;
  padding: 1.5rem;
}

form {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 1.5rem;
}
</style>
