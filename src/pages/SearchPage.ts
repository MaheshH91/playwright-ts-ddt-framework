import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class SearchPage extends BasePage {
    readonly validHPProduct: Locator;
    readonly noProductMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.validHPProduct = page.locator('//a[text()="HP LP3065"]');
        this.noProductMessage = page.locator('#content h2 + p');
    }

    async displayStatusOfHPValidProduct(): Promise<boolean> {
        return this.isElementVisible(this.validHPProduct);
    }

    async retrieveNoProductMessageText(): Promise<string> {
        return this.getText(this.noProductMessage);
    }
}
