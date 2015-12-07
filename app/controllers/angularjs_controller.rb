class AngularjsController < ApplicationController

	def index

		list = ['mystuff','edit_post','youtube-video','duration','category-menu','post-player','post-player-modal']

		page = params[:page] if list.include?(params[:page])

		valid = list.include? params[:page]

		if valid

			render page,layout: false

		else

			render json: {},status: 404

		end

	end

end