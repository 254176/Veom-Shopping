package handlers

import (
	"encoding/json"
	"net/http"
	"productapi/Mongodb"
	"productapi/models"
)

func AddMenuItem(w http.ResponseWriter, r *http.Request) {
	var newItem models.MenuItem

	err := json.NewDecoder(r.Body).Decode(&newItem)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Header().Add("Content-Type", "application/json")
		json.NewEncoder(w).Encode("Invalid request body")
		return
	}

	err = Mongodb.AddMenuItem(newItem)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Header().Add("Content-Type", "application/json")
		json.NewEncoder(w).Encode("Internal Server Error")
		return
	}

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode("Menu item added")
}
