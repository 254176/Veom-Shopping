package handlers

import (
	"encoding/json"
	"net/http"
	"orderapi/Mongodb"
)

func GetOrdersHandler(w http.ResponseWriter, r *http.Request) {
	orders, err := Mongodb.GetOrders()
	if err != nil {
		http.Error(w, "Error fetching orders", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(orders)
}
