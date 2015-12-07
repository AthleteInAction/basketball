Rails.application.configure do

  config.cache_classes = true
  config.eager_load = true
  config.consider_all_requests_local       = false
  config.action_controller.perform_caching = true
  config.serve_static_assets = false
  config.assets.js_compressor = :uglifier
  config.assets.compile = false
  config.assets.digest = true
  config.log_level = :info
  config.i18n.fallbacks = true
  config.active_support.deprecation = :notify
  config.log_formatter = ::Logger::Formatter.new
  
  # URI
  SITE_URI = 'https://obscure-meadow-8478.herokuapp.com'
  
  # APP NAME
  APP_NAME = 'Basketball'

  # PAGE TITLE
  TITLE = "#{APP_NAME}"

  # ENV
  E = Rails.env

  # ACCESS
  ACCESS = ['end-user','admin']

end