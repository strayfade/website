# [**strayfade.com**](https://strayfade.com)

Strayfade/Website is the public source code of [Strayfade.com](https://strayfade.com)

> Do you know a language that isn't English? You can contribute to this repository by translating for us!
>
> The project's localization files are in the `localization` directory. Simply copy one of the existing ones, rename it to the locale you are translating for, and translate the values in the JSON file. 

### Usage

1. Install [Node.js](https://nodejs.org/en/download/) (obviously)

2. Clone this repository and `cd` into it:
```Bash
git clone https://github.com/Strayfade/Website.git
cd Website
```

3. Install packages using the command `npm i`

4. **Optional:** Create a MongoDB database and tell the server where to find it in `Config.js` 
(Leave `MongoDB.URI` empty to run without MongoDB):
```JS
MongoDB: {
    URI: "YOUR DATABASE URI",
    Name: "strayfade",
    Collection: "analytics"
}
```

5. Run the command `npm start` to start the server (this automatically builds static files and listens on the port defined in `Config.js`).

6. Navigate to the site, hosted locally at [localhost:3000](http://localhost:3000) by default.