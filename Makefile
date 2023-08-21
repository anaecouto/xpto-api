IMAGE_NAME=xpto-api
RELEASE_NAME=xpto-api
NAMESPACE=app
IMAGE_TAG:=$(shell jq -r '.version' package.json)
REGISTRY=k3d-registry.localhost:5000
CLUSTER_NAME=my-cluster

.PHONY: build-image tag-image push-image

create-registry:
	k3d registry create registry.localhost --port 5000

create-cluster:
	k3d cluster create $(CLUSTER_NAME) --registry-use $(REGISTRY)

build-image:
	docker build -t $(IMAGE_NAME):$(IMAGE_TAG) .

tag-image:
	docker tag $(IMAGE_NAME):$(IMAGE_TAG) $(REGISTRY)/$(IMAGE_NAME):$(IMAGE_TAG)

push-image:
	docker push $(REGISTRY)/$(IMAGE_NAME):$(IMAGE_TAG)

deploy-image:
	helm upgrade --install --namespace $(NAMESPACE) $(RELEASE_NAME) .\charts\ --create-namespace
