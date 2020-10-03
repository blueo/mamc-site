<template>
  <header
    class="header"
    :style="
      sticky && {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
      }
    "
  >
    <nav v-if="navLinks" class="navigation left desktop-nav">
      <ul>
        <li>
          <a href="/" class="brand">
            <Logo class="logo" />
            MOUNT ALBERT METHODIST CHURCH
          </a>
        </li>
      </ul>
    </nav>

    <nav v-if="navLinks" class="navigation right desktop-nav">
      <ul>
        <li v-for="nav in navLinks" >
          <a :href="nav.link" >{{ nav.text }}</a>
        </li>
      </ul>
    </nav>

    <div class="mobile-nav-toggle" @click="toggleMobileNav" />
    <div class="mobile-nav" :class="{ 'mobile-nav--active': mobileNavActive }">
      <nav>
        <ul @click="toggleMobileNav">
          <router-link
            v-for="nav in navLinks"
            :key="nav.text"
            v-if="!nav.external"
            tag="li"
            :to="nav.link"
            active-class="active"
            v-text="nav.text"
            exact
          />
          <li v-for="nav in navLinks" v-if="nav.external" @click="toggleMobileNav">
            <a :href="nav.link" target="_blank">{{ nav.text }}</a>
          </li>
        </ul>
        <div class="mobile-nav-close" @click="toggleMobileNav" />
      </nav>
    </div>
  </header>
</template>

<script>
import Logo from '../public/upload/logo.svg';

export default {
  props: {
    logo: {
      type: String,
      required: false
    },
    sticky: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      mobileNavActive: false
    };
  },
  computed: {
    navLinks() {
      return this.$site.themeConfig.nav;
    }
  },
  methods: {
    toggleMobileNav() {
      this.mobileNavActive = !this.mobileNavActive;
    }
  },
  components: {
    Logo,
  }
};
</script>

<style scoped>
.header {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  padding-left: 2vw;
  padding-right: 2vw;
  padding-top: 0.5vw;
  padding-bottom: 0.5vw;
  font-size: 0.8rem;
  font-weight: 600;
  z-index: 10;
  color: var(--color-white);
}

.brand {
  text-align: center;
  color: var(--color-white);
  text-transform: uppercase;
  display: flex;
  align-items: center;
}

.brand:visited {
  color: var(--color-white)
}

.logo {
  width: 3rem;
  height: 3rem;
  margin-right: 1rem;
}

.navigation {
  height: 3rem;
  display: flex;
  align-items: center;
}

.navigation li {
  display: inline-block;
  list-style: none;
  margin-right: 1.5rem;
  user-select: none;
  cursor: pointer;
  font-family: Montserrat-SemiBold,Montserrat;
}

.navigation li:last-of-type {
  margin: 0;
}

.navigation li:hover {
  border-bottom: 1px solid #000;
}

.active {
  border-bottom: 1px solid #000;
}

a {
  text-decoration: none;
  color: inherit;
}

a:active {
  color: inherit;
}
a:visited {
  color: inherit;
}

.desktop-nav {
  display: none;
}

.mobile-nav {
  display: block;
  position: absolute;
  background: #ffffff;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 2rem;
  transform: translateY(-100%);
  transition: transform 0.35s ease-in-out;
  text-align: center;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 2;
}

.mobile-nav li {
  list-style: none;
  cursor: pointer;
  transition: opacity 0.15s;
}

.mobile-nav li:hover {
  opacity: 0.6;
}

.mobile-nav--active {
  transform: translateY(0);
}

.mobile-nav-close {
  position: absolute;
  content: "";
  right: 0;
  top: 0;
  width: 3rem;
  height: 3rem;
  padding: 3rem;
  background-image: url("/close.svg");
  background-position: center;
  background-size: 1.5rem;
  background-repeat: no-repeat;
  transition: opacity 0.15s;
  cursor: pointer;
}

.mobile-nav-toggle {
  display: block;
  width: 3rem;
  height: 3rem;
  background-image: url("/burger.svg");
  background-position: center;
  background-size: 1.5rem;
  background-repeat: no-repeat;
  transition: opacity 0.15s;
  cursor: pointer;
}

.mobile-nav-toggle:hover,
.mobile-nav-close:hover {
  opacity: 0.6;
}

@media screen and (min-width: 600px) {
  .desktop-nav {
    display: block;
  }
  .mobile-nav-toggle {
    display: none;
  }
  .mobile-nav {
    display: none;
  }
}
</style>
