import RatingPoster from '../../RatingPoster/RatingPoster';
import IRatingFilm from '@/models/IRatingFilm';

interface RatingPostersListProps {
    films: IRatingFilm[]
    className: string
}

const RatingPostersList = ({ films, className }: RatingPostersListProps) => {
    return (
        <>
            <ul>
                {films.map(film => (
                    <li key={film.name}>
                        <RatingPoster 
                            className={className}
                            film={film}
                        />
                    </li>
                ))}
            </ul>
            
            <style jsx>
                {`
                    ul {
                        display: flex;
                    }
                `}
            </style>
        </>
    )
}

export default RatingPostersList