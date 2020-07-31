class GroupsController < ApplicationController
  def create
    Group.create(group_params)
  end

  private
  def group_params
    params[:user_ids]=Array[params[:user_id]]
    params.permit(:name,:user_id,user_ids:[])
  end
end