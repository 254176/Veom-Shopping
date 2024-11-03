package models

type CartItem struct {
	Name  string  `json:"name"`
	Price float64 `json:"price"`
	Count int     `json:"count"`
}
type User struct {
	Name     string     `json:"name"`
	Email    string     `json:"email"`
	Address  string     `json:"address"`
	Username string     `json:"username"`
	Password string     `json:"password"`
	ID       int        `json:"id"`
	Cart     []CartItem `json:"cart"`
}
