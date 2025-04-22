export class Card {
  constructor(
    public id: string,
    public word: string,
    public transcription: string,
    public translation: { language: string; text: string }[],
    public example: { language: string; text: string }[],
    public audioUrl: string,
    public category: string,
    public difficulty: string,
  ) {}

  updateTranslation(newTranslation: { language: string; text: string }[]) {
    this.translation = newTranslation;
  }

  updateExample(newExample: { language: string; text: string }[]) {
    this.example = newExample;
  }

  changeCategory(newCategory: string) {
    if (!newCategory.trim()) {
      throw new Error('Category cannot be empty');
    }
    this.category = newCategory;
  }

  static fromDocument(cardDoc: any): Card {
    return new Card(
      cardDoc._id.toString(),
      cardDoc.word,
      cardDoc.transcription ?? '',
      cardDoc.translation ?? [],
      cardDoc.example ?? [],
      cardDoc.audioUrl ?? '',
      cardDoc.category,
      cardDoc.difficulty,
    );
  }
}
