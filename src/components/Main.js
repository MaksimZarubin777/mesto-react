import React from "react";
import api from "../utils/Api";
import Card from "./Card";

function Main( {onEditProfile, onAddPlace, onEditAvatar, onCardClick} ) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  function setProfileData(data) {
    setUserName(data.name);
    setUserDescription(data.about);
    setUserAvatar(data.avatar);
  };

  // запрос данный профиля и карточек
  React.useEffect(() => {
    Promise.all([api.getProfileInfo(), api.getInitialCard()])
    .then(([profileData, cardData]) => {
      // устанавливаем данные профиля
      setProfileData(profileData); 
      // генерируем карточки
      const newCards = cardData.map(card => {
        return {
          name: card.name,
          likes: card.likes,
          link: card.link
        };
      });
      setCards(newCards);
    })
    .catch(err => {
      console.log(err)
    })
  }, []);


  return (
    <main className="content">
    <section className="profile">
      <div className="profile__avatar-block">
        {/* В задании сказано, что картинку нужно передать через style. 
        Если использовать img, то из-за отсутствия ссылки в src на сайте отображается alt.
        Можно ли было использовть img, а картинку передавать в src? Почему просят передать именно через style? */}
        <div className="profile__avatar" onClick={onEditAvatar}  style={{ backgroundImage: `url(${userAvatar})`}}/>
        <div className="profile__avatar-update"></div>
      </div>
      <div className="profile__info">
        <div className="profile__title">
          <h1 className="profile__text-title">{userName}</h1>
          <button className="profile__button-edit" type="button" onClick={onEditProfile}></button>
        </div>
        <p className="profile__text-subtitle">{userDescription}</p>
      </div>
      <button className="profile__button-add" type="button" onClick={onAddPlace}></button>
    </section>
    <section className="elements" aria-label="Места">
      {cards.map((card, index) => (
        <Card key={index} card={card} onCardClick={onCardClick}/>
      ))}
    </section>
  </main>
  )
};

export default Main;