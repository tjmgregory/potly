package clients

type ClientRepository interface {
	add(client Client)
	getByEmail(email string) Client
}
