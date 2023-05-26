"""Add latitude and longitude to address table

Revision ID: dbb673d2fb0b
Revises: 924f30833e05
Create Date: 2023-05-26 18:06:50.488896

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'dbb673d2fb0b'
down_revision = '924f30833e05'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Create columns
    op.add_column('addresses', sa.Column('lat', sa.Float(), nullable=True))
    op.add_column('addresses', sa.Column('lon', sa.Float(), nullable=True))

    # Set empty lat and lon to 0
    op.execute("UPDATE addresses SET lat=0.0, lon=0.0;")

    # Update columns to not nullable
    op.alter_column('addresses', 'lat', existing_type=sa.Float(), nullable=False)
    op.alter_column('addresses', 'lon', existing_type=sa.Float(), nullable=False)


def downgrade() -> None:
    op.drop_column('addresses', 'lon')
    op.drop_column('addresses', 'lat')
