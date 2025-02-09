import styles from './Breadcrumbs.module.scss';
import { useTranslation } from 'next-i18next';
import IGenre from '@/models/IGenre';
import { firstCapitalLetter } from '../../utils/functions';
import TextLinkUI from '../UI/links/TextLink/TextLinkUI';
import { useRouter } from 'next/router';
import { useAppSelector } from '../../store/hooks/redux';

interface BreadcrumbsProps {
    path: string[];
    genre?: IGenre;
    tailName?: { name: string; enName: string };
    type?: 'slash' | 'point' | 'pointShort';
    linked?: boolean;
}

const Breadcrumbs = ({ path, genre, tailName, type = 'slash', linked = true }: BreadcrumbsProps) => {
    const { t } = useTranslation('collection');
    const { locale, asPath } = useRouter();
    const { genres, countries } = useAppSelector((state) => state.staticData);

    const localizedPaths = path.map((item) => {
        const splitItem = item.split('-');
        const joinedItem =
            splitItem.length > 1 ? splitItem[0] + splitItem[1][0].toUpperCase() + splitItem[1].slice(1) : splitItem;

        return t(`${joinedItem}`);
    });

    return (
        <div className={styles.container} data-testid={'breadcrumbs'}>
            <ul className={[styles.container__crumbsList, styles[`container__crumbsList_${type}`]].join(' ')}>
                {type !== 'pointShort' && (
                    <TextLinkUI
                        option="bright"
                        href={'/'}
                        className={type === 'slash' ? styles.container__crumb : styles.container__crumb2}
                    >
                        {t('myIvi')}
                    </TextLinkUI>
                )}
                {localizedPaths.map((item, index) => {
                    const last = index === path.length - 1;
                    const ref = path[index];

                    if (!linked) {
                        return localizedPaths.length > 1 && index === 0 ? (
                            <li key={`${index}${type}`}>
                                <TextLinkUI option="bright" href={'/movies'} className={styles.container__crumb}>
                                    {t('movies')}
                                </TextLinkUI>
                            </li>
                        ) : (
                            <li key={index} className={styles.container__unlinked}>
                                {item}
                            </li>
                        );
                    }

                    if (!last) {
                        if (item !== 'persons' && linked) {
                            return (
                                <li key={`${index}${type}`}>
                                    <TextLinkUI
                                        option="bright"
                                        href={`/${ref}`}
                                        className={
                                            type === 'slash' ? styles.container__crumb : styles.container__crumb2
                                        }
                                    >
                                        {item}
                                    </TextLinkUI>
                                </li>
                            );
                        }
                    } else {
                        if (genre && tailName) {
                            return (
                                <div key={`${index}_${type}`}>
                                    <li key={`${type}${genre.enName}`}>
                                        <TextLinkUI
                                            option="bright"
                                            href={`/collections/${genre.enName}`}
                                            className={type === 'slash' ? styles.container__crumb : ''}
                                        >
                                            {firstCapitalLetter(locale === 'ru' ? genre.name : genre.enName)}
                                        </TextLinkUI>
                                    </li>
                                    {type !== 'pointShort' && (
                                        <li key={`${index}${type}`} className={styles.container__tail}>
                                            {locale === 'ru' ? tailName.name : tailName.enName}
                                        </li>
                                    )}
                                </div>
                            );
                        }
                        if (tailName) {
                            return (
                                type !== 'pointShort' && (
                                    <li key={index}>{locale === 'ru' ? tailName.name : tailName.enName}</li>
                                )
                            );
                        } else {
                            const genre = genres.filter((genre) => genre.enName === item);
                            const country = countries.filter((country) => country.enName === item.split('_').join(' '));
                            if (genre.length > 0)
                                return (
                                    <li key={index}>
                                        {firstCapitalLetter(locale === 'ru' ? genre[0].name : genre[0].enName)}
                                    </li>
                                );
                            if (country.length > 0)
                                return (
                                    <li key={index}>
                                        {firstCapitalLetter(locale === 'ru' ? country[0].name : country[0].enName)}
                                    </li>
                                );
                            return <li key={index}>{item}</li>;
                        }
                    }
                })}
            </ul>
        </div>
    );
};
export default Breadcrumbs;
