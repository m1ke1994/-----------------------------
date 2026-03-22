from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/pages/", include("pages.urls")),
    path("api/", include("orders.urls")),
    path("api/", include("core.urls")),
]

# ВАЖНО: media должны раздаваться всегда, не только при DEBUG
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
