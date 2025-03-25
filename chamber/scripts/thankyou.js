document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const container = document.getElementById("confirmation-info");
  
    const fields = {
      "First Name": params.get("firstname"),
      "Last Name": params.get("lastname"),
      "Email": params.get("email"),
      "Phone": params.get("phone"),
      "Business Name": params.get("organization"),
      "Timestamp": params.get("timestamp")
    };
  
    let html = `<h3>Submitted Info:</h3><ul>`;
    for (const [label, value] of Object.entries(fields)) {
      if (value) {
        html += `<li><strong>${label}:</strong> ${value}</li>`;
      }
    }
    html += `</ul>`;
    container.innerHTML = html;
  });
  