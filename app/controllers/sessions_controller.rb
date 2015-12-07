class SessionsController < ApplicationController

	def new

		render layout: 'splash'
		
	end

	def create

		request = PARSE.login params[:email],params[:password]

		if request[:code] == 200

			session[:user] = request[:body]

			redirect_to root_url,flash: {success: "Welcome, #{session[:user]['email']}!"}

		else

			flash.now[:danger] = 'Email or password is invalid'

			render 'new', layout: 'splash'

		end

	end

	def destroy

		session.delete :user

		redirect_to root_url

	end

end