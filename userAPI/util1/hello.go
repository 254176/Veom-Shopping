package util1

func FindMaxOccurrence(input string) (rune, int) {
	charCount := make(map[rune]int)

	// Count occurrences of each character
	for _, char := range input {
		if char != ' ' { // Exclude spaces from counting
			charCount[char]++
		}
	}

	// Find the character with maximum occurrence
	maxChar := ' '
	maxCount := 0
	for char, count := range charCount {
		if count > maxCount {
			maxChar = char
			maxCount = count
		}
	}

	return maxChar, maxCount
}
