dev:
	docker-compose up --rm open-shift 

run-test:
	docker-compose run --rm open-shift-test

prod:
	docker-compose up open-shift-prod