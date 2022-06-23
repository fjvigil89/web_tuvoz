# get the base node image
FROM node:14.17.0 as builder

# set the working dir for container
WORKDIR /frontend
ENV REACT_APP_API_URL="http://155.210.153.12:8080/"
# copy the json file first
COPY . .
# install npm dependencies
RUN npm install


# build the folder
RUN npm run build -prod

# Handle Nginx
FROM nginx
ENV REACT_APP_API_URL="http://155.210.153.12:8080/"
COPY --from=builder /frontend/build /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf