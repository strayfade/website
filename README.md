### Strayfade/Website
The public source code of [Strayfade.com](https://strayfade.com)

#

*This repository will not always reflect the current website at times.*

#

### Usage

1.  Install [Node.js](https://nodejs.org/en/download/) (obviously)

2.  Clone this repository and `cd` into it:
```Bash
git clone --recursive https://github.com/Strayfade/Website.git
cd Website/
```

3. **Optional**: If you wish to have the ability to view website analytics, create a `.env` file with the following contents (You will be prompted for credentials when viewing the website anaytics):
```
USER=YourUserName
PASS=YourPassWord
```

4. Run the command `node index.js` to start the server.

5. Navigate to the site, hosted locally at [localhost:3000](http://localhost:3000) by default.

6. **Optional**: To view analytics, navigate to [/api/Analytics](http://localhost:3000/api/Analytics)