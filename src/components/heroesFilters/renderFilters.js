import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { filterSetActive } from './filterSlice';
import { fetchFilter, selectAll } from './filterSlice';
import { useHttp } from '../../hooks/http.hook';

const HeroesFiltersList = () => {
    const filters = useSelector(selectAll);

    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        dispatch(fetchFilter(request));
    }, []);

    const renderFilter = arr => {
        return arr.map(({ id, descr, element }) => {
            let elementClassName;

            switch (element) {
                case 'all':
                    elementClassName = 'btn btn-outline-dark active ';
                    break;
                case 'fire':
                    elementClassName = 'btn btn-danger';
                    break;
                case 'water':
                    elementClassName = 'btn btn-primary';
                    break;
                case 'wind':
                    elementClassName = 'btn btn-success';
                    break;
                case 'earth':
                    elementClassName = 'btn btn-secondary';
                    break;
                default:
                    elementClassName = 'btn btn-outline-dark';
            }
            return (
                <button
                    type="button"
                    onClick={() => setFilters(element)}
                    key={id}
                    id={element}
                    className={elementClassName}
                >
                    {descr}
                </button>
            );
        });
    };

    const elements = renderFilter(filters);

    const setFilters = filter => {
        dispatch(filterSetActive(filter));
    };

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Filter heroes by power type</p>
                <div className="btn-group">{elements}</div>
            </div>
        </div>
    );
};

export default HeroesFiltersList;
