Rails.application.routes.draw do
  namespace :api do
    post 'games', to: 'games#create'
    get 'high_scores', to: 'games#high_scores'
  end

  get '*path', to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end