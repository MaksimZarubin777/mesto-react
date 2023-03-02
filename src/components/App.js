import { useState } from 'react';
import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import PopupWithForm from './PopupWithForm';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup';

function App() {
  console.log('это App')
  //  переменные состояния, отвечающие за видимость трёх попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  // стейт-переменная для попап с картинкой
  const [selectedCard, setSelectedCard] = useState(null);

  // стейт переменная для инпутов
  const [formInput, setFormInput] = useState({
    profileName: '',
    profileDescription: '',
    placeName: '',
    placeLink: '',
    avatarLink: ''
  });

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
  }

  // вводим инпуты - берем предыдущее значение всех инпутов, через таргет определяем инпут, его атрибут name - это ключ, значением становится то, что введено
  function handleInput(evt) {
    setFormInput(previousInputs => ({...previousInputs, [evt.target.name]: evt.target.value}))
  }

  // закрываем попапы
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null)
  }

  return (
    <div className="body">
      <div className="page">
        <Header />
        <Main 
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick} 
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick} />

        {/* попап профиль */}
        <PopupWithForm 
          name='profile' 
          title='Редактировать профиль' 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups}>
          <input 
            id="profile-name" 
            name="profileName" 
            placeholder="Ваше имя" 
            type="text" 
            value={formInput.profileName} 
            onChange={handleInput}
            className="popup__input" 
            required 
            minLength="2" 
            maxLength="20" />
          <span className="popup__input-error" id="profile-name-text-error"></span>
          <input 
            id="profile-job" 
            name="profileDescription" 
            placeholder="Расскажите о себе" 
            type="text" 
            value={formInput.profileDescription}
            onChange={handleInput}
            className="popup__input" 
            required 
            minLength="2" 
            maxLength="200" />
          <span className="popup__input-error" id="profile-job-text-error"></span>
        </PopupWithForm>

        {/* попап место */}
        <PopupWithForm 
          name='place' 
          title='Новое место' 
          isOpen={isAddPlacePopupOpen} 
          onClose={closeAllPopups}>
            <input 
              id="place-name" 
              name="placeName" 
              placeholder="Название" 
              type="text" 
              value={formInput.placeName}
              onChange={handleInput} 
              className="popup__input" 
              required 
              minLength="2" 
              maxLength="200" />
            <span className="popup__input-error" id="place-name-text-error"></span>
            <input 
              id="place-img" 
              name="placeLink" 
              placeholder="Ссылка на картинку" 
              type="url" 
              value={formInput.placeLink}
              onChange={handleInput}
              className="popup__input" 
              required />
            <span className="popup__input-error" id="place-img-text-error"></span>
        </PopupWithForm>

        {/* попап аватар */}
        <PopupWithForm 
          name='avatar' 
          title='Обновить аватар' 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups}>
            <input 
              id="avatar-img" 
              name="avatarLink" 
              placeholder="Ссылка на картинку" 
              type="url" 
              value={formInput.avatarLink}
              onChange={handleInput}
              className="popup__input" 
              required />
            <span className="popup__input-error" id="avatar-img-text-error"></span>
        </PopupWithForm>

        {/* попап картинка */}
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <Footer /> 
      </div>
    </div>
  );
}

export default App;
