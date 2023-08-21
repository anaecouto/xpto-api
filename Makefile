IMAGE_NAME=xpto-api
RELEASE_NAME=xpto-api
NAMESPACE=app
IMAGE_TAG:=$(shell jq -r '.version' package.json)
REGISTRY=ghcr.io/anaecouto
CLUSTER_NAME=my-cluster

create-registry:
	k3d registry create registry.localhost --port 5000

create-cluster-with-registry:
	k3d cluster create $(CLUSTER_NAME) --registry-use $(REGISTRY) --port "8889:80@loadbalancer" --port "8887:443@loadbalancer"

create-cluster:
	k3d cluster create $(CLUSTER_NAME)

build-image:
	docker build -t $(IMAGE_NAME):$(IMAGE_TAG) .

tag-image:
	docker tag $(IMAGE_NAME):$(IMAGE_TAG) $(REGISTRY)/$(IMAGE_NAME):$(IMAGE_TAG)

push-image:
	docker push $(REGISTRY)/$(IMAGE_NAME):$(IMAGE_TAG)

deploy-runner-controller:
	helm upgrade --install github-runner actions-runner-controller/actions-runner-controller \
	--set authSecret.github_token=$(GITHUB_TOKEN) \
	--values .\charts\actions-controller\values.yaml --namespace github-actions --create-namespace

deploy-runners:
	kubectl apply -f .\charts\actions-controller\templates\runner.yaml

deploy-argocd:
	helm upgrade --install argocd argo-cd/argo-cd --values .\charts\argocd\values.yaml --namespace argocd --create-namespace

create-docker-secret:
	kubectl create secret generic github-registry-secret \
  	--from-file=.dockerconfigjson=config.json \
  	--type=kubernetes.io/dockerconfigjson --namespace argocd

deploy-image:
	helm upgrade --install --namespace $(NAMESPACE) $(RELEASE_NAME) .\charts\app --create-namespace