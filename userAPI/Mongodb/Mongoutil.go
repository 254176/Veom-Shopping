package Mongodb

import (
	"awesomeProjects/models"
	"context"
	"errors"
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
	"strconv"
)

// Student represents the data structure for a student
var menuItemsCollection *mongo.Collection
var client *mongo.Client
var databaseName = "Users" // Replace with your actual MongoDB database name
var collectionName = "Profiles"
var Foodname = "Foodname"

// Function to establish a connection to MongoDB
func ConnectMongoDB() error {
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017/?directConnection=true")

	var err error
	client, err = mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		return fmt.Errorf("error connecting to MongoDB: %v", err)
	}

	// Check the connection
	err = client.Ping(context.TODO(), nil)
	if err != nil {
		return fmt.Errorf("error pinging MongoDB: %v", err)
	}

	fmt.Println("Connected to MongoDB!")
	return nil
}

// Function to disconnect from MongoDB
func DisconnectMongoDB() error {
	if client != nil {
		err := client.Disconnect(context.TODO())
		if err != nil {
			log.Fatal(err)
			return err
		}
		fmt.Println("Disconnected from MongoDB")
	}
	return nil
}
func GetClient() *mongo.Client {
	return client
}
func GetUserByid(id int) (models.User, error) {
	collection := client.Database(databaseName).Collection(collectionName)

	// Construct a filter to find the user by ID
	filter := bson.M{"id": id}

	var user models.User
	err := collection.FindOne(context.Background(), filter).Decode(&user)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return user, fmt.Errorf("no user found with id: %d", id)
		}
		return user, err
	}

	return user, nil
}

func UpdateUserProfile(profile models.User) error {
	collection := client.Database(databaseName).Collection(collectionName)

	// Use the ID as the identifier
	filter := bson.M{"id": profile.ID}
	update := bson.M{"$set": profile}

	_, err := collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		log.Println("Error updating profile:", err)
		return err
	}
	return nil
}

// Function to validate a user's credentials
func ValidateUser(username, password string) (bool, string, error) {
	collection := client.Database(databaseName).Collection(collectionName)

	// Define the filter to find the user by username and password
	filter := bson.M{"username": username, "password": password}

	// Define a struct to hold the result
	var user struct {
		ID int `bson:"id"`
	}

	// Perform the find operation
	err := collection.FindOne(context.Background(), filter).Decode(&user)

	if err == mongo.ErrNoDocuments {
		// No matching user found
		return false, "", nil
	} else if err != nil {
		// Other error occurred
		return false, "", err
	}

	// User found with matching credentials
	return true, strconv.Itoa(user.ID), nil
}

// Function to add a student to the MongoDB collection
func AddUser(user models.User) error {
	collection := client.Database(databaseName).Collection(collectionName)

	_, err := collection.InsertOne(context.TODO(), user)
	if err != nil {
		return fmt.Errorf("error inserting student into MongoDB: %v", err)
	}

	fmt.Printf("Student with ID %s added to MongoDB\n", 5)
	return nil
}

func DeleteUserByID(userID int) error {
	collection := client.Database(databaseName).Collection(collectionName)

	// Construct a filter to find the student by ID
	filter := bson.M{"id": userID}

	// Delete the student from MongoDB
	_, err := collection.DeleteOne(context.Background(), filter)
	return err
}

func GetAllUsers() ([]models.User, error) {
	collection := client.Database(databaseName).Collection(collectionName)

	// Define an empty filter to retrieve all documents
	filter := bson.M{}

	// Retrieve all students from MongoDB
	cursor, err := collection.Find(context.Background(), filter)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.Background())

	var users []models.User
	if err := cursor.All(context.Background(), &users); err != nil {
		return nil, err
	}

	return users, nil
}

func GetUserByID(id int) (*models.User, error) {
	collection := client.Database(databaseName).Collection(collectionName)

	// Construct a filter to find the student by ID
	filter := bson.M{"id": id}

	// Retrieve the student from MongoDB
	var user models.User
	err := collection.FindOne(context.Background(), filter).Decode(&user)
	if err != nil {
		return nil, err
	}

	return &user, nil
}

func UpdateUserByID(userID int, updatedUser *models.User) error {
	collection := client.Database(databaseName).Collection(collectionName)

	// Construct a filter to find the student by ID
	filter := bson.M{"id": userID}
	updatedUser.ID = userID
	// Convert the updatedStudent to BSON format
	update := bson.M{"$set": updatedUser}

	// Update the student in MongoDB
	_, err := collection.UpdateOne(context.Background(), filter, update)
	return err
}

func UpdateBalanceByID(id int, amount float64) error {
	collection := client.Database(databaseName).Collection(collectionName)

	// Construct a filter to find the student by ID
	filter := bson.M{"id": id}

	// Construct an update to deduct the amount from the balance
	update := bson.M{"$inc": bson.M{"balance": -amount}}

	// Update the balance in MongoDB
	result, err := collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		return err
	}

	// Check if any document was modified (student with the given ID exists)
	if result.ModifiedCount == 0 {
		return errors.New("student not found")
	}

	return nil
}
