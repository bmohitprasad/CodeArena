FROM gcc:latest
WORKDIR /app
COPY . .
RUN gcc code.c -o code
CMD ["./code"]
