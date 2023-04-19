import { useEffect } from 'react';
import ActorItem from '../ActorItem/ActorItem';

import { IActor } from './Temp/IActor';

interface ActorListProps {
    actors: IActor[];
    role?: boolean;
    effect?: boolean;
    amt?: boolean;
    size?: 'large' | 'medium' | 'small';
    className?: string;
}

const ActorList = ({ actors, amt, role, effect, size, className }: ActorListProps) => {
    return (
        <>
            {actors.map((actor) => (
                <ActorItem
                    key={actor.id}
                    className={className}
                    href="/"
                    actor={actor}
                    amt={amt ?? true}
                    effect={effect ?? true}
                    role={role ?? true}
                    size={size ?? 'large'}
                />
            ))}
        </>
    );
};

export default ActorList;
