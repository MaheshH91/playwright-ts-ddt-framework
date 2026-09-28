export class DataUtils {
    static generateUniqueEmail(): string {
        return `auto_${Date.now()}_${Math.floor(Math.random() * 1000)}@gmail.com`;
    }
}
