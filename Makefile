# Makefile

.PHONY: compile-ts-files start

migration:
	sequelize init:migrations

migrate:
	sequelize db:migrate 

compile-ts-files:
	tsc -p tsconfig.json

start:
	nodemon

run-all: compile-ts-files migration migrate start 



