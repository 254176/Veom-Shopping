package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Item struct {
	Name     string  `json:"name"`
	Price    float64 `json:"price"`
	Count    int     `json:"count"`
	Calories int     `json:"calories"`
	Stock    int     `json:"stock"`
	Version  int     `json:"version"`
}

type Order struct {
	ID     primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	UserId string             `json:"userId"`
	Items  []Item             `json:"items"`
	Total  float64            `json:"total"`
}

type MenuItem struct {
	Name     string  `json:"name"`
	Calories int     `json:"calories"`
	Price    float64 `json:"price"`
	Stock    int     `json:"stock"`
	Version  int     `json:"version"`
}
