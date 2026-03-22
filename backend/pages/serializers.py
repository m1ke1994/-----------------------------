from rest_framework import serializers

from .models import Page, PageGalleryImage, PageSection


class PageSectionSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = PageSection
        fields = ("title", "text", "image", "order")

    def get_image(self, obj):
        request = self.context.get("request")
        if not obj.image:
            return None
        if request is None:
            return obj.image.url
        return request.build_absolute_uri(obj.image.url)


class PageGalleryImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = PageGalleryImage
        fields = ("image", "order")

    def get_image(self, obj):
        request = self.context.get("request")
        if not obj.image:
            return None
        if request is None:
            return obj.image.url
        return request.build_absolute_uri(obj.image.url)


class PageSerializer(serializers.ModelSerializer):
    hero_image = serializers.SerializerMethodField()
    sections = PageSectionSerializer(many=True, read_only=True)
    gallery = PageGalleryImageSerializer(many=True, read_only=True)

    class Meta:
        model = Page
        fields = (
            "title",
            "slug",
            "subtitle",
            "hero_image",
            "sections",
            "gallery",
        )

    def get_hero_image(self, obj):
        request = self.context.get("request")
        if not obj.hero_image:
            return None
        if request is None:
            return obj.hero_image.url
        return request.build_absolute_uri(obj.hero_image.url)
