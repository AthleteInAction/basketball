Rails.application.configure do

  config.cache_classes = false
  config.eager_load = false
  config.consider_all_requests_local       = true
  config.action_controller.perform_caching = false
  config.active_support.deprecation = :log
  config.assets.debug = true
  config.assets.raise_runtime_errors = true

  # URI
  SITE_URI = 'http://localhost:3000'
  
  # APP NAME
  APP_NAME = 'Basketball'

  # PAGE TITLE
  TITLE = "#{APP_NAME} [Local]"

  # ENV
  E = Rails.env

  # ACCESS
  ACCESS = ['end-user','admin']

  # Parse
  require 'ParseAPI'
  PARSE = ParseAPI::Rest.new '9nA9rm59xKqjCNfT4LCPgJMexuDdVKP6vxbVIm3F','TbHNhFuL3OeJwwELAbU7WgNMbAAy8RpeFPNc1HRg'

end