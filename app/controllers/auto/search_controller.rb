class Auto::SearchController < ApplicationController
  def create
    tag_id=search_params[:id].to_i
    tags=Tag.joins(groups: :group_users).where(group_users:{user_id:current_user.id}).distinct.order(:id)
    if tags.last.id>tag_id
      @tags=tags.where("id>?",tag_id).order(:id)
    else
      @tag={}
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