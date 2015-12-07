Rails.application.routes.draw do

	root 'splash#index'

	get 'dashboard',to: 'dashboard#index',as: 'dashboard'

	get '/access/normal',to: 'sessions#new',as: 'login'
	post '/access/normal',to: 'sessions#create',as: 'login_try'
	get '/access/logout',to: 'sessions#destroy',as: 'logout'

	# API
	namespace :api do
		namespace :v1 do

			# API INSERT

		end
	end

	get 'angularjs/templates/:page',to: 'angularjs#index'

end