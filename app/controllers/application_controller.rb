class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :authenticate_user!,except: :index
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name]) unless user_signed_in?
    devise_parameter_sanitizer.permit(:account_update, keys: [:name]) if user_signed_in?
  end
end