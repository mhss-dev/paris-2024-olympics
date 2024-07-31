<template>

  <Header />
  <Cards />
  <Faq />

</template>

<script>
import Cards from "@/components/Cards.vue";
import Faq from "@/components/Faq.vue";
import Header from "@/components/Header.vue";

export default {

  components: {
    Header,
    Faq,
    Cards
  }
}
</script>