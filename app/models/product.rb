class Product < ActiveRecord::Base
  validates :product_name , presence: true
  validates :stock ,presence: true
end
