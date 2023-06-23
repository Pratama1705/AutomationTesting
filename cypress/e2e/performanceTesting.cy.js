describe('Performance Testing', () => {
  const baseAPI = 'https://api.weatherbit.io/v2.0';
  const API_KEY_BASE = Cypress.env('API_KEY_BASE');

  it('Hit API 10 Times in 60 Seconds - API Current Weather', () => {
    const numRequests = 10;
    const durationInSeconds = 60;
    const startTime = Date.now();
    let requestCount = 0;
    const avgResponseTime = [];

    // Read data from csv data driven
    cy.fixture('statelatlong.csv').then((data) => {
      const rows = data.split('\n');
      rows.shift();

      // Function sendRequest to iterate request
      const sendRequest = () => {
        // Get Data Lattitude & Longitude
        const dataRow = rows[requestCount].split(',');
        const lat = dataRow[0];
        const lon = dataRow[1];

        // Hit API
        cy.request('GET', `${baseAPI}/current?lat=${lat}&lon=${lon}&key=${API_KEY_BASE}`).then((res) => {
          requestCount = requestCount + 1;

          // Assertion status code & response time
          expect(res.status).to.eq(200);
          expect(res.duration).to.be.lessThan(1500);

          // Push to array to search an average of response time
          avgResponseTime.push(res.duration);

          // Iterate until 10 times fetch API in 60 seconds
          const elapsedTime = Date.now() - startTime;
          if (elapsedTime < durationInSeconds * 1000 && requestCount < numRequests) {
            sendRequest();
          } else {
            // Find average of response time
            let total = 0;
            for (let i = 0; i < avgResponseTime.length; i++) {
              total = total + avgResponseTime[i];
            }
            const average = total / avgResponseTime.length;
            cy.log(`Average : ${avgResponseTime}`);
            cy.log(`Average : ${total}`);
          }
        });
      };

      // Call function for the first time
      sendRequest();
    });
  });

  it('Hit API 10 Times in 60 Seconds - API Forecast Hourly', () => {
    const numRequests = 10;
    const durationInSeconds = 60;
    const startTime = Date.now();
    let requestCount = 0;
    const avgResponseTime = [];

    // Read data from csv data driven
    cy.fixture('postal_code.csv').then((data) => {
      const rows = data.split('\n');
      rows.shift();

      // Function sendRequest to iterate request
      const sendRequest = () => {
        // Get data postal code
        const postal_code = rows[requestCount];

        // Hit API
        cy.request('GET', `${baseAPI}/forecast/daily?postal_code=${postal_code}&key=${API_KEY_BASE}`).then((res) => {
          requestCount = requestCount + 1;

          // Assertion status code & response time
          expect(res.status).to.eq(200);
          expect(res.duration).to.be.lessThan(1500);

          // Push to array to search an average of response time
          avgResponseTime.push(res.duration);

          // Iterate until 10 times fetch API in 60 seconds
          const elapsedTime = Date.now() - startTime;
          if (elapsedTime < durationInSeconds * 1000 && requestCount < numRequests) {
            sendRequest();
          } else {
            // Find average of response time
            let total = 0;
            for (let i = 0; i < avgResponseTime.length; i++) {
              total = total + avgResponseTime[i];
            }
            const average = total / avgResponseTime.length;
            cy.log(`Average : ${avgResponseTime}`);
            cy.log(`Average : ${total}`);
          }
        });
      };

      // Call function for the first time
      sendRequest();
    });
  });
});
