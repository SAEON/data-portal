# @saeon/anyproxy

TODO

Required - use Redis

```
docker run --name redis -d -p 6379:6379 redis:latest
```

## Docker deployment

```
docker build -t anyproxy -f ./src/@saeon/anyproxy/Dockerfile .
```
