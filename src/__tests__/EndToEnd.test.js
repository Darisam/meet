import puppeteer from 'puppeteer';
import { jest } from '@jest/globals';

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
