<template>
  <div class="row-dark">
    <div class="containera">
      <footer>
        <div class="info">
          <h3>Contact us</h3>
          <ul class="list">
            <li>
              <span class="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  width="12px"
                  height="12px"
                  viewBox="0 0 425.963 425.963"
                  style="enable-background: new 0 0 425.963 425.963"
                  xml:space="preserve"
                >
                  <g>
                    <path
                      d="M213.285,0h-0.608C139.114,0,79.268,59.826,79.268,133.361c0,48.202,21.952,111.817,65.246,189.081
                    c32.098,57.281,64.646,101.152,64.972,101.588c0.906,1.217,2.334,1.934,3.847,1.934c0.043,0,0.087,0,0.13-0.002
                    c1.561-0.043,3.002-0.842,3.868-2.143c0.321-0.486,32.637-49.287,64.517-108.976c43.03-80.563,64.848-141.624,64.848-181.482
                    C346.693,59.825,286.846,0,213.285,0z M274.865,136.62c0,34.124-27.761,61.884-61.885,61.884
                    c-34.123,0-61.884-27.761-61.884-61.884s27.761-61.884,61.884-61.884C247.104,74.736,274.865,102.497,274.865,136.62z"
                    />
                  </g>
                </svg>
              </span>
              <a v-bind:href="addressLink">{{ address }}</a>
            </li>
            <li>
              <span class="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 53.942 53.942"
                  style="enable-background: new 0 0 53.942 53.942"
                  xml:space="preserve"
                >
                  <path
                    d="M53.364,40.908c-2.008-3.796-8.981-7.912-9.288-8.092c-0.896-0.51-1.831-0.78-2.706-0.78c-1.301,0-2.366,0.596-3.011,1.68
	c-1.02,1.22-2.285,2.646-2.592,2.867c-2.376,1.612-4.236,1.429-6.294-0.629L17.987,24.467c-2.045-2.045-2.233-3.928-0.632-6.291
	c0.224-0.309,1.65-1.575,2.87-2.596c0.778-0.463,1.312-1.151,1.546-1.995c0.311-1.123,0.082-2.444-0.652-3.731
	c-0.173-0.296-4.291-7.27-8.085-9.277c-0.708-0.375-1.506-0.573-2.306-0.573c-1.318,0-2.558,0.514-3.49,1.445L4.7,3.986
	c-4.014,4.013-5.467,8.562-4.321,13.52c0.956,4.132,3.742,8.529,8.282,13.068l14.705,14.705c5.746,5.746,11.224,8.66,16.282,8.66
	c0,0,0,0,0.001,0c3.72,0,7.188-1.581,10.305-4.698l2.537-2.537C54.033,45.163,54.383,42.833,53.364,40.908z"
                  />
                </svg>
              </span>
              <a v-bind:href="phoneLink">{{ phone }}</a>
            </li>
            <li>
              <span class="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  height="12px"
                  width="12px"
                  viewBox="0 0 60 60"
                  style="enable-background: new 0 0 60 60"
                  xml:space="preserve"
                >
                  <g>
                    <polygon points="60,50.234 60,9.944 39.482,30.536 	" />
                    <polygon points="0,9.941 0,50.234 20.519,30.535 	" />
                    <path
                      d="M1.387,8.5l21.002,21.08c0.121,0.051,0.471,0.415,0.517,0.519l5.941,5.963c0.635,0.591,1.672,0.59,2.333-0.025l5.911-5.933
		c0.046-0.105,0.4-0.473,0.522-0.524L58.615,8.5H1.387z"
                    />
                    <path
                      d="M38.07,31.954l-5.5,5.52c-0.73,0.68-1.657,1.019-2.58,1.019c-0.914,0-1.823-0.332-2.533-0.993l-5.526-5.546L1.569,51.5
		h56.862L38.07,31.954z"
                    />
                  </g>
                </svg>
              </span>
              <span ref="email"></span>
            </li>
          </ul>
        </div>
        <client-only>
          <form name="contact" method="POST" data-netlify="true">
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
            <button class="button button-important" type="submit">Send</button>
          </form>
        </client-only>
      </footer>
    </div>
  </div>
</template>

<script>
import EmailObfuscator from "email-obfuscate";
import { getFrontMatterField } from "../utils/defaultFields";

export default {
  props: {
    footer_address: {
      type: String,
    },
    footer_address_link: {
      type: String,
    },
    footer_phone: {
      type: String,
    },
    footer_email: {
      type: String,
    },
  },
  computed: {
    address(v) {
      return this.getFooterProp("footer_address");
    },
    addressLink(v) {
      return this.getFooterProp("footer_address_link");
    },
    email(v) {
      return this.getFooterProp("footer_email");
    },
    phone(v) {
      return this.getFooterProp("footer_phone");
    },
    phoneLink(v) {
      return `tel:${this.phone}`;
    },
  },
  mounted() {
    this.getEmail();
  },
  methods: {
    getFooterProp: getFrontMatterField("footer"),
    getEmail() {
      const ref = this.$refs.email;
      const regex = new RegExp(
        "([\\w\\d._%+-]+)@([\\w\\d-]+)\\.([\\w\\d-]+)?\\.?(\\w+)?"
      );
      const prop = this.getFooterProp("footer_email");
      let [original, ...matches] = prop.match(regex);
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
  margin: 2rem 0;
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

.list {
  list-style: none;
}

.icon {
  svg {
    height: 1rem;
    width: 1rem;
    fill: var(--color-bluegreen);
  }
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

.button {
  font-size: 1.4rem;
  padding: 0.5rem;
}
</style>
