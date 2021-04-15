### Date
15th April, 2021

### Location of deployed application
https://dreamy-borg-883e2a.netlify.app/

### Time spent
4.5 hours

### Assumptions made
* Navigator geolocation api is providing the correct location, in case of any error in geolocation API, I have used a default location (Vancouver)

### Shortcuts/Compromises made
* Have sliced the results coming from the hourly data api to fit better on the screen

### Stretch goals attempted
* Have made the application responsive
* Have added a search bar, so other cities can also be explored
Other than the stretch goals mentioned, I have also added an autocomplete API in the search so user experience is improved and finding cities is easier

### Instructions to run assignment locally
**npm i**
**npm start**

### What did you not include in your solution that you want us to know about?
* In the autocomplete section, I have not enabled keyboard navigation using the arrow keys
* Error cases could have been handled better
* There is no 'click outside and close the dropdown' in the autocomplete dropdpwn

### Other information about your submission that you feel it's important that we know if applicable.
I have followed CSS modules and used SCSS with the BEM methodology. I have kept the common components in a folder called 'components', common functions in 'utils' and have used axios for the API hits. I have also debounced the search input, so that we don't burst our http request quota

### Your feedback on this technical challenge
Overall, it was a good experience for me.