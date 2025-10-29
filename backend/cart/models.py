from django.db import models
from django.conf import settings
import uuid

class Cart(models.Model):
    cart_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='cart')

    def __str__(self):
        return f"Cart of {self.user.username}"


class CartItem(models.Model):
    item_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey('products.Product', on_delete=models.CASCADE, related_name='cart_items')
    quantity = models.IntegerField(default=1)

    class Meta:
        unique_together = ('cart', 'product')

    def __str__(self):
        return f"{self.quantity} of {self.product.name} in cart of {self.cart.user.username}"
