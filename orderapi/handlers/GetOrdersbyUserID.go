package handlers

import (
	"encoding/json"
	"github.com/gorilla/mux"
	"net/http"
	"orderapi/Mongodb"
)

func GetOrdersByUserIDHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	userIDStr := vars["userID"]

	orders, err := Mongodb.GetOrdersByUserID(userIDStr)
	if err != nil {
		http.Error(w, "Error fetching orders", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(orders)
}
