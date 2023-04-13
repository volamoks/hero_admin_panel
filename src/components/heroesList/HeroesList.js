import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { useGetHeroesQuery, useDeleteHeroMutation } from '../../api/apiSlice';

import HeroesListItem from '../heroesListItem/HeroesListItem';
import Spinner from '../spinner/Spinner';

const HeroesList = () => {
    const { data: heroes, isFetching, isLoading, isError } = useGetHeroesQuery();

    const [deleteHero] = useDeleteHeroMutation();

    const activeFilter = useSelector(state => state.filter.activeFilter);

    console.log(heroes, activeFilter);

    const filteredHeroes = useMemo(() => {
        if (activeFilter == 'all') {
            return heroes;
        }
        return heroes?.filter(hero => hero.element === activeFilter);
    }, [heroes, activeFilter, deleteHero]);

    const onDeleteItem = useCallback(id => deleteHero(id), []);

    if (isLoading || isFetching) {
        return <Spinner />;
    }
    if (isError) {
        return <h5 className="text-center mt-5">Loading data error</h5>;
    }

    const renderHeroesList = arr => {
        return arr?.map(({ id, ...props }) => {
            return (
                <HeroesListItem
                    key={id}
                    {...props}
                    onDeleteItem={() => onDeleteItem(id)}
                />
            );
        });
    };

    const elements = renderHeroesList(filteredHeroes);

    return <ul>{elements}</ul>;
};

export default HeroesList;
