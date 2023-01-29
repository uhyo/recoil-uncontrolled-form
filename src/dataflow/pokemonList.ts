import { Client, gql } from "@urql/core";
import { selector } from "recoil";

const client = new Client({
  url: "https://beta.pokeapi.co/graphql/v1beta",
});

export type Pokemon = {
  id: number;
  name: string;
};

export const pokemonListState = selector<readonly Pokemon[]>({
  key: "dataflow/pokemonList",
  async get() {
    const response = await client
      .query(
        gql`
          query {
            species: pokemon_v2_pokemonspecies(
              where: {}
              order_by: { id: asc }
              limit: 10
            ) {
              id
              pokemon_v2_pokemonspeciesnames(
                where: { language_id: { _in: [11] } }
              ) {
                language_id
                name
              }
            }
          }
        `,
        {}
      )
      .toPromise();
    if (response.error) {
      throw response.error;
    }
    if (!response.data) {
      throw new Error("No Data");
    }
    return response.data.species.map((sp: any) => ({
      id: sp.id,
      name: sp.pokemon_v2_pokemonspeciesnames[0].name,
    }));
  },
});
