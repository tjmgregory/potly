package routes

import (
	"theodo.red/creditcompanion/functions/login/models"
)

func LoginGet() models.RouterResponse {
	response := models.RouterResponse{
		StatusCode:      200,
		Body:            "This router works.",
		IsBase64Encoded: false,
		Headers: map[string]string{
			"Content-Type": "text/html",
		},
	}
	return response
}
