package handlers

import (
	"context"
	"encoding/json"
	"errors"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"net/http"
	"orderapi/Mongodb"
	"orderapi/models"
)

func PlaceOrder(w http.ResponseWriter, r *http.Request) {
	var order models.Order
	if err := json.NewDecoder(r.Body).Decode(&order); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	// Start a new session
	client := Mongodb.GetClient()
	session, err := client.StartSession()
	if err != nil {
		http.Error(w, "Error starting session", http.StatusInternalServerError)
		return
	}
	defer session.EndSession(context.Background())

	// Define the transaction function
	callback := func(sessCtx mongo.SessionContext) (interface{}, error) {
		// Validate and update stock with optimistic locking
		for _, item := range order.Items {
			menuItem, err := Mongodb.GetMenuItemByName(item.Name)
			if err != nil {
				return nil, err
			}
			if menuItem.Stock < item.Count {
				return nil, errors.New("not enough stock for item: " + item.Name)
			}
			err = Mongodb.UpdateMenuItemStockWithTransaction(sessCtx, menuItem.Name, menuItem.Stock-item.Count, menuItem.Version)
			if err != nil {
				return nil, err
			}
		}

		order.ID = primitive.NewObjectID()
		err := Mongodb.CreateOrderWithTransaction(sessCtx, order)
		if err != nil {
			return nil, err
		}
		return nil, nil
	}

	// Run the transaction
	_, err = session.WithTransaction(context.Background(), callback)
	if err != nil {
		http.Error(w, "Error placing order: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "Order placed successfully",
		"orderID": order.ID.Hex(),
	})
}
