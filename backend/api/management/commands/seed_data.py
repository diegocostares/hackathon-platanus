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

        # # Create Items
        # item1 = Item.objects.create(
        #     name='Dragon Armor',
        #     item_type=Item.ItemType.CLOTHES,
        #     price=Decimal('49.99'),
        #     description='Protective armor for dragons.',
        #     unlock_requirements='Reach level 5'
        # )

        # # Create Inventory
        # inventory1 = Inventory.objects.create(
        #     # user_profile=user2.profile,  # Uncomment if UserProfile is used
        #     item=item1,
        #     quantity=1
        # )

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
            money_amount=100,
            description='Save money to buy a new bike.'
        )

        self.stdout.write(self.style.SUCCESS('Database seeded successfully.'))