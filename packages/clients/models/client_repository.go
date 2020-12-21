package clients

type ClientRepository interface {
	add(client Client) void
	getByEmail(email string) Client
}
