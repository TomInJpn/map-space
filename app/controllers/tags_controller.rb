class TagsController < ApplicationController
  def index
    @tags=Tag.where(user_id:current_user.id) if user_signed_in?
  end
  def create
    Tag.create(tag_params)
  end
  def destroy
    Tag.find(params[:id]).destroy
  end

  private
  def tag_params
    # params[:group_ids]=Array[params[:group_id]]
    params.permit(:title,:x,:y,:user_id,group_ids:[])
  end
end
