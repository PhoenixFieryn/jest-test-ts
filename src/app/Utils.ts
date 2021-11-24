import { UrlWithParsedQuery, parse } from 'url';

export class Utils {
	public static parseUrl(url: string): UrlWithParsedQuery {
		if (!url) throw new Error('Invalid URL');
		return parse(url, true);
	}

	public static toUpperCase(str: string): string {
		return str.toUpperCase();
	}
}
