class SplashController < ApplicationController

	def index

		if current_user.nil?

			redirect_to login_path

		else

			redirect_to dashboard_path+'/'

		end

	end

end