import { urlParser } from '../safari-service';

describe('safari service', () => {
  test('urlParser', () => {
    const testUrl1 = '/us/en/drive/san-francisco/inspections/';
    const testUrl2 = '/br/pt-br/drive/requirements/?city=sao-paulo';
    const testUrl3 = '/br/pt-br/drive/requirements';
    const testUrl4 = '/br/pt-br/drive/requirements/?city=sao-paulo&?nocache=true';
    expect(urlParser(testUrl1)).toBe('san francisco');
    expect(urlParser(testUrl2)).toBe('sao paulo');
    expect(urlParser(testUrl3)).toBe('');
    expect(urlParser(testUrl4)).toBe('sao paulo');
  });
});
