import React, { useEffect, useState } from 'react';
import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import EditProfilePopup from './EditProfilePopup';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
  //  переменные состояния, отвечающие за видимость трёх попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  // стейт-переменная для попап с картинкой
  const [selectedCard, setSelectedCard] = useState(null);

  const [cards, setCards] = React.useState([]);

  const [currentUser, setCurrentUser] = useState({});

  useEffect(()=>{
    api.getProfileInfo()
    .then(data => {
      setCurrentUser(data)
    })
  },[])

  useEffect(() => {
    api.getInitialCard()
    .then(cardData => {
      setCards(cardData)
    })
    .catch(err => {
      console.log(err)
    })
  },[])

  // изменение значения состояния попапа профиль
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  // изменение значения состояния попапа место
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  // изменение значения состояния попапа аватар
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  // клик по карточке
  function handleCardClick(card) {
    setSelectedCard(card)
  };
  
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.handleLikeStatus(card._id, !isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => console.log(err))
  }

  function handleCardDelete(cardId) {
    api.deleteCard(cardId)
    .then(() => {
      setCards((previousCards) => previousCards.filter((c) => c._id !== cardId));
    })
    .catch((err) => console.log(err))
  }

  function handleUpdateAvatar({avatar}) {
    api.avatarUpdate(avatar)
    .then((data) => {
      setCurrentUser(data)
      closeAllPopups()
    })
    .catch((err) => console.log(err))
  }

  // закрываем попапы
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null)
  }

  // обновляем данные профиля
  function handleUpdateUser(data) {
    api.updateProfileInfo(data)
    .then((newData) => {
      setCurrentUser(newData)
      closeAllPopups()
    })
    .catch((err) => console.log(err))
  }

  // добавить карточку
  function handleAddPlaceSubmit(data) {
    api.addNewCard(data)
    .then((newCard) => {
      setCards([newCard, ...cards]); 
      closeAllPopups()
    })
  }

  return (
    <div className="body">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header />
          <Main 
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick} 
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike} 
            onCardDelete={handleCardDelete}/>

          {/* попап профиль */}
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
          
          {/* попап место */}
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onPlaceAdd={handleAddPlaceSubmit}/>

          {/* попап аватар */}
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>

          {/* попап картинка */}
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <Footer />
        </CurrentUserContext.Provider>   
      </div>
    </div>
  );
}

export default App;
