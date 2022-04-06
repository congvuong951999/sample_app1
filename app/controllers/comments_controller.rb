class CommentsController < ApplicationController

  def create
     @micropost = current_user.microposts.build
    @comment = Comment.new(comment_params)
    if @comment.save
        flash[:success] = "Comment successfully"
        redirect_to micropost_path(@comment.micropost)
    else
        flash.now[:danger] = "error"
        # redirect_to micropost_path(@comment.micropost)

    end
  end

  def new
    @micropost = Micropost.find(params[:micropost_id])
    @comment = @micropost.comments.create(parent_id: params[:parent_id])
  end

  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy
    flash[:success] = "Micropost deleted"
    redirect_to request.referrer || root_url
  end
  # def destroy
  #       @micropost = Micropost.find(params[:micropost_id])
  #       @comment = @micropost.comments.find(params[:id])
  #       @comment.destroy
  #       redirect_to micropost_path(@micropost)
  #   end
  private
    def comment_params
      params.require(:comment).permit(:body, :parent_id,:micropost_id,:user_id)
    end
end