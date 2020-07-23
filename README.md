# conFusionServer

This is server developed during the Coursera backend web development course intended to be used for the conFusion restauraunt. 

The project uses NodeJS, Express and MongoDB


## How to Run

to start using this application, go to your terminal, in the root directory of this project and type:

```
git clone https://github.com/OliverFarren/conFusionServer
```

Next you will need to install all the packages:

```
npm install package.json
```

This will install all the packages needed to succesfully start up the application.

You will also need to go and install **Mongoose Database** as we are using Mongo for our backend database. There is a free version of MongoDB called MongoDB Community Server that can be downloaded from https://www.mongodb.com/ 

Once install, type:

```
mongod --dbpath="<path>\data" --bind_ip 127.0.0.1
```

Once your Mongo database ie sucessfully running, open up a new terminal and type:

```
npm start
```

This will successfully run the server side application on https://localhost:3443/

### Populate Mongo Database

When you first start your application, the Mongo database will be empty. e need to populate it with the compulsory data so that we can run our client side React application successfully.

To do this, I have provided a folder in the root directory of the project called populate_database. Inside that folder, I have added three JSON files that contain the data that we need.

Use those files to add data for the following components

- Dishes
- Leaders
- Promotions

### Populate via Postman
To add data to the Mongo database via Postman, perform the following steps

1. Create a table by the name users in the database directly.
2. Add an admin user. Make sure to check the users model to find out how to create an admin user.
3. Using Postman, hit the https://localhost:3443/users/login endpoint. Provide your username & password in the body of the request in JSON format.
4. The response will return a token value. Save this token as you will need it when adding data to the database via Postman. Each POST request, requires this token as authorization in the header.
- Authorization: bearer <token>
5. Checks are in place to make sure that, any non admin user cannot add the above mentioned data in the database.
Once this is all done, your server side application is ready to serve.
