Here’s a more neutral version of the README text:

# Soccer Fields

This program contains fictional match results of European leagues for the 2023/2024 season. It calculates and displays results in a tabular format for each league.

## Features

-   **League Selection**: Choose a league and the time span of games.
-   **Detailed Tables**: Displays data such as team name, rank, points, victories, and more.
-   **Sorting**: The table is statically sorted by Points(desc), Goal Difference(desc), Victories(desc), and Team Names(asc).
-   **All-Leagues View**: View data for all leagues if no specific league is selected.
-   **Data Download**: Download or copy tables for later use.

This program is based on the M426 module "Git and Scrum" at BBZW Sursee.

## Installation Guide

Clone the repository into a local Folder

```
git clone https://github.com/danieljancar/soccer-fields
```

Afterwards, open the Folder in a IDE (for example Visual Studio Code) and install the following packages

```
npm install
npm install -g npx
```

## Starting Guide

To start the application, execute the following command from a terminal or your IDE

```
npm run transform && ng serve
```

Afterwards you can find the application under the following url

-   localhost:4200

## Testing Guide

Execute the following command to run all Tests

```
npm run ng test
```
