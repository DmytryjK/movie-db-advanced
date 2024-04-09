import { Container, LinearProgress } from '@mui/material';
import { useState } from 'react';
import { useGetEpisodesQuery } from '../../services/rickandmorty';
import type { EpisodesQuery } from '../../services/rickandmorty';
const defaultQuery = { page: 1 };
const Extra = () => {
    const [query, setQuery] = useState<EpisodesQuery>(defaultQuery);
    const { data, isFetching } = useGetEpisodesQuery(query);
    return (
        <Container sx={{ my: 10 }}>
            {!isFetching &&
                data?.results.map((item) => {
                    const { name, characters, episode } = item;
                    return (
                        <div key={episode}>
                            <h3>{name}</h3>
                            <ul>
                                {characters.map((char) => {
                                    return (
                                        <li key={char.id}>
                                            <h4>{char.name}</h4>
                                            <img
                                                src={char.image}
                                                alt={char.name}
                                            />
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    );
                })}
            {isFetching && <LinearProgress color="secondary" sx={{ mt: 3 }} />}
            <div>
                <button
                    onClick={() =>
                        setQuery((prev) => {
                            return {
                                ...prev,
                                page: prev.page > 1 ? prev.page - 1 : 1,
                            };
                        })
                    }
                >
                    prevPage
                </button>
                <button
                    onClick={() =>
                        setQuery((prev) => {
                            return {
                                ...prev,
                                page: prev.page + 1,
                            };
                        })
                    }
                >
                    nextPage
                </button>
            </div>
        </Container>
    );
};

export default Extra;
