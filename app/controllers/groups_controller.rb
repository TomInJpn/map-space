class GroupsController < ApplicationController
  def create
    Group.create(group_params)
  end

  private
  def group_params
    params[:user_ids]=Array[current_user.id]
    params.permit(:name,user_ids:[]).merge(user_id:current_user.id)
  end
end