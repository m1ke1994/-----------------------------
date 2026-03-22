<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  heroImage: { type: String, default: '' },
  stats: { type: Array, default: () => [] },
  highlights: { type: Array, default: () => [] },
  quote: { type: Object, default: null },
  timeline: { type: Array, default: () => [] },
  sections: { type: Array, default: () => [] },
  gallery: { type: Array, default: () => [] },
  galleryTitle: { type: String, default: 'Галерея' },
  gallerySubtitle: { type: String, default: 'Кадры атмосферы и пространства.' },
  cta: { type: Object, default: null },
})

let preloadLink = null
let galleryObserver = null

const galleryRef = ref(null)
const isGalleryVisible = ref(false)

const heroStyle = computed(() => ({
  backgroundImage: props.heroImage
    ? `linear-gradient(180deg, rgba(12, 9, 7, 0.65), rgba(12, 9, 7, 0.15)), url(${props.heroImage})`
    : 'linear-gradient(180deg, rgba(12, 9, 7, 0.65), rgba(12, 9, 7, 0.15))',
}))

const markImageLoaded = (event) => {
  event.target.classList.add('is-loaded')
}

const preloadHeroImage = () => {
  if (typeof document === 'undefined' || !props.heroImage) return
  preloadLink = document.createElement('link')
  preloadLink.rel = 'preload'
  preloadLink.as = 'image'
  preloadLink.href = props.heroImage
  document.head.appendChild(preloadLink)
}

onMounted(() => {
  preloadHeroImage()
  if (typeof window === 'undefined') return
  if (!('IntersectionObserver' in window) || !galleryRef.value) {
    isGalleryVisible.value = true
    return
  }
  galleryObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isGalleryVisible.value = true
        galleryObserver?.disconnect()
      }
    },
    { rootMargin: '200px 0px', threshold: 0.01 }
  )
  galleryObserver.observe(galleryRef.value)
})

onUnmounted(() => {
  preloadLink?.remove()
  galleryObserver?.disconnect()
})
</script>

<template>
  <section class="page">
    <header class="page__hero" :style="heroStyle">
      <div class="page__hero-inner" v-reveal>
        <h1 class="page__title">{{ title }}</h1>
        <p v-if="subtitle" class="page__subtitle">{{ subtitle }}</p>
        <div v-if="stats.length" class="page__stats">
          <div v-for="stat in stats" :key="stat.label" class="page__stat" v-reveal>
            <div class="page__stat-value">{{ stat.value }}</div>
            <div class="page__stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </header>

    <div class="page__content">
      <div v-if="highlights.length" class="page__highlights">
        <article v-for="item in highlights" :key="item.title" class="page__highlight glass-card" v-reveal>
          <h2 class="page__highlight-title">{{ item.title }}</h2>
          <p class="page__highlight-text">{{ item.text }}</p>
        </article>
      </div>

      <blockquote v-if="quote" class="page__quote" v-reveal>
        <p class="page__quote-text">{{ quote.text }}</p>
        <footer class="page__quote-author">{{ quote.author }}</footer>
      </blockquote>

      <div v-if="timeline.length" class="page__timeline">
        <article v-for="item in timeline" :key="item.year" class="page__timeline-item" v-reveal>
          <div class="page__timeline-year">{{ item.year }}</div>
          <div>
            <h3 class="page__timeline-title">{{ item.title }}</h3>
            <p class="page__timeline-text">{{ item.text }}</p>
          </div>
        </article>
      </div>

      <div v-if="sections.length" class="page__sections">
        <article v-for="section in sections" :key="section.title" class="page__section glass-card" v-reveal>
          <h2 class="page__section-title">{{ section.title }}</h2>
          <p class="page__section-text">{{ section.text }}</p>
          <a v-if="section.action" class="page__action btn-secondary" :href="section.action.href">{{ section.action.label }}</a>
          <div v-if="section.isMap" class="page__map">Map placeholder</div>
        </article>
      </div>

      <section v-if="gallery.length" ref="galleryRef" class="page__gallery-block">
        <div class="page__gallery-head" v-reveal>
          <div>
            <h2 class="page__gallery-title">{{ galleryTitle }}</h2>
            <p v-if="gallerySubtitle" class="page__gallery-subtitle">{{ gallerySubtitle }}</p>
          </div>
          <span class="page__gallery-count">{{ gallery.length }} фото</span>
        </div>

        <div class="page__gallery">
          <div v-for="(image, index) in gallery" :key="`${image}-${index}`" class="page__gallery-item" v-reveal>
            <img
              v-if="isGalleryVisible"
              :src="image"
              alt="Фото галереи"
              loading="lazy"
              decoding="async"
              fetchpriority="low"
              width="800"
              height="600"
              class="img-lazy"
              @load="markImageLoaded"
            />
          </div>
        </div>
      </section>

      <div v-if="cta" class="page__cta glass-card" v-reveal>
        <h2 class="page__cta-title">{{ cta.title }}</h2>
        <p class="page__cta-text">{{ cta.text }}</p>
        <button v-if="cta.buttonText" class="page__cta-button btn-primary" type="button">
          {{ cta.buttonText }}
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.page {
  background: var(--bg);
  color: var(--text);
  padding-top: var(--header-h, 72px);
  min-height: 100vh;
}

.page__hero {
  min-height: 320px;
  display: flex;
  align-items: flex-end;
  background-size: cover;
  background-position: center;
  padding: 80px 24px 40px;
  box-sizing: border-box;
}

.page__hero-inner {
  max-width: var(--container-max);
  margin: 0 auto;
  width: 100%;
}

.page__title {
  font-size: 32px;
  margin: 0 0 12px;
  color: var(--color-background-light);
}

.page__subtitle {
  margin: 0;
  max-width: 760px;
  color: rgba(247, 242, 234, 0.92);
  line-height: 1.6;
}

.page__stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
  margin-top: 20px;
}

.page__stat {
  background: color-mix(in srgb, var(--card) 70%, transparent);
  border-radius: 14px;
  padding: 12px 14px;
  backdrop-filter: blur(10px);
}

.page__stat-value {
  font-weight: 600;
}

.page__stat-label {
  font-size: 12px;
  color: var(--muted);
}

.page__content {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 40px 24px 80px;
  display: grid;
  gap: 28px;
  box-sizing: border-box;
}

.page__highlights {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 18px;
}

.page__highlight {
  padding: 16px 18px;
}

.page__highlight-title {
  margin: 0 0 8px;
  font-size: 16px;
}

.page__highlight-text {
  margin: 0;
  color: var(--muted);
  line-height: 1.6;
}

.page__quote {
  margin: 0;
  padding: 18px 20px;
  border-left: 3px solid var(--primary);
  background: var(--bg-elevated);
  border-radius: 14px;
}

.page__quote-text {
  margin: 0 0 8px;
}

.page__quote-author {
  font-size: 12px;
  color: var(--muted);
}

.page__timeline {
  display: grid;
  gap: 16px;
}

.page__timeline-item {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 16px;
  align-items: start;
}

.page__timeline-year {
  font-weight: 600;
  color: var(--text-strong);
}

.page__timeline-title {
  margin: 0 0 6px;
  font-size: 16px;
}

.page__timeline-text {
  margin: 0;
  color: var(--muted);
  line-height: 1.6;
}

.page__sections {
  display: grid;
  gap: 18px;
}

.page__section {
  padding: 18px 20px;
}

.page__section-title {
  margin: 0 0 8px;
  font-size: 18px;
}

.page__section-text {
  margin: 0 0 10px;
  color: var(--muted);
  line-height: 1.6;
}

.page__action {
  display: inline-flex;
}

.page__map {
  margin-top: 12px;
  background: var(--bg-elevated);
  border-radius: 12px;
  padding: 18px;
  color: var(--muted);
}

.page__gallery-block {
  display: grid;
  gap: 14px;
}

.page__gallery-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
}

.page__gallery-title {
  margin: 0;
  font-size: 22px;
  color: var(--text-strong);
}

.page__gallery-subtitle {
  margin: 4px 0 0;
  color: var(--muted);
  font-size: 14px;
}

.page__gallery-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  padding: 6px 12px;
  border: 1px solid var(--border);
  background: color-mix(in srgb, var(--card) 72%, transparent);
  font-size: 12px;
  color: var(--text);
  backdrop-filter: blur(10px);
}

.page__gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
}

.page__gallery-item {
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 10px 18px var(--shadow);
  background: rgba(0, 0, 0, 0.06);
  aspect-ratio: 4 / 3;
}

.page__gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.page__cta {
  padding: 20px;
}

.page__cta-title {
  margin: 0 0 8px;
  font-size: 18px;
}

.page__cta-text {
  margin: 0 0 12px;
  color: var(--muted);
}

@media (max-width: 768px) {
  .page__hero {
    padding: 72px 20px 32px;
  }

  .page__title {
    font-size: 26px;
  }

  .page__gallery-head {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
