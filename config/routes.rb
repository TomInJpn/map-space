Rails.application.routes.draw do
  devise_for :users,controllers:{registrations:'users/registrations',sessions:'users/sessions',confirmations:'users/confirmations'}
  root to: 'tags#index'
  resources :tags,only: [:create,:destroy,:show,:edit,:update]
  resources :groups,only: [:create,:show,:edit,:update,:destroy]
  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?
end