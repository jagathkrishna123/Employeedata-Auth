const sendRequests = async () => {
  for (let i = 1; i <= 15; i++) {
    try {
      const response = await fetch("http://localhost:5000/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `Test Employee ${i}`,
          email: `testemployee${i}@gmail.com`,
          phone: `98765432${String(i).padStart(2, "0")}`,
          age: 25,
          department: "IT",
          position: "Developer",
          salary: 30000,
        }),
      });

      const data = await response.json();

      console.log(`Request ${i}:`, response.status, data);
    } catch (error) {
      console.log(`Request ${i} failed:`, error.message);
    }
  }
};

sendRequests();