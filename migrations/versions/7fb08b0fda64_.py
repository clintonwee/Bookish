"""empty message

Revision ID: 7fb08b0fda64
Revises: 5c3a957cb4bc
Create Date: 2023-04-24 10:36:02.335035

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7fb08b0fda64'
down_revision = '5c3a957cb4bc'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('password', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('isAdmin', sa.Boolean(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('isAdmin')
        batch_op.drop_column('password')

    # ### end Alembic commands ###
