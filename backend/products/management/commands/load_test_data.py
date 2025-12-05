from django.core.management.base import BaseCommand
from products.models import Products, Category
from django.contrib.auth import get_user_model
import random

class Command(BaseCommand):
    help = "Load 50 test product entries"

    def handle(self, *args, **kwargs):
        User = get_user_model()

        seller = User.objects.first()
        if not seller:
            self.stdout.write(self.style.ERROR("No users found. Create a user first."))
            return

        category_names = [
            "Textbooks", "Tutoring", "Furniture", "Electronics",
            "Clothing", "Dorm Essentials"
        ]

        categories = []
        for name in category_names:
            c, _ = Category.objects.get_or_create(category_name=name)
            categories.append(c)

        Products.objects.all().delete()

        sample_names = [
            "Calculus Textbook", "Discrete Math Textbook", "Chemistry Lab Manual",
            "Python Tutoring Session", "Java Tutoring Session", "Statistics Tutoring",
            "Mini Fridge", "Desk Lamp", "Dorm Desk Chair",
            "HP Laptop", "iPad Air", "TI-84 Calculator",
            "UF Hoodie", "Nike Backpack", "Running Shoes",
        ]

        descriptions = [
            "Gently used, great condition.",
            "Barely used, like new.",
            "Some wear but works perfectly.",
            "Perfect for students!",
            "Popular item — priced to sell.",
        ]

        for i in range(50):
            name = random.choice(sample_names)
            desc = random.choice(descriptions)
            category = random.choice(categories)
            price = random.randint(10, 200) * 100  
            quantity = random.randint(1, 10)

            Products.objects.create(
                name=name,
                description=desc,
                price=price,
                quantity=quantity,
                seller=seller,
                category=category
            )

        self.stdout.write(self.style.SUCCESS("Successfully created 50 test products!"))