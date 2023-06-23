/// <reference types="cypress"/>

describe('API Testing - Weather Bit', () => {
  const baseAPI = 'https://api.weatherbit.io/v2.0';
  const API_KEY_BASE = Cypress.env('API_KEY_BASE');
  const API_KEY_FREETRIAL = Cypress.env('API_KEY_FREETRIAL');

  it.skip('GET Current Lattitude & Longitude', () => {
    const lat = '40.73061';
    const lon = '-73.935242';

    cy.request('GET', `${baseAPI}/current?lat=${lat}&lon=${lon}&key=${API_KEY_BASE}`).then((res) => {
      // Verify status code
      expect(res.status).to.eq(200);

      // Verify response API
      expect(res.body).to.have.property('data');
      expect(res.body.data[0]).to.have.property('state_code');

      // Get state_code & verify
      const state_code_result = res.body.data[0].state_code;
      expect(state_code_result).to.eq('NY');
    });
  });

  it.skip('GET Forecast Daily', () => {
    const postal_code = 28546;
    const datetime = [];
    const weather_icon = [];
    const weather_description = [];
    const weather_code = [];

    cy.request('GET', `${baseAPI}/forecast/daily?postal_code=${postal_code}&key=${API_KEY_BASE}`).then((res) => {
      // Verify status code
      expect(res.status).to.eq(200);

      // Verify response API
      expect(res.body).to.have.property('data');

      // Get datetime & weather information in each data & push to array
      const dataWeather = res.body.data;
      dataWeather.forEach((key) => {
        datetime.push(key.datetime);
        weather_icon.push(key.weather.icon);
        weather_description.push(key.weather.description);
        weather_code.push(key.weather.code);
      });

      // Check selected data array
      datetime.forEach((data) => {
        cy.log(data);
      });
    });
  });

  it('GET Forecast Hourly', () => {
    const postal_code = 28546;
    const timestamp_utc = [];
    const weather_icon = [];
    const weather_description = [];
    const weather_code = [];

    cy.log(API_KEY_FREETRIAL);

    cy.request('GET', `${baseAPI}/forecast/hourly?postal_code=${postal_code}&key=${API_KEY_FREETRIAL}`).then((res) => {
      // Verify status code
      expect(res.status).to.eq(200);

      // Verify response API
      expect(res.body).to.have.property('data');

      // Get timestamp_utc & weather information in each data & push to array
      const dataWeather = res.body.data;
      dataWeather.forEach((key) => {
        timestamp_utc.push(key.timestamp_utc);
        weather_icon.push(key.weather.icon);
        weather_description.push(key.weather.description);
        weather_code.push(key.weather.code);
      });

      // Check selected data array
      weather_description.forEach((data) => {
        cy.log(data);
      });
    });
  });
});
