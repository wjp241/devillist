function run(expanded) {
  var companyLink = expanded.querySelector('.startup-link')
  var companyName = companyLink.textContent
  var applyButton = expanded.querySelector('a.apply-now-button')
  applyButton.click()

  let observer = new MutationObserver((mutations, observer) => {
    var textarea = document.querySelector(
      ".ReactModal__Content--after-open textarea[name='note']",
    )

    //when there's text area
    if (textarea) {
      var openmodal = document.querySelector('.ReactModal__Content--after-open')
      var recruiterName = openmodal.querySelector('span.name').textContent
      var firstName = recruiterName.split(' ')[0]
      var upperFirstName =
        firstName.charAt(0).toUpperCase() + firstName.slice(1)
      var coverletterText = `Hello ${upperFirstName},\n\nI would like to thank you in advance for reading this cover letter.\n\nMy name is Jae Park and I am a full-stack Javascript developer in San Francisco. For the frontend, I use React and Redux for creating UI components. For the server-side, I use Express on Node for building APIs and processing http requests. For testing, I use Jest, React Testing Library, and Cypress.\n\nOverall, I am a software engineer who strives to be a better problem solver everyday with persistence and grit.\n\nIt would be awesome if I could learn more about ${companyName}‘s fullstack/frontend engineering opportunity and also share my experience with you.\n\nPlease feel free to reach out to me at woojae.jay.park@gmail.com. I will also leave my usual weekly availability just in case this streamlines interviewing process for both of us:\n\n9:30am - 12:30 pm and 1:30pm - 5:30pm  (Californian Time)\n\nLooking forward to speaking with you,\n\nJae`
      textarea.value = coverletterText

      //when coverletter is filled into the textarea
      if (textarea.style.height === '271px') {
        //click send button when I type a character in the textarea
        textarea.onkeydown = () => {
          expanded.onclick = null
        }
        observer.disconnect()
      }
    }
  })

  observer.observe(document, {
    childList: true,
    subtree: true,
    attributes: true,
  })
}

var initialJobTable = document.querySelector('.browse_startups_table')
var initialJobs = initialJobTable.querySelectorAll('.browse_startups_table_row')

function addOnClickToJobs(jobs) {
  jobs.forEach(
    job =>
      (job.onclick = e => {
        run(job)
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
