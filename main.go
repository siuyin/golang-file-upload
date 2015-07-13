package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
)

func main() {
	fmt.Println("server ready")
	http.HandleFunc("/upload", upload)
	log.Fatal(http.ListenAndServe(":8082", nil))
}

func upload(w http.ResponseWriter, r *http.Request) {
	fmt.Println("method:", r.Method)
	if r.Method == "POST" {
		r.ParseMultipartForm(1000000)
		for _, fileHeader := range r.MultipartForm.File["uploads"] {
			fmt.Fprintf(w, "<p>%s", fileHeader.Filename)
			file, err := fileHeader.Open()
			if err != nil {
				fmt.Println(err)
				return
			}
			io.Copy(os.Stdout, file)
		}
	} else {
		fmt.Fprintf(w, "Sorry, this location is only accessible via the application")
	}
}
