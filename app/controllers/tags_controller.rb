class TagsController < ApplicationController
  def index
    if user_signed_in?
      @groups=current_user.groups
      @tags=Tag.joins(groups: :group_users).where(group_users:{user_id:current_user.id}).distinct.order(:id)
    end
  end
  def create
    @tag=Tag.create(tag_params)
    respond_to do |format|
      format.html {redirect_to :root}
      format.json {render json: @tag}
    end
  end
  def destroy
    Tag.find(params[:id]).destroy
  end

  private
  def tag_params
    params.permit(:title,:explanation,:x,:y,:user_id,group_ids:[]).merge(user_id:current_user.id)
  end
end