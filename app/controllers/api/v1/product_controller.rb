class Api::V1::ProductController < ApplicationController
  def index
    @products = Product.all
    render json: @products
    end
  def show
    @products = Product.find(params[:id])
    render json: @products
  end
  def create
    @product = Product.new(product_name: params[:product_name], stock: params[:stock])
    if @product.save
      render json: {status: 'successful'}
    else
      render json: @product.errors
    end
  end
  def update
    @product = Product.find(params[:id])
    if @product.update(product_name: params[:product_name], stock: params[:stock])
      render  json: {status: 'successful'}
    else
      render json: @product.errors
    end
  end
  def destroy
    @product = Product.where(id: params[:id]).first
    if @product.destroy
      render json: {status: 'successful'}
    else
      render json: @product.errors
    end
  end
end