from rest_framework import serializers
from .models import Asset, ResourceUser, Allocation

class AssetSerializer(serializers.ModelSerializer):
    depreciation_per_year = serializers.DecimalField(max_digits=12, decimal_places=2, read_only=True)
    accumulated_depreciation = serializers.DecimalField(max_digits=12, decimal_places=2, read_only=True)

    class Meta:
        model = Asset
        fields = '__all__'
        read_only_fields = ('depreciation_per_year', 'accumulated_depreciation', 'created_at', 'updated_at')


class ResourceUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResourceUser
        fields = '__all__'


class AllocationSerializer(serializers.ModelSerializer):
    asset_detail = AssetSerializer(source='asset', read_only=True)
    resource_user_detail = ResourceUserSerializer(source='resource_user', read_only=True)

    class Meta:
        model = Allocation
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')
