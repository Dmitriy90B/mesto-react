import React from "react";
import { api } from "../utils/Api";
import Card from "./Card";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
    const [userName, setProfileName] = React.useState("");
    const [userDescription, setProfileJob] = React.useState("");
    const [userAvatar, setProfileAvatar] = React.useState("");
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        function userInfo() {
            api.getUserInfo()
                .then((item) => {
                    setProfileName(item.name);
                    setProfileJob(item.about);
                    setProfileAvatar(item.avatar);
                })
                .catch((err) => console.log(`Ошибка: ${err}`));
        }
        userInfo();
    }, []);

    React.useEffect(() => {
        function initialCards() {
            api.getInitialCards()
                .then((data) => {
                    setCards(data);
                })
                .catch((err) => console.log(`Ошибка: ${err}`));
        }
        initialCards();
    }, []);

    return (
        <main className="content">
            <section className="profile">
                <img
                    src={userAvatar}
                    alt="Аватар"
                    className="profile__avatar"
                />
                <button
                    type="button"
                    className="profile__avatar-button"
                    onClick={onEditAvatar}
                ></button>
                <div className="profile__user">
                    <h1 className="profile__name">{userName}</h1>
                    <button
                        type="button"
                        className="profile__edit-button"
                        onClick={onEditProfile}
                    ></button>
                    <p className="profile__job">{userDescription}</p>
                </div>
                <button
                    type="button"
                    className="profile__add-button"
                    onClick={onAddPlace}
                ></button>
            </section>

            <section className="elements">
                <ul className="elements__items">
                    {cards.map((card) => (
                        <Card
                            card={card}
                            onCardClick={onCardClick}
                            key={card._id}
                        />
                    ))}
                </ul>
            </section>
        </main>
    );
}

export default Main;
