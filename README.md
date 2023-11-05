# Injury Tracker

A simple Injury tracking web application that simplifies the process of recording, managing, and analyzing injuries and incidents.

## Technologies Used

- HTML
- CSS
- JavaScript
- React
- Express
- Auth0

## Features

- Signup and Login: user account management using auth0.
- A body map to visually locate the injury.
- A search query to find any report by name.
- Filter by start and end date time, sort by injury/ report date time ascending/descending order.
- Ability to edit or delete existing report.

## Setup

Use the node package manager (npm) to install the dependencies.

Note: Please note that this requires a backend service to operate.

- Clone this repo

```console
git clone https://github.com/girish-n7/injury-tracker.git
```

(or) download this repo as zip

- Install the dependencies once the repo is cloned.

```console
npm install
```

- Run the service on your localhost

```console
npm run dev
```

- The service will usually be hosted on http://localhost:5173/

## Usage

1. Signup and Login: If you are a new user, click on the Sign Up button and fill out the registration form to create an account. If you already have an account, click on Log In and provide your credentials.

2. Submitting an Injury Report: To report a new injury, click on the Report button. Fill out the injury details, including a name, date, and time. Use the body map tool to mark the location of your injury visually. Click on the area of your body where the injury is located, and the tool will highlight the chosen spot. Click Submit to save the report.

3. Viewing and Editing Reports: To view a report, click on the View icon on the card. To edit a report, click the Edit icon on the card. (Please note that you cannot remove existing injuries from a report.)

4. Deleting a Report: To delete a report, click on the Delete icon on the card.

5. Search and Filter: To find specific reports, use the search and filter options on the dashboard. You can search by injury name. Use filter to filter reports by start and end dates of injury or report.

6. Sort Reports: Sort the reports by injury date time/report date time in ascending/descending order

## Project Status

Online.

## Contributing

Contributions are welcome! If you find any issues or want to enhance the app, feel free to open a pull request.

## Contact

[LinkedIn](https://www.linkedin.com/in/girish-n-7075ba1a4)

[Github](https://github.com/girish-n7)
