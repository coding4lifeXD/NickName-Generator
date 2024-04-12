let defaultNickNames = ["The Jester", "Crusher", "The Scientist", "The Sloth", "The Hawk", "The Computer", "The Robot", "Fuzzball"]
let myNickNames = []

// starter variables
let randomNickNameBtn = document.getElementById("randomNickBtn")
let allNickNameBtn = document.getElementById("allNickBtn")
let firstName = document.getElementById("first_name")
let lastName = document.getElementById("last_name")
let outputSection = document.querySelector("div")


// randomNickName event listener, and actions
randomNickNameBtn.addEventListener("click", () => {  
  let randomNumSelector = Math.floor(Math.random() * defaultNickNames.length)
   // filter out the defaultnicknames already used for specific name
  let fullName = (`${firstName.value.trim()}${lastName.value.trim()}`).toLowerCase()
  let generatedNickName = `${capitalize(firstName.value.trim())} ${defaultNickNames[randomNumSelector]} ${capitalize(lastName.value.trim())}`
  let nameIndex = myNickNames.findIndex(item => item.name == fullName)
 
  // if the name does not exist, we append its name and nicknames we have created
  if (nameIndex === -1) {
    myNickNames.push({name: fullName, nicknames: [generatedNickName], avaliableNames: [...defaultNickNames.filter(item => item!== defaultNickNames[randomNumSelector])]})
  }
    
  // if it does exist, we push the nickname to its corresponding name. we take 
  else {
   myAvailableNames = myNickNames[nameIndex].avaliableNames
    // alerting user if no more nicknames exist for that specific person and resetting values
    if (myAvailableNames.length === 0) {
      outputSection.innerHTML = ''
      alert(`No more nicknames left for ${capitalize(firstName.value.trim())} ${capitalize(lastName.value.trim())}....`)
      firstName.value= ''
      lastName.value = ''
      return;
    }

    // make array out of thenick names avaliable  then pick a random one avaliable
    randomNumSelector =  Math.floor(Math.random() * myAvailableNames.length)
    selectedNickName = myAvailableNames[randomNumSelector]
    // generate new nickname
    generatedNickName = `${capitalize(firstName.value.trim())} ${selectedNickName} ${capitalize(lastName.value.trim())}`
    myNickNames[nameIndex].nicknames.push(generatedNickName)
     myNickNames[nameIndex].avaliableNames = myAvailableNames.filter(item => item !== selectedNickName);
  }
  // outputing content towards html
  nameIndex = myNickNames.findIndex(item => item.name == fullName)
  console.log("INFO: ", myNickNames[nameIndex])
  outputSection.innerHTML = generatedNickName
})

// allNickNames event listener, and actions
allNickNameBtn.addEventListener("click", () => {
  const htmlContent = myNickNames.map(({ nicknames }) => nicknames.join('<br>'));
  outputSection.innerHTML = htmlContent;
});

// capitalize words
function capitalize(word) {
  return word.charAt(0).toUpperCase() + (word.slice(1, word.length)).toLowerCase()
}