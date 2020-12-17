package models 

type RouterFunction func() RouterResponse
type RouterVerbMap map[string]RouterFunction
type RouterMap map[string]RouterVerbMap


