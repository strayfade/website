# Strayfade/Website
The public source code of [Strayfade.com](https://strayfade.com) made using the **MEN** stack (MongoDB, Express, NodeJS)

> Do you know a language that isn't English? You can contribute to this site by translating for us!
>
> The site's language files are in the `localization` directory. Simply copy one of the existing ones, rename it to the locale you are translating for, and translate the values in the JSON file. 
>
> You can submit a new localization file by opening a pull request.

### Usage

1.  Install [Node.js](https://nodejs.org/en/download/) (obviously)

2.  Clone this repository and `cd` into it:
```Bash
git clone --recursive https://github.com/Strayfade/Website.git
cd Website/
```

3. **Optional:** Create a MongoDB database and tell the server where to find it in `config.json`:
```JSON
"databaseUri": "mongodb+srv://<user>:<pass>@cluster0.bch0ttx.mongodb.net/?retryWrites=true&w=majority", // Replace "user" and "pass" with your credentials (leave blank to skip MongoDB)
"databaseName": "strayfade",
"databaseCollectionName": "analytics"
```

4. Run the command `node index.js` to start the server.

5. Navigate to the site, hosted locally at [localhost:3000](http://localhost:3000) by default.

6. **Optional**: To view analytics, navigate to [/api/Analytics](http://localhost:3000/api/Analytics)
