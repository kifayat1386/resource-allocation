from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Asset, ResourceUser, Allocation
from .serializers import AssetSerializer, ResourceUserSerializer, AllocationSerializer
from rest_framework.permissions import IsAuthenticated
from django.urls import path
from rest_framework_simplejwt import views as jwt_views

class AssetViewSet(viewsets.ModelViewSet):
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=True, methods=['get'])
    def depreciation(self, request, pk=None):
        asset = self.get_object()
        return Response({
            'depreciation_per_year': asset.depreciation_per_year,
            'accumulated_depreciation': asset.accumulated_depreciation
        })

    def destroy(self, request, *args, **kwargs):
        asset = self.get_object()

        # Check if the asset has active allocations
        if asset.allocations.filter(deallocation_date__isnull=True).exists():
            return Response({"detail": "Asset is allocated and cannot be deleted."}, status=status.HTTP_400_BAD_REQUEST)

        return super().destroy(request, *args, **kwargs)

class ResourceUserViewSet(viewsets.ModelViewSet):
    queryset = ResourceUser.objects.all()
    serializer_class = ResourceUserSerializer
    permission_classes = [IsAuthenticated]

    def destroy(self, request, *args, **kwargs):
        # Debugging line to confirm if this method is being entered
        print("Inside custom destroy method")

        # Get the resource user to delete
        resource_user = self.get_object()

        # Check if the resource user has any active allocations
        if resource_user.allocations.filter(deallocation_date__isnull=True).exists():
            return Response(
                {"detail": "Resource User has active allocations and cannot be deleted."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Perform the deletion if no active allocations
        resource_user.delete()

        # Debugging line to confirm if deletion is done
        print(f"Resource User {resource_user.name} deleted successfully")

        return Response(
            {"detail": "Resource User successfully deleted."},
            status=status.HTTP_204_NO_CONTENT
        )

class AllocationViewSet(viewsets.ModelViewSet):
    queryset = Allocation.objects.all()
    serializer_class = AllocationSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=True, methods=['post'])
    def allocate(self, request, pk=None):
        asset = self.get_object()
        user = request.data.get('resource_user')
        allocation_date = request.data.get('allocation_date')

        # Create allocation logic here
        allocation = Allocation.objects.create(
            asset=asset,
            resource_user=user,
            allocation_date=allocation_date
        )
        return Response({"message": "Asset allocated successfully", "allocation": AllocationSerializer(allocation).data})

    @action(detail=True, methods=['post'])
    def deallocate(self, request, pk=None):
        allocation = self.get_object()
        allocation.deallocation_date = request.data.get('deallocation_date')
        allocation.save()

        return Response({"message": "Asset deallocated successfully", "allocation": AllocationSerializer(allocation).data})

    urlpatterns = [
        # Other URLs
        path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
        path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    ]