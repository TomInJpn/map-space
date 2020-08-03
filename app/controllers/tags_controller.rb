class TagsController < ApplicationController
  def index
    if user_signed_in?
      @groups=Group.includes(:users,:tags).where(users:{id:current_user.id})
    end
  end
  def create
    Tag.create(tag_params)
  end
  def destroy
    Tag.find(params[:id]).destroy
  end

  private
  def tag_params
    params.permit(:title,:x,:y,:user_id,group_ids:[]).merge(user_id:current_user.id)
  end
end