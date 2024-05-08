
# Run Management System

This project is a comprehensive system designed to assist in run management, integrating multiple functionalities into one platform. It allows for efficient run management, payment processing, photo uploads, real-time chat communication during runs, and email notifications.


![Logo](https://res.cloudinary.com/dxe84cnj6/image/upload/v1715151202/sucduo4dedicni1g8fay.png)


## Features

- Race Management: Add, edit, and delete runs, manage details such as distances, date, time, participant limits, results and also generate reports.
- Payments: Integration with Stripe for online payment processing.
- Photo Uploads: Convenient photo uploads related to runs and users through integration with Cloudinary.
- Run Chat: Real-time communication between run organizers and participants using SignalR technology.
- Email Notifications: Sending email notifications, such as registration confirmations, forgotten password, remind password, using the SendGrid service.


## Technology Stack

**Backend:** 
- .NET 
- SQL Server
- EF Core
- Mapster
- SignalR

**Frontend:** 
- React, 
- TypeScript, 
- MobX,
- Axios,
- TailwindCSS



## Demo

[MainPage](https://res.cloudinary.com/dxe84cnj6/image/upload/v1715151604/kjo57neza4aqrimflfyk.png)

[RacePage](https://res.cloudinary.com/dxe84cnj6/image/upload/v1715152690/hq3liu3vokhjmesgm0pt.png)


## Installation

Clone the repository to your local machine.
```bash
 git clone <link_to_repository>
 cd RunHub
```
Navigate to the frontend directory and install dependencies using npm install.
```bash
 cd frontend/runHubFront
 npm install
```
Navigate to the backend directory and install dependencies using dotnet restore.
```bash
 cd backend
 dotnet restore
```
Configure the environment, including API keys for services such as Stripe, Cloudinary, SendGrid, etc.

Set up SQL Server and configure connection strings in the backend application.
```bash
 "ConnectionStrings": {
   "DefaultConnection": "Data Source=[YOUR_SERVER_ADDRESS];Database=[YOUR_DATABASE] Trusted_Connection=True"
 }
```
Run the backend and frontend using the appropriate commands (dotnet run for the backend and npm start for the frontend).

backend:
```bash
 cd .\backend\RunHub.API\
 dotnet run
```
frontend:
```bash
 cd .\frontend\runHubFront\
 npm start
```

Open a browser and navigate to the local address to use the application.
```bash
 http://localhost:3000
```
