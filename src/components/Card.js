import React from "react";

function Card(props) {

    function handleClick() {
        props.onCardClick(props.card);
    } 

    return (
        <li className="elements__position">
            <img
                className="elements__item"
                onClick={handleClick}
                src={props.card.link}
                alt={props.card.name}
            />
            <button type="button" className="elements__trash"></button>
            <div className="elements__text">
                <h3 className="elements__title">{props.card.name}</h3>
                <div>
                    <button type="button" className="elements__like"></button>
                    <p className="elements__likes">{props.card.likes.length}</p>
                </div>
            </div>
        </li>
    );
}

export default Card;
