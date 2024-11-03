package main

import (
	"context"
	"encoding/base64"
	"fmt"
	"github.com/gorilla/mux"
	"log"
	"math/rand"
	"net/http"
	"productapi/Mongodb"
	"productapi/handlers"
	"strings"
	"time"
)

func main() {
	// Seed the random number generator to get different values each time
	rand.Seed(time.Now().UnixNano())
	err := Mongodb.ConnectMongoDB()
	if err != nil {
		fmt.Println(err)
		return
	}
	router := mux.NewRouter()
	protected := router.PathPrefix("/api").Subrouter()
	protected.Use(authMiddleware) // Apply middleware to the protected routes

	protected.HandleFunc("/menu-items", handlers.GetMenu).Methods(http.MethodGet)
	protected.HandleFunc("/menu-items", handlers.AddMenuItem).Methods(http.MethodPost)

	log.Println("API is running!")
	err = http.ListenAndServe(":1202", router)

	if err != nil {
		log.Println("Rest Server error" + err.Error())
	}
	err = Mongodb.DisconnectMongoDB()
	if err != nil {
		return
	}

}

type RequestBody struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func authMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			w.Header().Set("WWW-Authenticate", `Basic realm="Restricted"`)
			http.Error(w, "Authorization required", http.StatusUnauthorized)
			return
		}

		authValue := strings.SplitN(authHeader, " ", 2)
		if len(authValue) != 2 || authValue[0] != "Basic" {
			http.Error(w, "Invalid authorization format", http.StatusUnauthorized)
			return
		}

		payload, _ := base64.StdEncoding.DecodeString(authValue[1])
		pair := strings.SplitN(string(payload), ":", 2)
		if len(pair) != 2 {
			http.Error(w, "Invalid authorization value", http.StatusUnauthorized)
			return
		}

		username, password := pair[0], pair[1]

		isValid, userID, err := Mongodb.ValidateUser(username, password)
		if err != nil {
			http.Error(w, "Error validating user", http.StatusInternalServerError)
			return
		}

		if !isValid {
			w.Header().Set("WWW-Authenticate", `Basic realm="Restricted"`)
			http.Error(w, "Invalid username or password", http.StatusUnauthorized)
			return
		}

		// Add userID to the request context
		ctx := context.WithValue(r.Context(), "userID", userID)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}