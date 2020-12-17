package models

type RouterResponse struct {
    StatusCode int
    Body string
    Headers map[string]string
    IsBase64Encoded bool
}
