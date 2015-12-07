module Tools

	module_function

    def ap val

        puts '===='*10
        puts '===='*10
        puts val
        puts '===='*10
        puts '===='*10

    end

    def glyphicon icon

        "<span class=\"glyphicon glyphicon-#{icon}\"></span>".html_safe

    end

    def get url

        uri = URI url

        http = Net::HTTP.new uri.host,80

        req = Net::HTTP::Get.new uri.path
        # req.content_type = 'application/xml'

        response = http.request req

        code = response.code.to_f.round
        body = response.body

        final = {
          code: code,
          body: body
      }

    end

end