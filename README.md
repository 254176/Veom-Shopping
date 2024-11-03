#Mongodb deployment
Purpose: MongoDB is a NoSQL database that stores data in a flexible, JSON-like format. It's commonly used in web development to store and manage data.
Installation: The installation process involves downloading and installing the MongoDB server on your machine. Depending on your operating system, the steps might vary.
You can refer to the MongoDB official documentation for detailed instructions.

Initial start Mongo DB command

docker run --name mongo -d -p 27017:27017 mongodb/mongodb-community-server:latest

Start Mongo DB

docker start mongo

Stop mongo DB

docker stop mongo

//Use following command to check if mongo process is working
docker ps

Configuration
Database Name: UTDStudents
Collection Name: Students

#API deployment
# Execute Go build commands
go mod tidy
go mod vendor
go build <name of project>
Purpose: These commands are used to manage dependencies and build the Go project.
Commands:
go mod tidy: Cleans up the go.mod file, removing any dependencies that are no longer needed.
go mod vendor: Copies dependencies into the vendor directory.
go build <name of project>: Builds the Go project. Replace <name of project> with the actual name of your project.
# Import API postman json in Postman
Purpose: Postman is a popular API testing tool. This step involves importing a
JSON file (presumably containing Postman requests and configurations) related to the Student API.
Process: Open Postman, look for the import option, and select the JSON file.
This will load the predefined requests and configurations into Postman.
# Test CRUD API using Postman
Purpose: After importing the Postman collection, you can use it to test the CRUD operations of the Student API.
Steps: Open the imported collection in Postman, select the appropriate request (e.g., create, read, update, delete),
and execute it against the Student API. Verify that the API behaves as expected,
interacting with the MongoDB database to perform the CRUD operations on student records.

#UI deployment:
Build the UI: Generate a production-ready version of your site using your chosen framework or tool.
Upload Files: Transfer the built files to your server's designated folder for hosting.
Configure Web Server: Set up your server (like Nginx or Apache) to serve the UI files and ensure proper routing.
Set Up SSL: Use Cloudflare for managing DNS and SSL certificates, and ensure HTTPS is enabled for security.
Test Deployment: Check your site to ensure everything is running smoothly and resolve any issues as needed.
