document.getElementById('userForm').addEventListener('submit', function(event) {
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const dob = document.getElementById('dob').value.trim();
  
    if (username === '' || email === '' || dob === '') {
      event.preventDefault(); // Prevent form submission
      alert('Please fill in all fields.');
    }
  });
  