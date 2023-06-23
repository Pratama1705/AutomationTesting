## How To Run Cypress Test Case (UI Automation & API Automation)

1. Ensure to already install nodejs and npm
2. Clone This Repository
3. Open Terminal/CMD, type `npm install` and enter. It will install dependencies based on **package.json** file
4. After installing progress done, **node_modules** folders will be created
5. Add new files in root folder that names **cypress.env.json** to store your API Token Key
6. Write in **cypress.env.json** file like this
   ```json
   {
      "API_KEY_BASE": "Your WeatherBit API Key",
      "API_KEY_FREETRIAL": "Your WeatherBit API Key"
   }
   ```
7. Save it and type `npx cypress open` to open cypress menu
8. After cypress menu opened, choose End to End (E2E) Testing
   <img width="500" alt="image" src="https://github.com/Pratama1705/AutomationTesting/assets/73006848/81284244-f3ea-4642-96bc-0af5fd070d2c">
9. Choose a browser that you want to use, preffered to choose **Google Chrome**
10. Select automation script file that you want to run and script will be run
    <img width="500" alt="image" src="https://github.com/Pratama1705/AutomationTesting/assets/73006848/0ad779d8-c03b-43bb-8ee9-6b4036e4398b">

## Continous Integration
Script able to run at **CircleCI** because it's already provided with **`config.yml`** file. Script automation is success to run in **CircleCI** for
API Testing Script.
```yml
version: 2.1
orbs:
  cypress: cypress-io/cypress@3
workflows:
  build:
    jobs:
      - cypress/run:
          cypress-command: 'npx cypress run --env API_KEY_BASE=${API_KEY_BASE},API_KEY_FREETRIAL=${API_KEY_FREETRIAL} --spec "cypress/e2e/weatherAPI.cy.js"'
```
<img width="577" alt="image" src="https://github.com/Pratama1705/AutomationTesting/assets/73006848/948dbf32-2748-47e9-b26b-10d2a1f37e4a">

<img width="540" alt="image" src="https://github.com/Pratama1705/AutomationTesting/assets/73006848/4779ea11-fd7a-4023-89b2-8d1f3e645763">

## IMPORTANT NOTES
The API Key for **API_KEY_BASE** and **API_KEY_FREETRIAL** is different based on endpoint that will to use. At second case, we will hit endpoint **`/forecast/3hourly?postal_code={postal_code}`**
but it required premium/pro token that need real money to use. So, alternative option to do this is to use **`/forecast/hourly?postal_code={postal_code}`** endpoint to get
some weather data. The reason for choosing this alternative API is the response has similarity with second cases that able to get **`timestamp_utc`** and **`weather`**

## BONUS POINTS
Answer for bonus points on **number 2** is, after you able to run cypress based on step before, you able to run cypress on headless mode. You should write and type command **`npx cypress run --browser chrome --spec cypress\e2e\searchNumberPlate.cy.js`** in terminal/CMD and then hit enter. Cypress script test cases will be run in terminal and return result of testing.
