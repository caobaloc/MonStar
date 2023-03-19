ARG IMAGE_NAME

FROM ${IMAGE_NAME} as base

ARG PORT
ARG APP_NAME
ARG SERVICE

ENV APP_NAME=${APP_NAME}
ENV SERVICE=${SERVICE}
ENV PORT=${PORT}

WORKDIR /${APP_NAME}
COPY . .

FROM base as local

WORKDIR /
RUN go install github.com/cosmtrek/air@latest

WORKDIR /${APP_NAME}

CMD air -c ./configs/$SERVICE/.air.toml

EXPOSE ${PORT}
