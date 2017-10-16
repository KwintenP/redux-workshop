export type StarWarsCharacter = Readonly<Partial<{
  id: string;
  name: string;
  birth_year: string;
  gender: string;
  rating: number;
}>>;
