class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable#, :confirmable
  validates :name, presence: true
  has_many:tags,dependent: :destroy
  has_many:group_users,dependent: :destroy
  has_many:groups,through: :group_users,dependent: :destroy
  def remember_me
    true
  end
end
