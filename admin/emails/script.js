window.addEventListener("DOMContentLoaded", function () {
  const complainsHolder = document.getElementById("complains-holder");
  let emails = JSON.parse(localStorage.getItem("Emails")) || [];
  if (emails) {
    renderEmails(emails)
  } else complainsHolder.innerHTML = `<h4 class="text-center">No Emails </h4>`




  function renderEmails(emails) {
    complainsHolder.innerHTML = ''
    for (let i = 0; i < emails.length; i++) {
      let details = document.createElement('details')
      details.id = "complains-holder"
      details.classList = "row rounded-3 w-100 overflow-hidden justify-content-center align-items-start py-2"
      let summary = document.createElement("summary")
      summary.classList = "col-12 col-md-4 me-auto d-felx w-100 p-3"
      summary.innerHTML = `
            <table class="w-100">
              <tr>
                <td>${emails[i].fullName}</td>
                <td>${emails[i].email}</td>
                <td>${emails[i].phone}</td>
              </tr>
            </table>           
              `

      let complainDetails = document.createElement("textarea")
      let hr = document.createElement("hr")
      complainDetails.disabled = true
      complainDetails.style.backgroundColor = '#49626e'
      complainDetails.style.color = 'white'
      complainDetails.style.lineHeight = 2
      complainDetails.rows = 6
      complainDetails.classList.add("p-3")
      complainDetails.value = emails[i].message
      details.appendChild(summary)
      details.appendChild(complainDetails)
      // details.appendChild(hr)
      complainsHolder.appendChild(details)
      complainsHolder.appendChild(hr)
      // text replay
      let replay = document.createElement("textarea")
      replay.type = "text"
      replay.rows = 5
      replay.required = true

      replay.placeholder = "Replay to the user"
      details.appendChild(replay)
      // submit replay
      let submitReplay = document.createElement("button")
      submitReplay.classList.add('btn', 'btn-warning')
      submitReplay.innerText = "Replay"
      submitReplay.type = "submit"
      details.appendChild(submitReplay)
      submitReplay.addEventListener('click', () => sendReplay(emails[i].id, replay, emails[i].email))
    }
  }

  function sendReplay(emailId, replayText, userEmail) {
    if (replayText.value.length != 0) {
      let answers = JSON.parse(localStorage.getItem("answers")) || []
      let restEmails = JSON.parse(localStorage.getItem("Emails")).filter((email) => email.id != emailId)
      localStorage.setItem("Emails", JSON.stringify(restEmails))

      let answer = { id: emailId, answer: replayText.value, email: userEmail }
      answers.push(answer)
      localStorage.setItem("answers", JSON.stringify(answers))
      renderEmails(restEmails)
    } else alert("please write reaply first")
  }

})
