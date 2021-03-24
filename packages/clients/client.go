package clients

type Client struct {
	Id        string             `dynamodbav:id`
	Email     string             `dynamodbav:email`
	CreatedAt string             `dynamodbav:createdAt`
	Pots      map[string]float32 `dynamodbav:pots`
}
