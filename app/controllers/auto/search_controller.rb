class Auto::SearchController < ApplicationController
  def create
    tag_id=search_params[:id].to_i
    tags=Tag.joins(groups: :group_users).where(group_users:{user_id:current_user.id}).distinct.order(:id)
    if tag_id>0&&tag_id<tags.last.id
      @tags=tags.where("tags.id>?",tag_id).order(:id)
    elsif tag_id==0
      @tags=tags
    else
      @tags={}
    end
      respond_to do |format|
        format.html {redirect_to :root}
        format.json {render json: @tags}
      end
  end

  private
  def search_params
    params.require(:search).permit(:id)
  end
end
