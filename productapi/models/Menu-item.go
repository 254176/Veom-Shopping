package models

type MenuItem struct {
	Name     string  `json:"name"`
	Calories int     `json:"calories"`
	Price    float64 `json:"price"`
	Stock    int     `json:"stock"`
	Version  int     `json:"version"`
}
