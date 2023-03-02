function Card( {card, onCardClick} ) {
  function handleClick() {
    onCardClick(card)
  };
  return(
    <div className="cards">
      <article className="card">
        <button className="card__trash" type="button"></button>
        <div className="card__img" onClick={handleClick} style={{ backgroundImage: `url(${card.link})`}}/>
        <div className="card__info">
          <h2 className="card__title">{card.name}</h2>
          <div className="card__like-block">
            <button className="card__heart" type="button"></button>
            <p className="card__like-counter">{card.likes.length}</p>
          </div>
        </div>
      </article>
    </div>
  )
};

export default Card;