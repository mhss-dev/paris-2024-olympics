<template>

<div class="container-fluid px-4 py-5 text-center bg-body-secondary">
		<img class="d-block mx-auto mb-4 mt-5" src="../assets/logo.png" alt="">
		<div class="col-lg-6 mx-auto pb-5">
			<p class="lead mb-4">{{ t('header.title') }}</p>
			<div class="d-sm-flex justify-content-sm-center">
			</div>
		</div>
	</div>

</template>

<script>
import { useI18n } from 'vue-i18n';

export default {
    setup() {
        const { t } = useI18n();
        return {
            t,
        }
    }
}
</script>