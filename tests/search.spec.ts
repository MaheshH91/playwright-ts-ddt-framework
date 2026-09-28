import { test, expect } from '../src/fixtures/pageFixtures';

test.describe('Search Product Tests', () => {

    test('Verify search with valid product @smoke @regression', async ({ homePage }) => {
        const searchPage = await homePage.searchProduct('HP');
        expect(await searchPage.displayStatusOfHPValidProduct()).toBeTruthy();
    });

    test('Verify search with non-existing product @regression', async ({ homePage }) => {
        const searchPage = await homePage.searchProduct('Honda');
        const message = await searchPage.retrieveNoProductMessageText();
        expect(message).toBe('There is no product that matches the search criteria.');
    });

    test('Verify search without providing search criteria @regression', async ({ homePage }) => {
        const searchPage = await homePage.clickSearchButton();
        const message = await searchPage.retrieveNoProductMessageText();
        expect(message).toBe('There is no product that matches the search criteria.');
    });
});
