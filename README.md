This bot was made by Mario Pérez Gil

# Utility

This is a bot that gathers weather data and returns it via chat. You can select the city you want to get the weather from.

## Working on

- Create alerts at specific time.
- Design specific situations that makes the bot text you (for instance: The bot can check if it is going to rain and warn you).

## Installation

After getting your bot token:

In the project directory, run:
### 1. `npm install` or `yarn`
Installs all the dependencies.

### 2. `TELEGRAM_BOT_TOKEN=<your bot token> node main.js`
This will make the bot start working.

##Commands the bot includes

### `/help` or `/help <command name>`

Displays "help" message or specific command help message.

### `/location <city>`

Selects that city to start gathering data.

### `/currentlocation`

Returns currently selected city

### `/currentweather`

Returns current weather for the previously selected city

### `/forecast <options>`

Returns currently selected city forecast for today and a maximum of 5 days.

Options available:tomorrow,all (default is today)
