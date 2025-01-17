# Real-Time News System

## Overview
A real-time news system built with Python, RabbitMQ, NestJS, and Angular.

## Project Structure
- `news-generator/`: Python script for generating and publishing news.
- `backend/`: NestJS backend service.
- `frontend/`: Angular frontend for the news feed.

## Getting Started
Detailed setup instructions for each service will be added in subsequent sections.


- Build all Docker images
docker-compose build

- Start the containers
docker-compose up

### Verify
Backend: Open http://localhost:3000 to check if the backend is running.
Frontend: Open http://localhost:4200 to view the news feed.
RabbitMQ Management Console: Open http://localhost:15672 and log in with guest/guest to monitor the RabbitMQ queues.
News Generator: Check the logs to ensure it's publishing news items to RabbitMQ.
