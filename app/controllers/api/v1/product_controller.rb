class Api::V1::ProductController < ApplicationController
  def index
    if params[:page].nil?
      @page = 1
    else
      @page = params[:page]
    end
    @products = Product.all.order('created_at DESC').paginate(page: @page, per_page: 10)
    if params[:page].to_i > 1
      @from = (params[:page].to_i - 1) * 10 + 1
    else
      @from = 1
    end
    if params[:page].to_i == 1 || params[:page].nil?
      @to = @products.length
    else
      if params[:page].to_i > 1
        @to = @from + @products.length - 1
      end
    end

    render json: {total: @products.length, per_page: 10, page: @page, from: @from, to: @to, data: @products}
  end

  def show
    @products = Product.find(params[:id])
    render json: @products
  end

  def create
    @product = Product.new(product_name: params[:product_name], stock: params[:stock])
    if @product.save
      render json: {success: true, status: 'successful'}
    else
      render json: {success: false, error: @product.errors}
    end
  end

  def update
    @product = Product.find(params[:id])
    if @product.update(product_name: params[:product_name], stock: params[:stock])
      render json: {success: true, status: 'successful'}
    else
      render json: {success: false, error: @product.errors}
    end
  end

  def destroy
    @product = Product.where(id: params[:id]).first
    if @product.destroy
      render json: {success: true, status: 'successful'}
    else
      render json: {success: false, error: @product.errors}
    end
  end

end