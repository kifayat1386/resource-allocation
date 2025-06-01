from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt import views as jwt_views  # Import JWT views

from assets.views import AssetViewSet, ResourceUserViewSet, AllocationViewSet  # Adjust app name

router = DefaultRouter()
router.register(r'assets', AssetViewSet)
router.register(r'resource-users', ResourceUserViewSet)
router.register(r'allocations', AllocationViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),

    # Add these JWT token URLs:
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]
