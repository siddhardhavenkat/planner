// Fetch and display the travel plan
fetch('travel_plan.json')
  .then(response => response.json())
  .then(data => {
    const outputDiv = document.getElementById('travel-plan-output');
    let html = `
      <h2>Travel Plan for ${data.destination || 'Your Trip'}</h2>
      <p><strong>Duration:</strong> ${data.duration || 'N/A'}</p>
      <p><strong>Interests:</strong> ${data.interests ? data.interests.join(', ') : 'N/A'}</p>
      <h3>Plan Details:</h3>
      <ul>`;

    data.plan.forEach(dayPlan => {
      html += `
        <li>
          <span class="day-header">Day ${dayPlan.day || 'N/A'} (${dayPlan.date || 'N/A'})</span>
          <ul>`;
      dayPlan.activities.forEach(activity => {
        if (typeof activity === 'object' && activity !== null) {
          html += `
            <li class="activity">
              <strong>${activity.time || ''}</strong> ${activity.description || 'No description'}`;
          if (activity.point_of_interest) {
            const poi = activity.point_of_interest;
            html += `
              <div class="point-of-interest">
                <strong>${poi.name || 'Point of Interest'}</strong> (${poi.type || 'N/A'})`;
            if (poi.location) html += `<br>Location: ${poi.location}`;
            if (poi.details) html += `<br>Details: ${poi.details}`;
            html += `</div>`;
          }
          html += `</li>`;
        } else {
          html += `<li class="activity">${activity}</li>`;
        }
      });
      html += `</ul></li>`;
    });

    html += `</ul>`;
    outputDiv.innerHTML = html;
  })
  .catch(error => {
    console.error('Error fetching or rendering travel plan:', error);
    document.getElementById('travel-plan-output').innerHTML =
      '<p style="color: red;">Error loading travel plan.</p>';
  });
