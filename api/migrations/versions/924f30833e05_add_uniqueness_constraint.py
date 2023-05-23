"""Add uniqueness constraint for address

Revision ID: 924f30833e05
Revises: 44642dab94b8
Create Date: 2023-05-23 12:55:23.062616

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '924f30833e05'
down_revision = '44642dab94b8'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_unique_constraint('_address_uc', 'addresses', ['street', 'zip', 'city', 'country'])


def downgrade() -> None:
    op.drop_constraint('_address_uc', 'addresses', type_='unique')
