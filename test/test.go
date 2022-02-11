package main

import (
	"fmt"
	"math"
)

func main() {
	/* Testing Testing */
	var i int = 4
	j := 1
	sum := j + i
	if j == 1 {
		fmt.Println(sum)
	} else if true {

	}
	var a [3]int
	a[1] = 2
	m := []int{5, 6, 7}
	m = append(m, 4)
	fmt.Println(a, m)

	v := make(map[string]int)
	v["triangle"] = 1
	v["square"] = 5
	delete(v, "square")

	for i := v["triangle"]; i < 5; i++ {
		fmt.Println(i)
	}

	for i, val := range a {
		fmt.Println(i, val)
	}
	for v["triangle"] > 3 {
		v["triangle"]++
	}

	ll := sum(v["triange"], a[2])
	fmt.Println(ll)
	fmt.Println(math.Sqrt(188))
}

func sum(x int, y int) int {
	return x + y
}
func eg() (int, float64) {
	return 1, 1.222
}

type person struct {
	name string
	age  int
}
