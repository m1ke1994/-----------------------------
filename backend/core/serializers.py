from rest_framework import serializers

from .models import (
    Article,
    HeroBlock,
    News,
    Review,
    ScheduleDay,
    ScheduleEvent,
    Service,
    ServiceImage,
    SiteSettings,
    Tariff,
)


class HeroBlockSerializer(serializers.ModelSerializer):
    background_image = serializers.SerializerMethodField()
    avatar = serializers.SerializerMethodField()

    class Meta:
        model = HeroBlock
        fields = ("id", "title", "description", "background_image", "avatar")

    def _absolute_url(self, media_field):
        if not media_field:
            return None
        request = self.context.get("request")
        if request is None:
            return media_field.url
        return request.build_absolute_uri(media_field.url)

    def get_background_image(self, obj):
        return self._absolute_url(obj.background_image)

    def get_avatar(self, obj):
        return self._absolute_url(obj.avatar)


class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = ("phone", "email", "telegram_url", "telegram_username")


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = "__all__"


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = "__all__"


class ArticleListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = (
            "title",
            "slug",
            "preview_image",
            "preview_description",
            "content_type",
            "published_date",
            "created_at",
        )


class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = "__all__"


class NewsListSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = ("id", "title", "slug", "description", "image", "published_date")


class TariffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tariff
        fields = ("id", "title", "slug", "description", "duration", "price", "order")


class ServiceImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = ServiceImage
        fields = ("id", "image", "image_url", "order")

    def get_image_url(self, obj):
        if not obj.image:
            return None

        request = self.context.get("request")
        if request is None:
            return obj.image.url

        return request.build_absolute_uri(obj.image.url)


class ServiceSerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()
    tariffs = TariffSerializer(many=True, read_only=True)
    images = ServiceImageSerializer(many=True, read_only=True)
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Service
        fields = (
            "id",
            "title",
            "slug",
            "description",
            "image",
            "image_url",
            "is_category",
            "order",
            "children",
            "tariffs",
            "images",
        )

    def get_children(self, obj):
        children = obj.children.all().order_by("order")
        return ServiceSerializer(children, many=True, context=self.context).data

    def get_image_url(self, obj):
        if not obj.image:
            return None

        request = self.context.get("request")
        if request is None:
            return obj.image.url

        return request.build_absolute_uri(obj.image.url)


class ScheduleEventSerializer(serializers.ModelSerializer):
    time_start = serializers.TimeField(format="%H:%M")
    time_end = serializers.TimeField(format="%H:%M")
    image = serializers.SerializerMethodField()

    class Meta:
        model = ScheduleEvent
        fields = (
            "id",
            "time_start",
            "time_end",
            "title",
            "category",
            "description",
            "price",
            "color",
            "image",
        )

    def get_image(self, obj):
        request = self.context.get("request")
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None


class ScheduleDaySerializer(serializers.ModelSerializer):
    weekday = serializers.SerializerMethodField()
    events = ScheduleEventSerializer(many=True, read_only=True)

    class Meta:
        model = ScheduleDay
        fields = ("date", "weekday", "events")

    def get_weekday(self, obj):
        weekdays = [
            "Понедельник",
            "Вторник",
            "Среда",
            "Четверг",
            "Пятница",
            "Суббота",
            "Воскресенье",
        ]
        return weekdays[obj.date.weekday()]
