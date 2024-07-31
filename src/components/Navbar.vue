<template>
  <div class="container-fluid px-0 text-uppercase">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark w-100">
      <div
        class="container-fluid d-flex justify-content-between align-items-center"
      >
        <ul class="nav nav-pills mb-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link text-white" aria-current="page">
              <i class="fas fa-home"></i> {{ $t("navbar.home") }}
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              :to="{ path: '/', hash: '#competitions' }"
              class="nav-link text-white"
            >
            <i class="fas fa-trophy"></i> {{ $t("navbar.competitions") }}
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              :to="{ path: '/', hash: '#faq' }"
              class="nav-link text-white">
            <i class="fas fa-question-circle"></i> {{ $t("navbar.faq") }}
            </router-link>
          </li>
        </ul>
        <div class="d-flex gap-3">
    <a
      class="nav-link text-white"
      :class="{ active: currentLocale === 'en' }"
      @click="switchLanguage('en')"
    >
      {{ $t('navbar.english') }}
    </a>
    <a
      class="nav-link text-white" @click="switchLanguage('fr')"
>
      {{ $t('navbar.french') }}
    </a>
  </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { useI18n } from "vue-i18n";

export default {
  setup() {
    const { t, locale } = useI18n();
    const switchLanguage = (lang) => {
      locale.value = lang;

      localStorage.setItem("preferred-language", lang);
    };

    const storedLanguage = localStorage.getItem("preferred-language");
    if (storedLanguage) {
      locale.value = storedLanguage;
    }

    return {
      switchLanguage,
      t,
      locale,
    };
  },
};
</script>

<style>
.nav-link {
  cursor: pointer;
}
</style>
