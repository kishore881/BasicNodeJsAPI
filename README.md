# BasicNodeJsAPI
Consist 5 routes using 4 basic HTTP Methods
1. POST    api/users - Add a user   
2. GET     api/users - Get all the users   
3. GET     api/users/:id - Get User with specific ID   
4. PUT     api/users/:id - Update User with specific ID   
5. DELETE  api/users/:id - Delete User with specific ID 
  
User has the following structure:

{    
	 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; username: String,   
	 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; userId: String,   
	 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; email: String   
}

>- Only username and email can be updated.

Backend:  NodeJs + express   
DataBase: MongoDB Atlas   
