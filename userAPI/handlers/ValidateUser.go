package handlers

import (
	"awesomeProjects/Mongodb"
	"encoding/json"
	"net/http"
)

type validationResponse struct {
	Message string `json:"message"`
	UserID  string `json:"id,omitempty"`
}

var RequestBody struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func ValidateUserHandler(w http.ResponseWriter, r *http.Request) {
	// Parse JSON request body

	err := json.NewDecoder(r.Body).Decode(&RequestBody)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode("Invalid request body")
		return
	}

	// Validate user credentials
	valid, ID, err := Mongodb.ValidateUser(RequestBody.Username, RequestBody.Password)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode("Internal Server Error")
		return
	}

	// Respond based on validation result
	if valid {
		response := validationResponse{
			Message: "Valid credentials",
			UserID:  ID,
		}
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(response)
	} else {
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode("Invalid credentials")
	}
}
