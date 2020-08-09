class SearchController < ApplicationController
  def create
    @user=User.find_by(email: search_params[:email])
    respond_to do |format|
      format.html {redirect_to :root}
      format.json {render json: @user}
    end
  end

  private
  def search_params
    params.require(:search).permit(:email)
  end
end