module ParseAPI

	class Rest

		# Includes
		#-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:
		# require 'json'
		# require 'net/http'
		# require 'net/https'
		# require 'uri'
		#-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:

		# Set Infrastructure
		#-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:
		def initialize applicationID,restKEY

			@host = 'api.parse.com'
			@applicationID = applicationID
			@restKEY = restKEY

		end
		#-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:

		# Login
		#-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:
		def login username,password

			path = '/1/login'

			path << '?'
			path << URI.escape("username=#{username}&password=#{password}")

			http = Net::HTTP.new @host,443
			http.verify_mode = OpenSSL::SSL::VERIFY_NONE
			http.use_ssl = true

			req = Net::HTTP::Get.new path
			req.content_type = 'application/json'
			req['X-Parse-Application-Id'] = @applicationID
			req['X-Parse-REST-API-Key'] = @restKEY
			req['X-Parse-Revocable-Session'] = 1

			response = http.request(req)

			final = { code: response.code.to_i }

			final.merge! body: JSON.parse(response.body) if response.code.to_i == 200

			final

		end
		#-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:

	end

end