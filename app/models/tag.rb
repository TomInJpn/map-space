class Tag < ApplicationRecord
  validates :title, presence: true,length: { maximum: 20 }
  has_many:group_tags,dependent: :destroy
  has_many:groups,through: :group_tags
  belongs_to:user
end