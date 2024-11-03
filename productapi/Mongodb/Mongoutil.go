package Mongodb

import (
	"context"
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
	"productapi/models"
	"strconv"
)

// Student represents the data structure for a student
var menuItemsCollection *mongo.Collection
var client *mongo.Client
var databaseName = "Users" // Replace with your actual MongoDB database name
var collectionName = "Profiles"
var Foodname = "Foodname"

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

func AddMenuItem(item models.MenuItem) error {
	menuItemsCollection := client.Database(databaseName).Collection(Foodname)
	_, err := menuItemsCollection.InsertOne(context.TODO(), item)
	if err != nil {
		log.Println("Error inserting menu item:", err)
		return err
	}
	return nil
}

func GetMenuItems() ([]models.MenuItem, error) {
	menuItemsCollection := client.Database(databaseName).Collection(Foodname)
	ctx := context.TODO()
	cursor, err := menuItemsCollection.Find(ctx, bson.D{}, options.Find())
	if err != nil {
		log.Println("Error finding menu items:", err)
		return nil, err
	}
	defer cursor.Close(ctx)

	var menuItems []models.MenuItem
	if err = cursor.All(ctx, &menuItems); err != nil {
		log.Println("Error decoding menu items:", err)
		return nil, err
	}

	return menuItems, nil
}
