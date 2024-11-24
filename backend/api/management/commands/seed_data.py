from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from api.models import DragonType, Dragon, EvolutionGoal, Item, Inventory, Mission, Allowance, Transaction, Goals, Expenses
from django.utils import timezone
from decimal import Decimal

class Command(BaseCommand):
    help = "Seed the database with initial data"

    def handle(self, *args, **kwargs):
        # Create DragonTypes
        dragon_type1 = DragonType.objects.create(
            name='Dragón Mañoso',
            description='Un dragón bien Mañoso',
            unlock_requirements='Cumple las metas necesarias.'
        )

        # Create Dragons
        dragon1 = Dragon.objects.create(
            # user_profile=user2.profile,  # Uncomment if UserProfile is used
            dragon_type=dragon_type1,
            phase=1,
            experience=100
        )

        # Create EvolutionGoals
        evolution_goal1 = EvolutionGoal.objects.create(
            dragon_type=dragon_type1,
            phase=2,
            experience_required=200
        )

                # Create Items and Inventories
        items_data = [
            {
                'name': 'Chupalla',
                'price': 50,
                'description': 'Chupalla de dragón.',
                'quantity': 2
            },
            {
                'name': 'Polera Platanus',
                'price': 40,
                'description': 'Una polera poderosa',
                'quantity': 1
            },
            {
                'name': 'Chaqueta',
                'price': 30,
                'description': 'Una chaqueta estilosa',
                'quantity': 1
            }
        ]

        for item_data in items_data:
            item = Item.objects.create(
                name=item_data['name'],
                price=item_data['price'],
                description=item_data['description'],
            )
            Inventory.objects.create(
                item=item,
                quantity=item_data['quantity']
            )

        # Create Missions
        mission1 = Mission.objects.create(
            name='Hacer la cama',
            description='Ordena y limpia tu cama al levantarte.',
            reward_type=Mission.RewardType.EXPERIENCE,
            reward_amount=50,
            status=Mission.Status.COMPLETED
        )

        mission2 = Mission.objects.create(
            name='Lavar los platos',
            description='Lava los platos después de la comida.',
            reward_type=Mission.RewardType.EXPERIENCE,
            reward_amount=15,
            status=Mission.Status.PENDING
        )

        mission3 = Mission.objects.create(
            name='Sacar la basura',
            description='Lleva la basura al contenedor más cercano.',
            reward_type=Mission.RewardType.EXPERIENCE,
            reward_amount=5,
            status=Mission.Status.PENDING
        )

        # Create Allowances
        allowance1 = Allowance.objects.create(
            # for_user=user2.profile,  # Uncomment if UserProfile is used
            # defined_by=user1.profile,  # Uncomment if UserProfile is used
            amount=Decimal('1190.00')
        )

        expenses = Expenses.objects.create(
            # for_user=user2.profile,  # Uncomment if UserProfile is used
            # defined_by=user1.profile,  # Uncomment if UserProfile is used
            amount=Decimal('0.00')
        )

        # Create Transactions
        transaction1 = Transaction.objects.create(
            # user_profile=user2.profile,  # Uncomment if UserProfile is used
            transaction_type=Transaction.TransactionType.INCOME,
            amount=Decimal('5.00'),
            description='Weekly allowance'
        )

        # Create Goals
        goal1 = Goals.objects.create(
            name='Pequeño Tesoro',
            reward='Dragón Mañoso',
            objective=1200,
            image='image1'
        )

        goal2 = Goals.objects.create(
            name='Aliento de Fuego',
            reward='Dragón Mañoso Nivel 2',
            objective=1500,
            image='image2'
        )

        goal3 = Goals.objects.create(
            name='Volando los Cielos',
            reward='Dragón Hada Nivel 1',
            objective=2000,
            image='image3'
        )

        self.stdout.write(self.style.SUCCESS('Database seeded successfully.'))