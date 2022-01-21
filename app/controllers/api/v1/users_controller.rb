module Api
  module V1
    class UsersController < BaseController
      def index
        @users = User.all
        render json: @users
      end

      def create
        @user = User.new(params_user)
        if @user.save
          set_access_token!(@user)
          auto_login(@user)
          json_string = UserSerializer.new(@user).serializable_hash.to_json
          render json: json_string
        else
          render400(nil, @user.errors.full_messages)
        end
      end

      def me
        if current_user
          json_string = UserSerializer.new(current_user).serializable_hash.to_json
          render json: json_string
        else
          render json: nil
        end
      end

      private

      def params_user
        params.require(:user).permit(:nickname, :email, :password, :password_confirmation, :avatar)
      end
    end
  end
end
