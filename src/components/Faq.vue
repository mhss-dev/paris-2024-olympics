<template>
  <div id="faq" class="text-center mb-5 pt-5 pb-5 border-top">
    <h1 class="display-3 font-weight-bold">{{ $t('faq.title') }}</h1>
    <p class="lead text-muted">{{ $t('faq.subtitle') }}</p>
  </div>
  <div class="container pb-5">
    <div class="accordion" id="accordionTrigger">
      <div v-for="(question, index) in questions" :key="index" class="accordion-item">
        <h2 class="accordion-header" :id="'heading' + index">
          <button 
            class="accordion-button" 
            type="button" 
            :data-bs-toggle="'collapse'" 
            :data-bs-target="'#collapse' + index" 
            :aria-expanded="index === 0 ? 'true' : 'false'" 
            :aria-controls="'collapse' + index">
            {{ question.label }}
          </button>
        </h2>
        <div 
          :id="'collapse' + index" 
          class="accordion-collapse collapse" 
          :class="{ show: index === 0 }" 
          :aria-labelledby="'heading' + index" 
          data-bs-parent="#accordionTrigger">
          <div class="accordion-body">
            {{ question.body }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { ref, watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import axios from 'axios';

export default {
  setup() {
    const { t, locale } = useI18n();
    const questions = ref(null);

    const fetchFaq = async () => {
      const currentLocale = locale.value;
      const langCode = currentLocale === 'fr' ? 'fr' : 'en';

      try {
        const response = await axios.get(`https://data.paris2024.org/api/explore/v2.1/catalog/datasets/paris-2024-faq/records?limit=10&refine=lang%3A%22${langCode}%22`);
        questions.value = response.data.results.map(item => ({
          label: item.label,
          body: item.body,
          url: item.url
        }));
      } catch (error) {
        console.error('Error fetching FAQ:', error);
      }
    };
    onMounted(() => {
      fetchFaq();
    });

    watch(() => locale.value, () => {
      fetchFaq();
    });

    return {
      t,
      questions
    };
  }
  
};
</script>