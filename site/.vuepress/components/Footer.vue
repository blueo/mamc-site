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
              <a v-bind:href="phoneLink">{{ footer_phone }}</a>
            </li>
            <li>
              <span class="fa-li"><i class="fas fa-envelope"></i></span>
              <span ref="email"></span>
            </li>
          </ul>
        </div>
        <form
          name="contact"
          method="POST"
          data-netlify="true"
          data-netlify-recaptcha="true"
        >
          <h3>Send us a message</h3>
          <label
            ><input type="text" name="name" placeholder="Name" required
          /></label>
          <label
            ><input type="email" name="email" placeholder="Email" required
          /></label>
          <label>
            <textarea
              placeholder="Message"
              name="message"
              required
              maxlength="500"
            />
          </label>
          <div class="recaptcha">
            <div data-netlify-recaptcha="true"></div>
          </div>
          <button class="button button-important" type="submit">Send</button>
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
      required: true,
    },
    footer_address_link: {
      type: String,
      required: true,
    },
    footer_phone: {
      type: String,
      required: true,
    },
    footer_email: {
      type: String,
      required: true,
    },
  },
  computed: {
    phoneLink(v) {
      return `tel:${v.footer_phone}`;
    },
  },
  mounted() {
    this.getEmail();
  },
  methods: {
    getEmail() {
      const ref = this.$refs.email;
      const regex = new RegExp(
        "([\\w\\d._%+-]+)@([\\w\\d-]+)\\.([\\w\\d-]+)?\\.?(\\w+)?"
      );

      let [original, ...matches] = this.$props.footer_email.match(regex);
      matches = matches.filter((a) => a);
      const name = matches.shift();
      const tld = matches.pop();
      const domain = matches.join(".");

      new EmailObfuscator(ref, {
        name,
        domain,
        tld,
        altText: "Email MAMC",
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
footer {
  display: grid;
  grid-template-columns: min(750px, 1fr);
  justify-content: center;
  color: var(--color-white);
  padding-bottom: 5rem;
}

@media screen and (min-width: $breakpoint-desktop) {
  footer {
    grid-template-columns: repeat(2, min(750px, 1fr));
  }
}

footer h3 {
  font-size: 1.2rem;
  font-weight: 400;
}

.info {
  font-size: 1.2rem;
  text-align: left;
  padding: 1.5rem;
}

.info h3 {
  margin: 2rem 1rem;
}

.info li {
  margin-bottom: 1rem;
}

.info i {
  color: var(--color-bluegreen);
}

.info a {
  text-decoration: none;
  color: var(--color--white);
}

form {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 1.5rem;
}

form h3 {
  margin: 2rem 0rem;
}

form label, form input, form textarea {
  display: block;
  width: 100%;
  margin-bottom: 0.2rem;
}

form input, form textarea {
  padding: 0.5rem;
}

.recaptcha {
  display: flex;
  justify-content: center;
}

.button {
  font-size: 1.4rem;
  padding: 0.5rem;
}
</style>
