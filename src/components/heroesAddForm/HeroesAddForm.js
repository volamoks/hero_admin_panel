import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { useHttp } from '../../hooks/http.hook';
import { nanoid } from 'nanoid';
import { useCreateHeroMutation } from '../../api/apiSlice';

const HeroesAddForm = () => {
    const [name, setName] = useState();
    const [descr, setDescr] = useState();
    const [elem, setElem] = useState();

    const [createHero, { isLoading }] = useCreateHeroMutation();

    const dispatch = useDispatch();
    const { request } = useHttp();

    const onSubmit = e => {
        e.preventDefault();

        const newHero = {
            id: nanoid(),
            name: name,
            description: descr,
            element: elem,
        };
        createHero(newHero).unwrap();

        setName('');
        setDescr('');
        setElem('');
    };

    return (
        <form
            onSubmit={onSubmit}
            className="border p-4 shadow-lg rounded"
        >
            <div className="mb-3">
                <label
                    htmlFor="name"
                    className="form-label fs-4"
                >
                    Name of Your Hero
                </label>
                <input
                    required
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="What is my name?"
                />
            </div>

            <div className="mb-3">
                <label
                    htmlFor="text"
                    className="form-label fs-4"
                >
                    Description
                </label>
                <textarea
                    required
                    name="text"
                    className="form-control"
                    id="text"
                    value={descr}
                    onChange={e => setDescr(e.target.value)}
                    placeholder="What power do I have?"
                    style={{ height: '130px' }}
                />
            </div>

            <div className="mb-3">
                <label
                    htmlFor="element"
                    className="form-label"
                >
                    Select an element for your hero
                </label>
                <select
                    required
                    className="form-select"
                    id="element"
                    value={elem}
                    onChange={e => setElem(e.target.value)}
                    name="element"
                >
                    <option>I have power of...</option>
                    <option value="fire">Fire</option>
                    <option value="water">Water</option>
                    <option value="wind">Wind</option>
                    <option value="earth">Earth</option>
                </select>
            </div>

            <button
                type="submit"
                className="btn btn-primary"
            >
                Create
            </button>
        </form>
    );
};

export default HeroesAddForm;
