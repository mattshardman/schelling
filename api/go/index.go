package handler

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"math"
	"net/http"
)

type Person struct {
	id    string  `json:"id"`
	color string  `json:"color"`
	x     float64 `json:"x"`
	y     float64 `json:"y"`
}

type Dist struct {
	color string
	dist  float64
}

type person []Person

func parseData(jsonData []byte) person {
	var data []interface{}
	json.Unmarshal(jsonData, &data)

	p := person{}

	for _, d := range data {
		v := d.(map[string]interface{})

		id := v["id"].(string)
		color := v["color"].(string)
		x := v["x"].(float64)
		y := v["y"].(float64)

		person := Person{id, color, x, y}

		p = append(p, person)
	}

	return p
}

func (p person) shuffle() {

	for _, ind := range p {
		distArr := []Dist{}
		for _, ind2 := range p {
			dx := math.Sqrt(math.Pow(ind.x-ind2.x, 2))
			dy := math.Sqrt(math.Pow(ind.y-ind2.y, 2))
			d := dx + dy
			distArr = append(distArr, Dist{color: ind.color, dist: d})
		}
	}

}

func Handler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	decoder, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err)
	}

	d := parseData(decoder)
	d.shuffle()
	fmt.Println("done")
	fmt.Fprintf(w, "hello")
}
