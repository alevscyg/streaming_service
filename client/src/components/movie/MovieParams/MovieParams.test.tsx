import { render, screen } from '@testing-library/react';
import MovieParams from './MovieParams';
import { movies } from '../../squareCard/SquareCardsList/Temp/Movie.data';

describe('MOVIEPARAMS SNAPSHOTS TESTS', () => {
    test('MovieParams should not be changed', () => {
        render(<MovieParams movie={movies[0]} />);

        const div = screen.getByRole('div-params');
        expect(div).toMatchSnapshot();
    });
});
