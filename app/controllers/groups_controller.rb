class GroupsController < ApplicationController
  def create
    @group=Group.create(group_params)
    respond_to do |format|
      format.html {redirect_to :root}
      format.json {render json: @group}
    end
  end

  private
  def group_params
    params.permit(:name,user_ids:[],tag_ids:[]).merge(user_id:current_user.id)
  end
end