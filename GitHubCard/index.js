/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [`https://api.github.com/users/jondscott21`, `https://api.github.com/Bigorange8801/`, 
  `https://api.github.com/users/leananepari`, `https://api.github.com/users/paintedlbird7`, 
  `https://api.github.com/users/cmstexas`, `https://api.github.com/users/sethnadu`, 
  `https://api.github.com/users/davindar`];

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

const cards = document.querySelector('.cards');

// call from a local array
// followersArray.forEach(link => axios.get(link)
// .then(data => {
//   console.log(data.data);
//   let apiData = data.data;
//   cards.appendChild(cardCreator(apiData.avatar_url, apiData.name, apiData.login, apiData.location, apiData.html_url, apiData.followers, apiData.following));
// }))

// .catch(error => {
//   console.log(error)
// })

axios.get(`https://api.github.com/users/jondscott21/followers`)
.then(data => {
  // grabbing follower apit urls and putting them into an array to iterate over
  const peopleArray = []
  let apiData = data.data;
  apiData.forEach(follower => {
    peopleArray.push(follower.url)

  })
  // making a get request for all follower urls
  peopleArray.forEach(friend => axios.get(friend)
    .then(followerList => {
      // pushing each follower object into an array for iteration
      apiPage = []
      apiPage.push(followerList.data)
      console.log(apiPage)
      apiPage.forEach(person => {
        console.log(person)
        cards.appendChild(cardCreator(person.avatar_url, person.name, person.login, person.location, person.html_url, person.followers, person.following));
      })
    }))
})
.catch(error => {
  console.log(error)
})

function cardCreator(imgUrl, nameData, usernameData, locationData, githubLink, followerData, followingData) {
  // Creating card elements
  const card = document.createElement('div');
  const img = document.createElement('img');
  const cardInfo = document.createElement('div');
  const name = document.createElement('h3');
  const username = document.createElement('p');
  const location = document.createElement('p');
  const profile = document.createElement('p');
  const webAddress = document.createElement('a');
  const followers = document.createElement('p');
  const following = document.createElement('p');
  const bio = document.createElement('p');

  // Adding classes to elements
  card.classList.add('card');
  cardInfo.classList.add('card-info');
  name.classList.add('name')
  username.classList.add('username')

  //Adding textContent to elements
  img.src = imgUrl;
  name.textContent = `${nameData}`;
  username.textContent = `${usernameData}`;
  location.textContent = `${locationData}`;
  profile.textContent = `Profile: `;
  webAddress.href = `${githubLink}`;
  webAddress.textContent = `Profile: ${githubLink}`;
  followers.textContent = `Followers: ${followerData}`
  following.textContent = `Following: ${followingData}`

  // Adding html structure
  card.append(img);
  card.append(cardInfo);
  cardInfo.append(name);
  cardInfo.append(username);
  cardInfo.append(location);
  profile.append(webAddress);
  cardInfo.append(profile);
  cardInfo.append(followers);
  cardInfo.append(following);
  cardInfo.append(bio);
  
  return card;
}
