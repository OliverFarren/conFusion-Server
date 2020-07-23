# conFusionServer

This is server developed during the Coursera backend web development course intended to be used for the conFusion restauraunt. 

The project uses NodeJS, Express and MongoDB


## How to Run

to start using this application, go to your terminal, in the root directory of this project and type:

```
git clone https://github.com/OliverFarren/conFusionServer
git clone https://github.com/OliverFarren/conFusion-mongoDB

```

Next you will need to install all the packages:

```
npm install package.json
```

This will install all the packages needed to succesfully start up the application.

You will also need to go and install **Mongoose Database** as we are using Mongo for our backend database. There is a free version of MongoDB called MongoDB Community Server that can be downloaded from https://www.mongodb.com/ 

Once installed, add mongo to the Windows PATH:

1. Get the path to bin ~ : C:\Program Files\MongoDB\Server\4.0\bin
2. Press the Windows key, type _env_, select _Edit the system environment variables_
3. On the _Advanced_ tab, click _Environment Variables_
4. In the _User variables for xxxx_ section, select _path_ and then click the _Edit..._ button
5. Click _New_ and paste your path with a trailing slash, e.g. _C:\Program Files\MongoDB\Server\4.0\bin\_
6. Click _Ok_,_Ok_,_Ok_ and then restart your command window


Navigate to the confusion-mongoDB and type:

```
./start_db.sh
```

Once your Mongo database ie sucessfully running, open up a new terminal and type:

```
npm start
```

This will successfully run the server side application on https://localhost:3443/

### Populate via Postman
To add data to the Mongo database via Postman, perform the following steps

1. Create a table by the name users in the database directly.
2. Add an admin user. Make sure to check the users model to find out how to create an admin user.
3. Using Postman, hit the https://localhost:3443/users/login endpoint. Provide your username & password in the body of the request in JSON format.
4. The response will return a token value. Save this token as you will need it when adding data to the database via Postman. Each POST request, requires this token as authorization in the header.
- Authorization: bearer <token>
5. Checks are in place to make sure that, any non admin user cannot add the above mentioned data in the database.
Once this is all done, your server side application is ready to serve.
