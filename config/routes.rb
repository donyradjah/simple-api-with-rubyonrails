Rails.application.routes.draw do
  get 'page/index'

  namespace :api do
    namespace :v1 do
      resources :product
    end
  end
  root "page#index"
end

