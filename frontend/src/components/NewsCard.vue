<script setup>
import { computed } from "vue";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const formattedDate = computed(() =>
  new Date(props.item.published_date).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
);
</script>

<template>
  <article class="news-card glass-card">
    <img class="news-card__image" :src="item.image" :alt="item.title" loading="lazy" decoding="async" />
    <div class="news-card__content">
      <p class="news-card__date">{{ formattedDate }}</p>
      <h3 class="news-card__title">{{ item.title }}</h3>
      <p class="news-card__description">{{ item.description }}</p>
      <router-link class="news-card__action btn-outline" :to="`/news/${item.slug}`">Читать дальше</router-link>
    </div>
  </article>
</template>

<style scoped>
.news-card {
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.news-card__image {
  width: 100%;
  height: 215px;
  object-fit: cover;
  display: block;
}

.news-card__content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
}

.news-card__date {
  margin: 0;
  font-size: 12px;
  color: var(--muted);
}

.news-card__title {
  margin: 0;
  font-size: 21px;
  line-height: 1.25;
  color: var(--text-strong);
}

.news-card__description {
  margin: 0;
  font-size: 14px;
  line-height: 1.55;
  color: var(--muted);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-card__action {
  align-self: flex-start;
  margin-top: auto;
}

@media (max-width: 768px) {
  .news-card__image {
    height: 190px;
  }

  .news-card__title {
    font-size: 19px;
  }
}
</style>
