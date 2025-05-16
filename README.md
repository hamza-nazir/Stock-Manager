1. Open the Project in VS Code

Open the folder containing your project in Visual Studio Code.

2. Install Node.js Packages

Open the terminal in VS Code.

Run the following command to install all required packages from package.json:

npm install
3. Create the Database in MySQL Workbench

Open MySQL Workbench.

Open the schema file (.sql) provided in your project.

Go to Database > Forward Engineer.

Follow the prompts to create the database schema.

4. Configure Database Connection

In your project folder, go to:

public/js/connection.js

Inside connection.js, update the password with your MySQL database password:

Edit
password: 'your_database_password'

5. Run the Project

In the VS Code terminal, run:

node index.js
The server should now be running, and you can open the app in your browser.


