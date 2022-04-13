import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
    const [isEditProfilePopupOpen, setPopupEdit] = React.useState(false);
    const [isAddPlacePopupOpen, setPopupAdd] = React.useState(false);
    const [isEditAvatarPopupOpen, setPopupAvatar] = React.useState(false);
    const [selectedCard, setPopupWithConfirmation] = React.useState(null);
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);

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

    const handleUpdateUser = (card) => {
        api.replaceUserInfo(card)
            .then((item) => {
                setCurrentUser(item);
                closeAllPopups();
            })
            .catch((err) =>
                console.log(`Ошибка при изменении данных пользователя: ${err}`)
            );
    };

    const handleUpdateAvatar = (card) => {
        api.replaceAvatar(card)
            .then((item) => {
                setCurrentUser(item);
                closeAllPopups();
            })
            .catch((err) =>
                console.log(`Ошибка при изменени на аватар: ${err}`)
            );
    };

    const handleAddPlaceSubmit = (card) => {
        api.addCard(card)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) =>
                console.log(`Ошибка при создание карточки: ${err}`)
            );
    };

    const handleCardLike = (card) => {
        const isLiked = card.likes.some((i) => i._id === currentUser._id);
        const changeLikeCardStatus = !isLiked
            ? api.addLike(card._id)
            : api.deleteLike(card._id);
        changeLikeCardStatus
            .then((newCard) => {
                setCards((item) =>
                    item.map((c) => (c._id === card._id ? newCard : c))
                );
            })
            .catch((err) => console.log(`Ошибка лайка: ${err}`));
    };

    const handleCardDelete = (card) => {
        api.deleteByTrash(card._id)
            .then(() => {
                setCards((cards) => cards.filter((c) => c._id !== card._id));
            })
            .catch((err) => console.log(`Ошибка при клике на корзину: ${err}`));
    };

    React.useEffect(() => {
        function handleUserInfo() {
            api.getUserInfo()
                .then((item) => {
                    setCurrentUser(item);
                })
                .catch((err) => console.log(`Ошибка: ${err}`));
        }
        handleUserInfo();
    }, []);

    React.useEffect(() => {
        function initialCards() {
            api.getInitialCards()
                .then((item) => {
                    setCards(item);
                })
                .catch((err) => console.log(`Ошибка: ${err}`));
        }
        initialCards();
    }, []);

    return (
        <div className="page">
            <CurrentUserContext.Provider value={currentUser}>
                <Header />
                <Main
                    onEditProfile={handleEditClick}
                    onAddPlace={handleAddClick}
                    onEditAvatar={handleAvatarClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                />
                <Footer />

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                />

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />

                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            </CurrentUserContext.Provider>
        </div>
    );
}

export default App;
