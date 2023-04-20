import AgeBadge from "@/components/UI/badges/AgeBadge/AgeBadge";
import PriceBadge from "@/components/UI/badges/PriceBadge/PriceBadge";
import PreviewPosterContent from "../PreviewPosterContent/PreviewPosterContent";
import Image from "next/image";
import Link from "next/link";
import style from './PreviewPoster.module.scss';

interface PreviewPosterProps {
    className: string
}

const PreviewPoster = ({ className }: PreviewPosterProps) => {
    return (
        <div className={[style.previewPoster, className].join(' ')}>
            <Link href="/">
                <div className={[style.block, style.block_image].join(' ')}>
                    <div className={style.imageWrapper}>
                        <Image
                            className={style.previewPoster__image} 
                            src="" 
                            alt="" />
                    </div>
                    <PreviewPosterContent />
                    <AgeBadge value="18" />
                </div>

                <div className={style.block_text}>
                    <p className={style.previewPoster__title}>Название фильма</p>
                    <PriceBadge priceType="purchase" />
                </div>
            </Link>
        </div>
    )
}

export default PreviewPoster;