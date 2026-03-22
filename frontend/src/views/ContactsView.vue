<script setup>
import { onBeforeUnmount, ref } from "vue";
import AppHeader from "../components/AppHeader.vue";
import AppFooter from "../components/AppFooter.vue";
import PageTemplate from "../components/PageTemplate.vue";

const API_ORIGIN = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
const LEADS_ENDPOINT = `${API_ORIGIN}/api/leads/`;
const TELEGRAM_URL = "https://t.me/novoe_konakovo";
const TELEGRAM_USERNAME = "@novoe_konakovo";
const submitError = ref("");
const isSubmitting = ref(false);
const success = ref(false);
const successTimerId = ref(null);

const clearSuccessTimer = () => {
  if (successTimerId.value) {
    clearTimeout(successTimerId.value);
    successTimerId.value = null;
  }
};

const pageData = {
  title: "Контакты",
  subtitle:
    "Мы на связи и рады помочь. Пишите или приезжайте в «Новое Конаково» — здесь всегда найдётся место для тёплой встречи.",
  heroImage: "/1.jpeg",
  sections: [
    {
      title: "Адрес",
      text: "Тверская область, Конаковский район, природный кластер «Новое Конаково».",
    },
    {
      title: "Связаться с нами",
      text: "Телефон: +7 (985) 200-63-22 · Email: elizaveta-struchkova@yandex.ru",
      action: { label: "Написать", href: "mailto:elizaveta-struchkova@yandex.ru" },
    },
    {
      title: "Время работы",
      text: "Ежедневно с 09:00 до 20:00, по предварительной записи.",
    },
  ],
  gallery: ["/1.jpeg", "/2.jpeg", "/3.jpeg", "/5.jpeg"],
};

const handleSubmit = async (event) => {
  const form = event.target;
  form.classList.add("is-submitted");
  submitError.value = "";
  success.value = false;
  if (!form.checkValidity() || isSubmitting.value) return;

  const payload = {
    name: form.name.value,
    contact: form.contact.value,
    message: form.message.value,
  };

  try {
    isSubmitting.value = true;

    const response = await fetch(LEADS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      let message = "Не удалось отправить заявку. Попробуйте снова.";

      try {
        const errorData = await response.json();
        if (errorData && typeof errorData === "object") {
          const firstError = Object.values(errorData).find((value) => Array.isArray(value) && value.length > 0);
          if (Array.isArray(firstError)) {
            message = String(firstError[0]);
          }
        }
      } catch (parseError) {
        // Ignore parsing errors and keep default message.
      }

      throw new Error(message);
    }

    await response.json();
    form.reset();
    form.classList.remove("is-submitted");
    success.value = true;
    clearSuccessTimer();
    successTimerId.value = setTimeout(() => {
      success.value = false;
      successTimerId.value = null;
    }, 3000);
  } catch (error) {
    submitError.value = error instanceof Error ? error.message : "Не удалось отправить заявку. Попробуйте снова.";
  } finally {
    isSubmitting.value = false;
  }
};

onBeforeUnmount(() => {
  clearSuccessTimer();
});
</script>

<template>
  <AppHeader />
  <PageTemplate v-bind="pageData" />

  <section class="contacts">
    <div class="contacts__head">
      <h2 class="contacts__title">Контакты</h2>
      <p class="contacts__subtitle">Как нас найти и связаться.</p>
    </div>

    <div class="contacts__grid">
      <div class="contacts__column">
        <div class="contacts__card glass-card">
          <div class="contacts__list">
            <div class="contacts__item">
              <span class="contacts__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
              </span>
              <div>
                <p class="contacts__label">Адрес</p>
                <p class="contacts__value">
                  Тверская область, Конаковский район, природный кластер «Новое Конаково».
                </p>
              </div>
            </div>

            <div class="contacts__item">
              <span class="contacts__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path
                    d="M4.5 6.5c0 6.6 5.4 12 12 12h2.5a1 1 0 0 0 1-1v-3.2a1 1 0 0 0-.76-.97l-3.1-.78a1 1 0 0 0-1.05.43l-1 1.5a10.7 10.7 0 0 1-4.6-4.6l1.5-1a1 1 0 0 0 .43-1.05l-.78-3.1A1 1 0 0 0 9 4.5H5.5a1 1 0 0 0-1 1v1z"
                  />
                </svg>
              </span>
              <div>
                <p class="contacts__label">Телефон</p>
                <p class="contacts__value">+7 (985) 200-63-22</p>
              </div>
            </div>

            <div class="contacts__item">
              <span class="contacts__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
                  <path d="m22 8-10 6L2 8" />
                </svg>
              </span>
              <div>
                <p class="contacts__label">Email</p>
                <p class="contacts__value">elizaveta-struchkova@yandex.ru</p>
              </div>
            </div>

            <div class="contacts__item">
              <span class="contacts__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M21.5 4.5 3.3 11.5c-.8.3-.8 1.4.1 1.6l4.6 1.3 1.6 4.9c.2.9 1.4 1 1.8.2l2.5-4.2 4.8 3.4c.8.5 1.8.1 2-.8l2.6-11.6c.2-.9-.7-1.6-1.6-1.3z" />
                </svg>
              </span>
              <div>
                <p class="contacts__label">Telegram</p>
                <p class="contacts__value">
                  <a
                    :href="TELEGRAM_URL"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="telegram-link"
                  >
                    {{ TELEGRAM_USERNAME }}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="contacts__card contacts__card--map glass-card">
          <iframe
            class="contacts__frame"
            src="https://yandex.com/map-widget/v1/?ll=4.892559%2C52.373059&z=10"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            allowfullscreen
            title="Карта — Конаково"
          ></iframe>

          <a class="contacts__cta btn-secondary" href="https://yandex.com/maps/-/CCU05ZxoWA" target="_blank" rel="noopener">
            Открыть в Яндекс Картах
          </a>
        </div>
      </div>

      <form id="contact-form" class="contacts__form glass-card" novalidate @submit.prevent="handleSubmit">
        <label class="contacts__field">
          <span class="contacts__field-label">Имя</span>
          <input class="contacts__input" type="text" name="name" placeholder=" " autocomplete="name" required />
        </label>

        <label class="contacts__field">
          <span class="contacts__field-label">Телефон или Email</span>
          <input class="contacts__input" type="text" name="contact" placeholder=" " autocomplete="email" required />
        </label>

        <label class="contacts__field">
          <span class="contacts__field-label">Сообщение</span>
          <textarea class="contacts__input contacts__input--area" name="message" rows="5" placeholder=" " required></textarea>
        </label>

        <button class="contacts__submit btn-primary" type="submit" :disabled="isSubmitting">Отправить</button>
        <p v-if="success" class="form-success">Отправлено</p>
        <p v-if="submitError">{{ submitError }}</p>
      </form>
    </div>
  </section>
  <AppFooter />
</template>

<style scoped>
.contacts {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 24px 80px;
  display: grid;
  gap: 20px;
  color: var(--text);
}

.contacts__head {
  display: grid;
  gap: 6px;
}

.contacts__title {
  margin: 0;
  font-size: 22px;
  color: var(--text-strong);
}

.contacts__subtitle {
  margin: 0;
  font-size: 13px;
  color: var(--muted);
}

.contacts__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
  gap: 20px;
  align-items: start;
}

.contacts__column {
  display: grid;
  gap: 18px;
}

.contacts__card {
  padding: 18px;
  display: grid;
  gap: 16px;
}

.contacts__list {
  display: grid;
  gap: 14px;
}

.contacts__item {
  display: grid;
  grid-template-columns: 36px 1fr;
  gap: 12px;
  align-items: start;
}

.contacts__icon {
  width: 36px;
  height: 36px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: color-mix(in srgb, var(--bg-elevated) 65%, transparent);
  color: var(--text-strong);
  border: 1px solid color-mix(in srgb, var(--border) 70%, transparent);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.35);
}

.contacts__label {
  margin: 0 0 4px;
  font-size: 12px;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.contacts__value {
  margin: 0;
  font-size: 14px;
  color: var(--text);
  line-height: 1.5;
}

.telegram-link {
  color: inherit;
  text-decoration: none;
}

.telegram-link:hover {
  text-decoration: underline;
}

.contacts__card--map {
  padding: 14px;
}

.contacts__frame {
  width: 100%;
  aspect-ratio: 16 / 9;
  border: 0;
  border-radius: 16px;
}

.contacts__cta {
  justify-self: flex-start;
}

.contacts__form {
  padding: 22px;
  display: grid;
  gap: 16px;
}

.contacts__field {
  display: grid;
  gap: 8px;
}

.contacts__field-label {
  font-size: 12px;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.contacts__input {
  width: 100%;
  border-radius: 14px;
  border: 1px solid color-mix(in srgb, var(--border) 70%, transparent);
  background: color-mix(in srgb, var(--bg-elevated) 70%, transparent);
  padding: 12px 14px;
  font-size: 14px;
  color: var(--text);
  outline: none;
  transition: border-color 200ms ease, box-shadow 200ms ease, background 200ms ease;
}

.contacts__input--area {
  resize: vertical;
  min-height: 130px;
}

.contacts__input:focus-visible {
  border-color: color-mix(in srgb, var(--primary) 60%, var(--border));
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary) 20%, transparent);
  background: color-mix(in srgb, var(--bg-elevated) 82%, transparent);
}

.contacts__form.is-submitted .contacts__input:invalid {
  border-color: color-mix(in srgb, var(--color-warm-brown) 60%, var(--border));
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-warm-brown) 20%, transparent);
}

.contacts__submit {
  justify-self: flex-start;
}

.form-success {
  color: #2e7d32;
  font-size: 14px;
  margin-top: 10px;
}

@media (max-width: 900px) {
  .contacts__grid {
    grid-template-columns: 1fr;
  }

  .contacts__submit {
    width: 100%;
    justify-self: stretch;
  }
}

@media (max-width: 640px) {
  .contacts__frame {
    aspect-ratio: 4 / 5;
  }
}
</style>
