"""Make  optional

Revision ID: 44642dab94b8
Revises: 0013250b206b
Create Date: 2023-05-23 12:42:18.305113

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '44642dab94b8'
down_revision = '0013250b206b'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.alter_column('customers', 'address_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.alter_column('suppliers', 'address_id',
               existing_type=sa.INTEGER(),
               nullable=True)


def downgrade() -> None:
    op.alter_column('suppliers', 'address_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.alter_column('customers', 'address_id',
               existing_type=sa.INTEGER(),
               nullable=False)
