import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
    const [isEditProfilePopupOpen, setPopupEdit] = React.useState(false);
    const [isAddPlacePopupOpen, setPopupAdd] = React.useState(false);
    const [isEditAvatarPopupOpen, setPopupAvatar] = React.useState(false);
    const [selectedCard, setPopupWithConfirmation] = React.useState(null);

    const handleEditClick = () => {
        setPopupEdit(true);
    };

    const handleAddClick = () => {
        setPopupAdd(true);
    };

    const handleAvatarClick = () => {
        setPopupAvatar(true);
    };

    const handleCardClick = (card) => {
        setPopupWithConfirmation(card);
    };

    const closeAllPopups = () => {
        setPopupEdit(false);
        setPopupAdd(false);
        setPopupAvatar(false);
        setPopupWithConfirmation(null);
    };

    return (
        <div className="page">
            <Header />
            <Main
                onEditProfile={handleEditClick}
                onAddPlace={handleAddClick}
                onEditAvatar={handleAvatarClick}
                onCardClick={handleCardClick}
            />
            <Footer />
            <PopupWithForm
                name="profile-edit"
                title="Редактировать профиль"
                isOpen={isEditProfilePopupOpen}
                saveButton="Сохранить"
                onClose={closeAllPopups}
            >
                <input
                    type="text"
                    name="name"
                    className="popup__input"
                    id="name-card"
                    required
                    placeholder="Имя"
                />
                <span id="name-card-error" className="error"></span>
                <input
                    type="text"
                    name="job"
                    className="popup__input"
                    id="job-card"
                    required
                    placeholder="О себе"
                />
                <span id="job-card-error" className="error"></span>
            </PopupWithForm>
            <PopupWithForm
                name="profile-add"
                title="Новое место"
                isOpen={isAddPlacePopupOpen}
                saveButton="Создать"
                onClose={closeAllPopups}
            >
                <input
                    type="text"
                    name="heading"
                    className="popup__input popup__input_profile_heading"
                    id="text-card"
                    placeholder="Название"
                    required
                />
                <span id="text-card-error" className="error"></span>
                <input
                    type="url"
                    name="link"
                    className="popup__input"
                    id="url-card"
                    placeholder="Ссылка на картинку"
                    required
                />
                <span id="url-card-error" className="error"></span>
            </PopupWithForm>
            <PopupWithForm
                name="profile-avatar"
                title="Обновить аватар"
                isOpen={isEditAvatarPopupOpen}
                saveButton="Сохранить"
                onClose={closeAllPopups}
            >
                <input
                    type="url"
                    name="avatar"
                    className="popup__input"
                    id="url-avatar"
                    placeholder="Ссылка на картинку"
                    required
                />
                <span id="url-avatar-error" className="error"></span>
            </PopupWithForm>
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
    );
}

export default App;
