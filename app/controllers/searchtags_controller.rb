class SearchtagsController < ApplicationController
  def create
    group_id=group_params[:group_id].to_i
    @tags=Tag.includes(:group_tags).where(group_tags:{group_id:group_id}).distinct
    respond_to do |format|
      format.html {redirect_to :root}
      format.json {render json: @tags}
    end
  end

  private
  def group_params
    params.require(:searchtag).permit(:group_id)
  end
end
