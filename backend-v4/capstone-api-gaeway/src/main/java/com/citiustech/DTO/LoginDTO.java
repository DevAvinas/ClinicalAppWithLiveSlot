package com.citiustech.DTO;



public class LoginDTO {
		String usernameOrEmail;
		String password;
		public LoginDTO() {
			super();
		}
		public String getUsernameOrEmail() {
			return usernameOrEmail;
		}
		public void setUsernameOrEmail(String usernameOrEmail) {
			this.usernameOrEmail = usernameOrEmail;
		}
		public String getPassword() {
			return password;
		}
		public void setPassword(String password) {
			this.password = password;
		}
		@Override
		public String toString() {
			return "LoginDTO [usernameOrEmail=" + usernameOrEmail + ", password=" + password + "]";
		}
		
		
		
}
