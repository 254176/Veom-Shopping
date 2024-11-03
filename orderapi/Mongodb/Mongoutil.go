package Mongodb

import (
	"context"
	"errors"
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
	"orderapi/models"
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

func AddOrder(order models.Order) (primitive.ObjectID, error) {
	collection := client.Database(databaseName).Collection("Orders")

	result, err := collection.InsertOne(context.Background(), order)
	if err != nil {
		return primitive.NilObjectID, err
	}

	return result.InsertedID.(primitive.ObjectID), nil
}
func GetOrders() ([]models.Order, error) {
	collection := client.Database(databaseName).Collection("Orders")

	cursor, err := collection.Find(context.Background(), bson.D{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.Background())

	var orders []models.Order
	err = cursor.All(context.Background(), &orders)
	return orders, err
}
func GetOrdersByUserID(userID string) ([]models.Order, error) {
	collection := client.Database(databaseName).Collection("Orders")

	filter := bson.M{"userid": userID}
	log.Printf("MongoDB query filter: %v\n", filter)

	cursor, err := collection.Find(context.Background(), filter)
	if err != nil {
		log.Printf("MongoDB query error: %v\n", err)
		return nil, err
	}
	defer cursor.Close(context.Background())

	var orders []models.Order
	err = cursor.All(context.Background(), &orders)
	if err != nil {
		log.Printf("Error decoding orders: %v\n", err)
		return nil, err
	}

	log.Printf("Orders found: %v\n", orders)
	return orders, nil
}

func CreateOrderWithTransaction(sessCtx mongo.SessionContext, order models.Order) error {
	collection := client.Database(databaseName).Collection("Orders")
	_, err := collection.InsertOne(sessCtx, order)
	return err
}
func GetMenuItemByName(name string) (*models.MenuItem, error) {
	collection := client.Database(databaseName).Collection("Foodname")
	var menuItem models.MenuItem
	if err := collection.FindOne(context.TODO(), bson.M{"name": name}).Decode(&menuItem); err != nil {
		return nil, err
	}
	return &menuItem, nil
}
func UpdateMenuItemStockWithTransaction(sessCtx mongo.SessionContext, name string, stock int, version int) error {
	collection := client.Database(databaseName).Collection("Foodname")

	filter := bson.M{"name": name, "version": version}
	update := bson.M{
		"$set": bson.M{"stock": stock, "version": version + 1},
	}

	result, err := collection.UpdateOne(sessCtx, filter, update)
	if err != nil {
		return err
	}

	if result.MatchedCount == 0 {
		return errors.New("version mismatch or item not found")
	}

	return nil
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
