import puppeteer from 'puppeteer';
import { jest } from '@jest/globals';
import { getEvents, extractLocations } from '../api';

describe('show/hide an events details', () => {
  let browser;
  let page;

  beforeAll(async () => {
    jest - setTimeout(30000);
    browser = await puppeteer.launch({
      headless: true,
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.event');
  });

  afterAll(() => {
    browser.close();
  });

  test('an event is collapsed by default', async () => {
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeNull();
  });

  test('user can expand an event to see its details', async () => {
    await page.click('.event .toggleDetails');

    const eventDetails = await page.$('.event .details');
    expect(eventDetails).not.toBeNull();
  });

  test('user can collapse an event to hide its details', async () => {
    await page.click('.event .toggleDetails');

    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeNull();
  });
});

describe('filter events by city', () => {
  let browser;
  let page;

  beforeAll(async () => {
    jest - setTimeout(30000);
    browser = await puppeteer.launch({
      headless: true,
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
  });

  afterAll(() => {
    browser.close();
  });

  test('a list of all events is shown by default, but at most 32', async () => {
    const eventList = await page.$$('.EventList li');
    const allEvents = await getEvents();
    expect(eventList).toHaveLength(Math.min(allEvents.length, 32));
  });

  test('user gets suggestions when typing in the name of a city', async () => {
    // Create a new matcher for jest:
    // toBeginWith checks whether one string starts with another string

    expect.extend({
      toBeginWith(received, expected) {
        if (typeof received !== 'string') {
          return {
            message: () => 'expected received value to be a string',
            pass: false,
          };
        }
        if (typeof expected !== 'string') {
          return {
            message: () => 'expected expected value to be a string',
            pass: false,
          };
        }

        const pass = received.startsWith(expected);
        if (pass) {
          return {
            message: () => '',
            pass: true,
          };
        } else {
          return {
            message: () => `expected ${received} to start with ${expected}`,
            pass: false,
          };
        }
      },
    });

    ////////

    const cityName = 'lon';
    await page.type('.city', cityName);
    const suggestions = await page.$$('.suggestions li');
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    const selectedLocations = allLocations.filter((location) =>
      location.toUpperCase().startsWith(cityName.toUpperCase())
    );

    // Check whether we get the right number of suggestions

    expect(suggestions).toHaveLength(selectedLocations.length + 1);

    // Check whether we get the right kind of suggestions

    for (let i = 0; i < suggestions.length - 1; i++) {
      let suggestionText = await page.evaluate(
        (body) => body.textContent,
        suggestions[i]
      );
      expect(suggestionText.toUpperCase()).toBeginWith(cityName.toUpperCase());
    }
  });
});
