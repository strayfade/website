# Strayfade/Website

The public source code of [Strayfade.com](https://strayfade.com)

<img src="https://img.shields.io/badge/MongoDB-%2347A24800?style=for-the-badge&logo=MongoDB&logoColor=%23FFF">
<img src="https://img.shields.io/badge/Express-%231c1c1c00?style=for-the-badge&logo=Express&logoColor=%23FFF">
<img src="https://img.shields.io/badge/Node.js-%2333993300?style=for-the-badge&logo=Node.js&logoColor=%23FFF">

#
> Do you know a language that isn't English? You can contribute to this repository by translating for us!
>
> The project's localization files are in the `localization` directory. Simply copy one of the existing ones, rename it to the locale you are translating for, and translate the values in the JSON file. 
>
> You can submit a new localization file by opening a pull request.

### Usage

1. Install [Node.js](https://nodejs.org/en/download/) (obviously)

2. Clone this repository and `cd` into it:
```Bash
git clone --recursive https://github.com/Strayfade/Website.git
cd Website
```

3. Install packages using the command `npm i`

4. **Optional:** Create a MongoDB database and tell the server where to find it in `config.json` 
(Leave `databaseUri` empty to run without MongoDB):
```JSON
"databaseUri": "mongodb+srv://YOUR_SERVER_URI",
"databaseName": "strayfade",
"databaseCollectionName": "analytics"
```

5. Run the command `node index.js` to start the server.

6. Navigate to the site, hosted locally at [localhost:3000](http://localhost:3000) by default.