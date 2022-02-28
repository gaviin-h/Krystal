package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
)

func main() {
	fileServer := http.FileServer(http.Dir("./"))
	http.Handle("/", fileServer)
	http.HandleFunc("/hello", helloHandler)
	http.HandleFunc("/filter", filterHandler)

	fmt.Printf("Starting server at port 8080\n")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal(err)
	}
}

func helloHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/hello" {
		http.Error(w, "404 not found.", http.StatusNotFound)
		return
	}

	if r.Method != "GET" {
		http.Error(w, "Method is not supported.", http.StatusNotFound)
		return
	}

	fmt.Fprint(w, "Hello!")
}

func filterHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/filter" {
		http.Error(w, "404 not found.", http.StatusNotFound)
		return
	}
	if r.Method != "POST" {
		http.Error(w, "Method is not supported.", http.StatusNotFound)
		return
	}
	body, err1 := io.ReadAll(r.Body)
	if err1 != nil {
		log.Fatal(err1)
	}
	fmt.Println(string(body))
	// f, err := os.Create("data.txt")
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// _, err2 := f.WriteString(term)
	// if err2 != nil {
	// 	log.Fatal(err2)
	// }
	// f.Close()
}
