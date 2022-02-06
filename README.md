# Health-Dock

- [Health-Dock](#health-dock)
  * [Introduction](#introduction)
  * [Tech Stack](#tech-stack)
  * [Features](#features)
 
## Introduction

The use of web applications for healthcare is a young and dynamic field that could improve the well-being of people around the world. Web applications can lower costs, enhance healthcare quality, and shift behavior to strengthen prevention, all of which can improve health outcomes over the long term.

**Health Dock** is a web application that can maintain an electronic medical record to improve the work process, patient safety, and quality of healthcare.
The goal is to enhance Nation's Health IT Infrastructure and strengthen the relationship between patients and clinicians.

## Tech Stack

This project makes use of **MERN** Stack

-   [MongoDB](https://www.mongodb.com/): A document-oriented, No-SQL database used to store the application data. [Mongoose](https://mongoosejs.com/) is used as an Object Data Modelling (ODM) library to manage the MongoDB Database efficiently.

-   [NodeJS](https://nodejs.org/): The JavaScript runtime environment. It is used to run JavaScript on a machine rather than a browser.

-   [ExpressJS](https://expressjs.com/): A framework layered on top of NodeJS, used to build the backend of a site using NodeJS functions and structures. In addition to it, the [express-async-handler](https://www.npmjs.com/package/express-async-handler) package is used for handling exceptions inside async express routes.

-   [ReactJS](https://reactjs.org/): A javascript UI library used for creating rich and engaging web apps with minimal code. Also, the styling of this project is backed by a [styled-components](https://www.styled-components.com/), which provides a fun styling experience.

### Other dependencies include:

[Fast2SMS API](https://www.fast2sms.com/) - An online SMS service used to send OTP for user login/register providing a healthy and hassle-free authentication environment.
It is also used in integrating SMS service to notify patients whenever hospitals add or update their records, which helps maintain the transparency of the whole process.

[Cloudinary](https://cloudinary.com/) - A cloud service that is used to add upload support to the web application. It is used in storing patient profile avatars and the reports of their corresponding record. In the backend, [multer](https://www.npmjs.com/package/multer) and [multer-storage-cloudinary](https://www.npmjs.com/package/multer-storage-cloudinary) packages are used to handle file uploads to the cloudinary cloud.

[EmailJS](https://www.emailjs.com/) - This JavaScript library is used for sending user queries to the admin through the contact section of the application.

**Authentication packages:** [JSON Web Token(JWT)](https://jwt.io/) and [bcryptjs](https://www.npmjs.com/package/bcryptjs) are used for providing authentication token and password hashing services, respectively.

## Features

-   Its simple, minimalist & clean UI makes digital interaction efficient and straightforward. Users can add multiple members and maintain their health records. They can also view and edit the patient profiles.

-   OTP-based authentication makes it a safe and secure platform for patients to store and maintain their health records. Users receive an OTP in their registered mobile number when they log in/register in their account.

-   Express Middleware adds logging and authentication functionality that prevents unauthorized access to the application.

-   The portal provides hospitals to add new patient records, allowing them to add record details and upload report files. The patient can also view their record from the user dashboard.

-   Hospitals can also easily add, view, edit and delete patient health records. Although hospitals cannot view and edit the patient's records that are not added by them. It avoids privacy breaches as no one can see a patient's entire health records. 

-   The patient is notified through SMS whenever hospitals add or update their record. If users find it suspicious, they can immediately contact the concerned hospital.

-   The application also provides a Contact page where user can ask their queries by sending them through the contact form.
