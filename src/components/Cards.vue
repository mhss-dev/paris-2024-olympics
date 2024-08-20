<template>
  <div id="competitions" class="container my-5">
    <div class="text-center mb-5 pb-5">
      <h1 class="display-3 font-weight-bold">{{ $t("cards.title") }}</h1>
      <p class="lead text-muted">{{ $t("cards.subtitle") }}</p>
    </div>

    <div class="row justify-content-center">
      <div v-for="site in paginatedSites" class="col-lg-4 col-md-6 mb-4">
        <div class="card border-0 shadow-lg rounded-lg h-100">
          <!-- <img :src="getImage(site.picture)"
           class="card-img-top img-fluid"/> -->
          <div class="card-body d-flex flex-column">
            <h5 class="card-title text-center">{{ site.title }}</h5>
            <p class="card-text text-muted text-center">{{ site.subtitle }}</p>
            <p class="truncated-text">{{ site.description }}</p>
            <router-link
              :to="{ name: 'Details', params: { id: site.id } }"
              class="btn btn-primary mt-auto"
            >
              {{ $t("cards.more") }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>

  <nav aria-label="Page navigation" class="pb-5">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <a
          class="page-link"
          href="#"
          @click.prevent="changePage(currentPage - 1)"
          >{{ $t("cards.previous") }}</a
        >
      </li>
      <li
        class="page-item"
        v-for="page in totalPages"
        :key="page"
        :class="{ active: currentPage === page }"
      >
        <a class="page-link" href="#" @click.prevent="changePage(page)">{{
          page
        }}</a>
      </li>
      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <a
          class="page-link"
          href="#"
          @click.prevent="changePage(currentPage + 1)"
          >{{ $t("cards.next") }}</a
        >
      </li>
    </ul>
  </nav>
</template>

<script>
import Faq from "@/components/Faq.vue";
import axios from "axios";

export default {
  components: {
    Faq,
  },
  data() {
    return {
      sites: [],
      currentPage: 1,
      itemsPerPage: 3,
    };
  },
  computed: {
    paginatedSites() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.sites.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.sites.length / this.itemsPerPage);
    },
  },
  methods: {
    async fetchSites() {
      const currentLocale = this.$i18n.locale;
      const langCode = currentLocale === "fr" ? "fr_FR" : "en_GB";

      try {
        const response = await axios.get(
          `https://data.paris2024.org/api/explore/v2.1/catalog/datasets/paris-2024-centres-de-preparation-aux-jeux/records?limit=20&refine=lang%3A%22${langCode}%22`
        );
        this.sites = response.data.results;
        this.validateCurrentPage();
      } catch (error) {
        console.error("Erreur :", error);
      }
    },
    getImage(picture) {
      try {
        const pictureObj = JSON.parse(picture);
        console.log(pictureObj.src);
        return pictureObj.src;
      } catch (e) {
        console.error("Erreur :", e);
        return "";
      }
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    validateCurrentPage() {
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
      }
    },
  },
  watch: {
    '$i18n.locale': 'fetchSites'
  },
  mounted() {
    this.fetchSites();
  },
};
</script>

<style>
.card {
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: transform 0.3s ease-in-out;
}

.card:hover {
  transform: translateY(-5px);
}

.card-img-top {
  height: 200px;
  object-fit: cover;
}

.card-body {
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
}

.btn-primary {
  border: none;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.truncated-text {
  display: -webkit-box;
  -webkit-line-clamp: 7;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
