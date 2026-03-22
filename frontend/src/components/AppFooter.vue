<template>
  <footer class="footer">
    <div class="footer__glass">
      <div class="footer__inner">
        <div class="footer__grid">
          <div class="footer__brand">
            <div class="footer__logo">Новое Конаково</div>
            <p class="footer__tagline">Тихий отдых • Природа • Внимание к деталям</p>
          </div>

          <nav class="footer__nav" aria-label="Навигация">
            <router-link class="footer__link" to="/about">Обо мне</router-link>
            <router-link class="footer__link" to="/brotherhood">Братство лосей</router-link>
            <router-link class="footer__link" to="/volunteer">Волонтерские программы</router-link>
            <router-link class="footer__link" to="/running-club">Беговой клуб</router-link>
            <router-link class="footer__link" to="/schedule">Расписание занятий</router-link>
            <router-link class="footer__link" to="/articles">Статьи / Видео</router-link>
            <router-link class="footer__link" to="/news">Новости</router-link>
            <router-link class="footer__link" to="/contacts">Контакты</router-link>
          </nav>

          <div class="footer__contacts">
            <div class="footer__contact-item">
              <span class="footer__label">Телефон</span>
              <span>+7 (985) 200-63-22</span>
            </div>
            <div class="footer__contact-item">
              <span class="footer__label">Email</span>
              <span>elizaveta-struchkova@yandex.ru</span>
            </div>
            <div class="footer__contact-item">
              <span class="footer__label">Telegram</span>
              <a
                :href="TELEGRAM_URL"
                target="_blank"
                rel="noopener noreferrer"
                class="telegram-link"
              >
                {{ TELEGRAM_USERNAME }}
              </a>
            </div>
          </div>
        </div>

        <div class="footer__bottom">
          <span>© {{ year }} New Konakovo. Все права защищены.</span>
          <div class="footer__bottom-links">
            <router-link class="footer__link footer__link--small" to="/privacy">Политика</router-link>
            <router-link class="footer__link footer__link--small" to="/terms">Условия</router-link>
            <button class="footer__to-top" type="button" @click="scrollToTop">↑</button>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
const TELEGRAM_URL = "https://t.me/novoe_konakovo"
const TELEGRAM_USERNAME = "@novoe_konakovo"

const scrollToTop = () => {
  if (typeof window === 'undefined') return
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
}
</script>

<style scoped>
.footer {
  width: 100%;
  padding: 56px 16px 32px;
  background: var(--bg);
  color: var(--text);
}

.footer__glass {
  background: linear-gradient(
      140deg,
      color-mix(in srgb, var(--card) 82%, transparent),
      color-mix(in srgb, var(--bg) 35%, transparent),
      color-mix(in srgb, var(--card) 68%, transparent)
    );
  border: 1px solid color-mix(in srgb, var(--border) 72%, transparent);
  border-radius: 24px;
  box-shadow: 0 -16px 34px color-mix(in srgb, var(--shadow) 85%, transparent);
  backdrop-filter: blur(18px);
  position: relative;
  overflow: hidden;
}

.footer__glass::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
      circle at 12% 0%,
      rgba(255, 255, 255, 0.16),
      transparent 55%
    ),
    radial-gradient(circle at 90% 20%, rgba(255, 255, 255, 0.08), transparent 50%);
  opacity: 0.6;
  pointer-events: none;
}

.footer__glass::after {
  content: '';
  position: absolute;
  left: 8%;
  right: 8%;
  top: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    color-mix(in srgb, var(--border) 60%, transparent),
    transparent
  );
  pointer-events: none;
}

.footer__inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 28px;
  display: grid;
  gap: 28px;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
}

.footer__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 36px;
  align-items: start;
}

.footer__logo {
  font-size: 26px;
  font-weight: 650;
  letter-spacing: -0.01em;
  color: var(--text-strong);
  margin-bottom: 8px;
}

.footer__tagline {
  margin: 0;
  color: var(--muted);
  font-size: 13.5px;
}

.footer__nav {
  display: grid;
  gap: 10px 18px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.footer__link {
  position: relative;
  color: var(--text);
  font-size: 12.5px;
  line-height: 1.65;
  padding-bottom: 2px;
  width: fit-content;
  opacity: 0.9;
}

.footer__link::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -2px;
  height: 2px;
  background: color-mix(in srgb, var(--primary) 75%, transparent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 220ms ease;
}

.footer__link:hover::after,
.footer__link:focus-visible::after {
  transform: scaleX(1);
}

.footer__contacts {
  display: grid;
  gap: 12px;
  color: var(--text);
  font-size: 12.5px;
}

.footer__contact-item {
  display: grid;
  gap: 4px;
}

.footer__label {
  font-size: 11px;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.telegram-link {
  color: inherit;
  text-decoration: none;
}

.telegram-link:hover {
  text-decoration: underline;
}

.footer__bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  color: var(--muted);
  font-size: 12px;
  border-top: 1px solid color-mix(in srgb, var(--border) 55%, transparent);
  padding-top: 20px;
}

.footer__bottom-links {
  display: inline-flex;
  align-items: center;
  gap: 14px;
}

.footer__link--small {
  font-size: 12px;
}

.footer__to-top {
  border: 1px solid color-mix(in srgb, var(--border) 70%, transparent);
  background: color-mix(in srgb, var(--card) 70%, transparent);
  color: var(--text);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  transition: box-shadow 200ms ease, background 200ms ease;
}

.footer__to-top:hover {
  box-shadow: 0 8px 16px var(--shadow);
  background: color-mix(in srgb, var(--card) 85%, transparent);
}

@media (max-width: 900px) {
  .footer__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 600px) {
  .footer {
    padding: 32px 12px 24px;
  }

  .footer__inner {
    padding: 24px 18px;
  }

  .footer__grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .footer__bottom {
    flex-direction: column;
    align-items: flex-start;
  }

  .footer__nav {
    grid-template-columns: 1fr;
  }
}
</style>
