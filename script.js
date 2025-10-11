fetch('travel_plan.json')
  .then(res => res.json())
  .then(data => {
    const div = document.getElementById('travel-plan-output');
    let html = `
      <h2>Trip from ${data.origin} to ${data.destination}</h2>
      <p><strong>Duration:</strong> ${data.duration}</p>
      <p><strong>Interests:</strong> ${data.interests.join(', ')}</p>
      <p><strong>Generated on:</strong> ${data.generated_on}</p>
      <h3>Detailed Plan:</h3>
    `;

    data.plan.forEach(day => {
      html += `<div class="plan-day"><strong>Day ${day.day} - ${day.date}</strong><br>`;
      day.activities.forEach(act => {
        html += `<div class="activity"><strong>${act.time}:</strong> ${act.description}`;
        if (act.point_of_interest) {
          html += `<div class="point-of-interest">
                      <strong>${act.point_of_interest.name}</strong> (${act.point_of_interest.type})
                   </div>`;
        }
        html += `</div>`;
      });
      html += `</div>`;
    });

    div.innerHTML = html;
  })
  .catch(err => {
    console.error('Error loading travel plan:', err);
    document.getElementById('travel-plan-output').innerHTML = "<p style='color:red'>Error loading travel plan.</p>";
  });
