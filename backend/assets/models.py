import uuid
from django.db import models
from django.utils import timezone
from django.core.validators import MinValueValidator
from django.db.models.signals import pre_delete
from django.dispatch import receiver
from django.core.exceptions import ValidationError

class Asset(models.Model):
    STATUS_CHOICES = [
        ('Available', 'Available'),
        ('Allocated', 'Allocated'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    far_id = models.CharField(max_length=100, unique=True)
    brand = models.CharField(max_length=100)
    model_number = models.CharField(max_length=100)
    asset_type = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    purchase_date = models.DateField()
    purchase_amount = models.DecimalField(max_digits=12, decimal_places=2, validators=[MinValueValidator(0)])
    useful_life_years = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    note = models.TextField(blank=True, null=True)
    current_status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Available')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def depreciation_per_year(self):
        return self.purchase_amount / self.useful_life_years

    @property
    def accumulated_depreciation(self):
        years_used = timezone.now().year - self.purchase_date.year
        years_used = max(0, min(years_used, self.useful_life_years))  # Cap at useful life
        return self.depreciation_per_year * years_used

    def clean(self):
        # Check if there are active allocations before deletion
        if self.allocations.filter(deallocation_date__isnull=True).exists():
            raise ValidationError("This asset cannot be deleted because it's currently allocated.")

    @receiver(pre_delete, sender="assets.Asset")
    def prevent_asset_deletion_if_allocated(sender, instance, **kwargs):
        instance.clean()

    def __str__(self):
        return f"{self.far_id} - {self.brand} {self.model_number}"


class ResourceUser(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=150)
    department = models.CharField(max_length=150)
    contact_info = models.CharField(max_length=150, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def clean(self):
        # Check if the resource is allocated before deletion
        if self.allocations.filter(deallocation_date__isnull=True).exists():
            raise ValidationError("This resource user cannot be deleted because they are still allocated an asset.")

    @receiver(pre_delete, sender="assets.ResourceUser")
    def prevent_user_deletion_if_allocated(sender, instance, **kwargs):
        instance.clean()

    def __str__(self):
        return self.name


class Allocation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    asset = models.ForeignKey(Asset, on_delete=models.CASCADE, related_name='allocations')
    resource_user = models.ForeignKey(ResourceUser, on_delete=models.CASCADE, related_name='allocations')
    allocation_date = models.DateField()
    deallocation_date = models.DateField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.asset.far_id} allocated to {self.resource_user.name}"

    class Meta:
        ordering = ['-allocation_date']
