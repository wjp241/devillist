//get initial jobtable and jobs contained within
var initialJobTable = document.querySelector('.browse_startups_table')
var initialJobs = initialJobTable.querySelectorAll('.browse_startups_table_row')
function getCompanyName(clickedJob) {
  var companyLink = clickedJob.querySelector('.startup-link')
  var companyName = companyLink.textContent
  return companyName
}
function clickApplyButton(clickedJob) {
  var applyButton = clickedJob.querySelector('a.apply-now-button')
  applyButton.click()
}

function getUpperFirstName() {
  //get openmodal,scrape recruiter name from it, return capitalized firstname
  var openmodal = document.querySelector('.ReactModal__Content--after-open')
  var recruiterName = openmodal.querySelector('span.name').textContent
  var firstName = recruiterName.split(' ')[0]
  var upperFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1)

  return upperFirstName
}

function writeCoverLetter(textarea, companyName, upperFirstName) {
  var coverletterText = `Hello ${upperFirstName},\n\nI would like to thank you in advance for reading this cover letter.\n\nMy name is Jae Park and I am a full-stack Javascript developer in San Francisco. For the frontend, I use React and Redux for creating UI components. For the server-side, I use Express on Node for building APIs and processing http requests. For testing, I use Jest, React Testing Library, and Cypress.\n\nOverall, I am a software engineer who strives to be a better problem solver everyday with persistence and grit.\n\nIt would be awesome if I could learn more about ${companyName}‘s fullstack/frontend engineering opportunity and also share my experience with you.\n\nPlease feel free to reach out to me at woojae.jay.park@gmail.com. I will also leave my usual weekly availability just in case this streamlines interviewing process for both of us:\n\n9:30am - 12:30 pm and 1:30pm - 5:30pm  (Californian Time)\n\nLooking forward to speaking with you,\n\nJae`
  textarea.value = coverletterText
  //this wil trigger new mutations related to css style attribute of text area like height
}
function initOpenModalObserver(companyName) {
  //defining events for mutations
  var openModalObserver = new MutationObserver((mutations, observer) => {
    var textarea = document.querySelector(
      ".ReactModal__Content--after-open textarea[name='note']",
    )
    //only when textarea is found
    if (textarea) {
      //get recruiter's firstname in capital andfill in the textarea with cover letter
      var upperFirstName = getUpperFirstName()
      writeCoverLetter(textarea, companyName, upperFirstName)

      //  all the cover letter strings have been filled in when textarea height is 271px,
      if (textarea.style.height === '271px') {
        //user can see the text values visully but clicking sendbutton will post nothing because it accepts trusted(!!isTrusted) key events so user has to type at least once manually.
        //stop the observer so that clicking send button won't dispatch any new mutations and trigger unwated operations
        observer.disconnect()
      }
    }
  })

  //listen to node addition/removal and attribute mutations that occur in direct children and all the descedants of document
  openModalObserver.observe(document, {
    childList: true,
    subtree: true,
    attributes: true,
  })
}

function handleJobOnClick(clickedJob) {
  //scrape the companyname to  be later used in coverletter
  var companyName = getCompanyName(clickedJob)

  //click the applybutton;it clickedJob which was expanded now collapses back, expanded class disappears
  clickApplyButton(clickedJob)

  //modal opens start detecting  whether textarea has been loaded/pass in companyName to be used in cover letter
  initOpenModalObserver(companyName)
}

//To Do: add the below handler to the very first initial job
function handleInitialJobOnClick() {
  console.log('something')
}

//add onclick to all the jobs which will begin the process of auto-filling coverletter into the textarea of openened modal
function addOnClickToJobs(jobs) {
  jobs.forEach(
    job =>
      (job.onclick = () => {
        console.log('when job was clicked!!!!', job.className)
        if (!!job.className.includes('expanded')) {
          handleJobOnClick(job)
        }
      }),
  )
}

addOnClickToJobs(initialJobs)

var jobsObserver = new MutationObserver(mutations => {
  let jobtables = document.getElementsByClassName('browse_startups_table')

  if (jobsObserver.tablelength !== jobtables.length) {
    jobsObserver.tablelength = jobtables.length
    mutations
      .filter(({ type, addedNodes }) => addedNodes && type === 'childList')
      .forEach(({ addedNodes }) => {
        addedNodes.forEach(addedTable => {
          var jobs = addedTable.querySelectorAll('.browse_startups_table_row')
          addOnClickToJobs(jobs)
        })
      })
  }
})

var jobTablesContainer = document.querySelector('.startup-container')
jobsObserver.tablelength = document.getElementsByClassName(
  'browse_startups_table',
).length

jobsObserver.observe(jobTablesContainer, {
  childList: true,
})
