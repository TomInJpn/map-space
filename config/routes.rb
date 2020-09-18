Rails.application.routes.draw do
  devise_for :users,controllers:{registrations:'users/registrations',sessions:'users/sessions',confirmations:'users/confirmations'}
  # devise_for :users,controllers:{registrations:'users/registrations',sessions:'users/sessions'}
  root to: 'tags#index'
  resources :search,only: :create
  resources :tags,only: [:create,:destroy,:show,:edit,:update]
  resources :groups,only: [:create,:show,:edit,:update,:destroy]
  resources :searchtags,only: [:create]
  namespace :auto do
    resources :search,only: :create
  end
  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?
end
