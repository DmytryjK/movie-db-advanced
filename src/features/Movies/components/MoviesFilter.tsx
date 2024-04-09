import { useMemo, useState } from 'react';
import {
    FormControl,
    Paper,
    Autocomplete,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Skeleton,
} from '@mui/material';
import { debounce } from '@mui/material';
import { FilterAltOutlined } from '@mui/icons-material';
import { Controller, useForm } from 'react-hook-form';
import { useGetGenresQuery, useGetKeywordsQuery } from '../../../services/tmdb';

export interface KeywordItem {
    id: number;
    name: string;
}

export interface Filters {
    keywords?: KeywordItem[];
    genres?: number[];
}

interface MovieFilterProps {
    onApply: (filters: Filters) => void;
}

const MoviesFilter = ({ onApply }: MovieFilterProps) => {
    const [keywordsQuery, setKeywordsQuery] = useState('');
    const { data: keywordsOptions = [], isLoading: keywordsLoading } =
        useGetKeywordsQuery(keywordsQuery, { skip: !keywordsQuery });
    const { data: genres = [], isLoading: genresLoading } = useGetGenresQuery();
    const { handleSubmit, control } = useForm<Filters>({
        defaultValues: {
            keywords: [],
            genres: [],
        },
    });

    const fetchKeywords = useMemo(
        () =>
            debounce((query: string) => {
                setKeywordsQuery(query);
            }, 400),
        [],
    );
    return (
        <Paper sx={{ m: 2, p: 0.5 }}>
            <form action="" onSubmit={handleSubmit(onApply)}>
                <FormControl
                    component="fieldset"
                    variant="standard"
                    sx={{ m: 2, display: 'block' }}
                >
                    <Controller
                        name="keywords"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Autocomplete
                                multiple
                                disablePortal
                                loading={keywordsLoading}
                                options={keywordsOptions}
                                onChange={(_, value) => onChange(value)}
                                filterOptions={(x) => x}
                                getOptionLabel={(option) => option.name}
                                value={value}
                                isOptionEqualToValue={(option, value) =>
                                    option.id === value.id
                                }
                                renderInput={(params) => (
                                    <TextField {...params} label="keywords" />
                                )}
                                onInputChange={(_, value) =>
                                    fetchKeywords(value)
                                }
                            />
                        )}
                    ></Controller>
                </FormControl>
                <FormControl
                    sx={{ m: 2, display: 'block' }}
                    component="fieldset"
                    variant="standard"
                >
                    {genresLoading ? (
                        <Skeleton width={300} height={480} />
                    ) : (
                        <>
                            <FormLabel component="legend">Genres</FormLabel>
                            <FormGroup sx={{ maxHeight: 500 }}>
                                <Controller
                                    name="genres"
                                    control={control}
                                    render={({ field }) => (
                                        <>
                                            {genres.map((genre) => (
                                                <FormControlLabel
                                                    key={genre.id}
                                                    control={
                                                        <Checkbox
                                                            value={genre.id}
                                                            checked={field.value?.includes(
                                                                genre.id,
                                                            )}
                                                            onChange={(
                                                                event,
                                                                checked,
                                                            ) => {
                                                                const valueNumber =
                                                                    Number(
                                                                        event
                                                                            .target
                                                                            .value,
                                                                    );
                                                                if (checked) {
                                                                    field.onChange(
                                                                        [
                                                                            ...(field.value ||
                                                                                ''),
                                                                            valueNumber,
                                                                        ],
                                                                    );
                                                                } else {
                                                                    field.onChange(
                                                                        field.value?.filter(
                                                                            (
                                                                                value,
                                                                            ) =>
                                                                                value !==
                                                                                valueNumber,
                                                                        ),
                                                                    );
                                                                }
                                                            }}
                                                        />
                                                    }
                                                    label={genre.name}
                                                />
                                            ))}
                                        </>
                                    )}
                                />
                            </FormGroup>
                        </>
                    )}
                </FormControl>
                <Button
                    type="submit"
                    variant="contained"
                    startIcon={<FilterAltOutlined />}
                    sx={{ m: 2 }}
                >
                    Apply filter
                </Button>
            </form>
        </Paper>
    );
};

export default MoviesFilter;
