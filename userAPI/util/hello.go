package util

import (
	"awesomeProjects/util1"
	"fmt"
)

func PrintOddNumbers(start, end int) {
	fmt.Printf("Odd numbers between %d and %d:\n", start, end)

	for i := start; i <= end; i++ {
		if i%2 != 0 {
			fmt.Println(i)
		}
	}
}
func PrintEvenNumbers(start, end int) {
	fmt.Printf("Even numbers between %d and %d:\n", start, end)

	for i := start; i <= end; i++ {
		if i%2 == 0 {
			fmt.Println(i)
		}
	}
}

func FindMaxOccurrence(input string) (rune, int) {
	return util1.FindMaxOccurrence(input)
	
}
