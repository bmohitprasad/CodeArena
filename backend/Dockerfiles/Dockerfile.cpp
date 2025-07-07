FROM gcc:latest
WORKDIR /app
COPY . .
RUN g++ code.cpp -o code
CMD ["./code"]
