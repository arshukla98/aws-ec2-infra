
# make clean -> make run -> TAG=backstage:1.4.0-infra make docker
run:
	yarn install --frozen-lockfile && yarn tsc &&  yarn build:backend --config ../../app-config.production.yaml
	
docker: 
	docker image build . -f packages/backend/Dockerfile --tag ${TAG} --no-cache
	
clean:
	rm -rf dist-types packages/app/dist packages/backend/dist
