class Game < ApplicationRecord
  after_initialize :init

  def init
    if self.player == ""
      self.player = "Unknown Birder"
      self.save
    end
  end

  def self.high_scores
    Game.order(score: :desc, created_at: :desc).first(10)
  end
end