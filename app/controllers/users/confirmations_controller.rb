# frozen_string_literal: true

class Users::ConfirmationsController < Devise::ConfirmationsController
  # GET /resource/confirmation/new
  # def new
  #   super
  # end

  # POST /resource/confirmation
  # def create
  #   super
  # end

  # GET /resource/confirmation?confirmation_token=abcdef
  def show
    super
    Group.create(group_params) if Group.where(group_params[:user_id].to_s)
  end

  # protected

  # The path used after resending confirmation instructions.
  # def after_resending_confirmation_instructions_path_for(resource_name)
  #   super(resource_name)
  # end

  # The path used after confirmation.
  # def after_confirmation_path_for(resource_name, resource)
  #   super(resource_name, resource)
  # end

  private
  def group_params
    params[:name]="none"
    params[:user_id]=User.find_by(confirmation_token:params[:confirmation_token]).id
    params[:user_ids]=Array[params[:user_id]]
    params.permit(:name,:user_id,user_ids:[])
  end
end