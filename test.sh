
http GET http://localhost:8080/hello

http GET http://localhost:5000/models

http GET http://localhost:8080/chaining

# Full demo


# Add models
curl -i -X POST -H "Content-Type:application/json" -d '{"name":"Model 3" , "brand" : "Tesla"}' http://localhost:8080/api/model
curl -i -X POST -H "Content-Type:application/json" -d '{"name":"Model X" , "brand" : "Tesla"}' http://localhost:8080/api/model
curl -i -X POST -H "Content-Type:application/json" -d '{"name":"Model S" , "brand" : "Tesla"}' http://localhost:8080/api/model
curl -i -X POST -H "Content-Type:application/json" -d '{"name":"Serie 3" , "brand" : "BMW"}' http://localhost:8080/api/model
curl -i -X POST -H "Content-Type:application/json" -d '{"name":"A3" , "brand" : "Audi"}' http://localhost:8080/api/model
curl -i -X POST -H "Content-Type:application/json" -d '{"name":"A4" , "brand" : "Audi"}' http://localhost:8080/api/model

# Assign cars
curl -i -X POST -H "Content-Type:application/json" -d '{"plaque":"1-ABC-123", "employee":"Buffalo Bill" , "model" : "http://localhost:8080/api/model/5" }' http://localhost:8080/api/car
curl -i -X POST -H "Content-Type:application/json" -d '{"plaque":"1-EFG-456", "employee":"John Doe" , "model" : "http://localhost:8080/api/model/1" }' http://localhost:8080/api/car

# Car Details
curl -i -X POST -H "Content-Type:application/json" -d '{"name":"Model S" , "brand" : "Tesla"}' http://localhost:8080/api/car-details