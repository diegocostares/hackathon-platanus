from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from api.models import DragonType, Dragon, EvolutionGoal, Item, Inventory, Mission, Allowance, Transaction, Goals
from django.utils import timezone
from decimal import Decimal

class Command(BaseCommand):
    help = "Seed the database with initial data"

    def handle(self, *args, **kwargs):
        # Create DragonTypes
        dragon_type1 = DragonType.objects.create(
            name='Fire Dragon',
            description='A dragon with fiery breath.',
            unlock_requirements='Complete the Fire Quest'
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
                'description': 'A wand with magical powers.',
                'quantity': 1
            },
            {
                'name': 'Chaqueta',
                'price': 30,
                'description': 'A shield to protect dragons.',
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
            name='Collect 10 Fire Stones',
            description='Gather 10 fire stones from the volcano.',
            reward_type=Mission.RewardType.EXPERIENCE,
            reward_amount=50,
            # assigned_by=user1.profile,  # Uncomment if UserProfile is used
            # for_user=user2.profile,  # Uncomment if UserProfile is used
            status=Mission.Status.PENDING
        )

        # Create Allowances
        allowance1 = Allowance.objects.create(
            # for_user=user2.profile,  # Uncomment if UserProfile is used
            # defined_by=user1.profile,  # Uncomment if UserProfile is used
            amount=Decimal('10.00')
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
            name='Save for a new bike',
            reward=100,
            description='Save money to buy a new bike.',
            unlocked=True,
            image='image1'
        )

        goal2 = Goals.objects.create(
            name='Save for a new ball',
            reward=150,
            description='Save money to buy a new ball.',
            unlocked=False,
            image='image2'
        )

        self.stdout.write(self.style.SUCCESS('Database seeded successfully.'))