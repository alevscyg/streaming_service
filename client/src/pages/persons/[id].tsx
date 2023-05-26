import MainContainer from '@/components/main_container/MainContainer/MainContainer';
import styles from '@/styles/pages/CardPersonPage.module.scss';
import ImgSquareUI from '@/components/UI/squares/ImgSquareUI/ImgSquareUI';
import FilmographySection from '@/components/sections/FilmographySection/FilmographySection';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import IPerson from '@/models/IPerson';
import IMovies from '@/models/IMovies';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PageNotCreated from '@/components/PageNotCreated/PageNotCreated';
import Loading from '@/components/Loading/Loading';

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale!, ['common', 'footer', 'header', 'modals', 'person', 'moviesPage'])),
    },
});

export const getStaticPaths = async () => {
    return {
        paths: ['/persons/id'],
        fallback: true,
    };
};

function CardActorPage() {
    const { t } = useTranslation(['person', 'moviesPage']);
    const router = useRouter();
    const { id } = router.query;
    const locale = router.locale;

    const [loading, setLoading] = useState(true);
    const [person, setPerson] = useState<IPerson>();

    useEffect(() => {
        const getPerson = async () => {
            try {
                const requestPerson = await axios.get(`http://localhost:6125/personWithAllInfo/${id}`);
                console.log(requestPerson);

                const movies: IMovies[] = [];
                for (let i = 0; i < requestPerson.data[0].movies.length; i++) {
                    const movie = await axios.get(
                        `http://localhost:6125/film/${requestPerson.data[0].movies[i].movieid}`,
                    );

                    movies.push({
                        id: movie.data.film.id,
                        name: movie.data.film.name,
                        enName: movie.data.film.alternativeName,
                        posterPreviewURL: movie.data.film.posterpreviewUrl,
                        premiereRussia: movie.data.film.premiererussia,
                        hasIMAX: movie.data.film.hasIMAX,

                        year: movie.data.film.year,
                        ageRating: movie.data.film.ageRating,
                        ratingKp: movie.data.film.ratingkp,
                        votesKp: movie.data.film.voteskp,
                        movieLength: movie.data.film.movieLength,
                        genres: [],
                        countries: [],
                    });
                }

                setPerson({
                    id: requestPerson.data[0].person.id,
                    name: requestPerson.data[0].person.name,
                    enName: requestPerson.data[0].person.enName,
                    photo: requestPerson.data[0].person.photo,
                    profession: requestPerson.data[0].movies[0].profession,
                    enProfession: requestPerson.data[0].movies[0].enProfession,
                    movies: movies,
                });
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        getPerson();
    }, []);

    return (
        <MainContainer
            keywords={['person']}
            title={
                loading
                    ? `${t('loading', { ns: 'moviesPage' })}`
                    : person
                    ? locale === 'ru'
                        ? `${person.name} (${person.enName}): ${t('browserTab')}. ${person.profession}.`
                        : `${person.enName} (${person.name}): ${t('browserTab')}. ${person.enProfession}.`
                    : `${t('pageError', { ns: 'moviesPage' })}`
            }
            page="other"
        >
            {loading ? (
                <div className="container">
                    <Loading />
                </div>
            ) : person ? (
                <div className="container">
                    <div className={styles.back} onClick={() => router.back()}>
                        <img src="/icons/arrows/arrow_left.svg" alt="arrow left" />
                        {t('back')}
                    </div>

                    <div className={styles.container}>
                        <section className={[styles.container__info, styles.info].join(' ')}>
                            {person.photo && (
                                <div className={styles.info__img}>
                                    <ImgSquareUI person={person} border="medium" />
                                </div>
                            )}
                            <h1 className={styles.info__title}>{locale === 'ru' ? person.name : person.enName}</h1>
                            <span className={styles.info__alternate}>
                                {locale === 'ru' ? person.enName : person.name}
                            </span>
                        </section>
                        <section className={styles.container__filmography}>
                            <FilmographySection movies={person.movies} />
                        </section>
                        <section style={{ color: 'white' }}>Хлебные крошки</section>
                    </div>
                </div>
            ) : (
                <div className="container">
                    <PageNotCreated />
                </div>
            )}
        </MainContainer>
    );
}

export default CardActorPage;
