'use client';

import style from "@/app/cssComponents/Shimmer.module.css"; 

export default function Shimmer() {
  return (
    <div className={style["shimmer-container"]}>
      {Array.from({ length: 8 }).map((_, i) => (
        <div className={style['news-card']} key={i}>
          <div className={style["news-image-container"]}>
            <div className={style["shimmer-animation"]} />
          </div>
          <div className={style["card-text-content"]}>
            <h4 className={`${style['title']} ${style["shimmer-animation"]}`}></h4>
            <p className={`${style['text']} ${style["shimmer-animation"]}`}></p>
            <p className={`${style['text']} ${style["shimmer-animation"]}`}></p>
            <p className={`${style['summary']} ${style["shimmer-animation"]}`}></p>
          </div>
        </div>
      ))}
    </div>
  );
}
