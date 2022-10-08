FROM quay.io/keycloak/keycloak:19.0.3
ENV KC_DB_USERNAME=postgres
ENV KC_DB_PASSWORD=postgres
ENV KC_DB_URL='jdbc:postgresql://postgres:5432/postgres'
EXPOSE 8080
ENTRYPOINT ["/opt/keycloak/bin/kc.sh", "start-dev", "--db=postgres"]