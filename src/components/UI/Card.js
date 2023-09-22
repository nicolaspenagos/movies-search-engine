import React from 'react';
import styles from './Card.module.css';

function Card({children, style}) {
  return (
    <article className={styles.card} style={style}>
      {children}
    </article>
  )
}

export default Card;