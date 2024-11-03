package handlers

import (
	"encoding/json"
	"net/http"
	"productapi/Mongodb"
)

func GetMenu(w http.ResponseWriter, r *http.Request) {
	// Fetch menu items from MongoDB
	menuItems, err := Mongodb.GetMenuItems()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Header().Add("Content-Type", "application/json")
		json.NewEncoder(w).Encode("Internal Server Error")
		return
	}

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(menuItems)
}
