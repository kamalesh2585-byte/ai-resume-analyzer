declare module 'word-extractor' {
  export default class WordExtractor {
    extract(input: string): Promise<{ getBody(): string }>;
  }
}
