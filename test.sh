
http GET http://localhost:8080/hello

http GET http://localhost:5000/models

http GET http://localhost:8080/chaining

# Full demo


curl -i -X POST -H "Content-Type:application/json" -d '{"name":"BMW"}' http://localhost:8080/api/brand
curl -i -X POST -H "Content-Type:application/json" -d '{"name":"Tesla"}' http://localhost:8080/api/brand
curl -i -X POST -H "Content-Type:application/json" -d '{"name":"Audi"}' http://localhost:8080/api/brand
curl -i -X POST -H "Content-Type:application/json" -d '{"name":"Honda"}' http://localhost:8080/api/brand


tesla=$(http GET http://localhost:8080/api/brand/search/findByName\?name\=Tesla | jq -r '._embedded.brand[0]._links.self.href')
curl -i -X POST -H "Content-Type:application/json" -d '{"name":"Model X" , "brand" : "http://localhost:8080/api/brand/2"}' http://localhost:8080/api/model

curl -i -X POST -H "Content-Type:application/json" -d '{"plaque":"1-ABC-123", "model" : "http://localhost:8080/api/model/5" }' http://localhost:8080/api/car
