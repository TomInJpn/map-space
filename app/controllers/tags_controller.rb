class TagsController < ApplicationController
  def index
    @tags=Tag.where(user_id:current_user.id) if user_signed_in?
  end
  def create
    @tag=Tag.create(tag_params)
  end
  def destroy
    Tag.find(params[:id]).delete
  end

  private
  def tag_params
    params.permit(:title,:x,:y,:user_id)
  end
end
