class Group < ApplicationRecord
  has_many:group_tags,dependent: :destroy
  has_many:tags,through: :group_tags
  has_many:group_users,dependent: :destroy
  has_many:users,through: :group_users
  validates :name, presence: true
end
