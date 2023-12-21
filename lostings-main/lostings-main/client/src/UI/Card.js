import React, { useState } from "react";
import backup from "../media/backup-image.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";

const Card = ({ item, isCreator, onDelete, changeStatus }) => {
  const { tag, description, location, datetime, image, status, creator } = item;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const dateObject = new Date(datetime);
  return (
    <div className="p-4 mb-4 max-w-sm">
      <div className="mt-4">
        <img
          src={image ? image.url : backup}
          alt={tag}
          className="w-full h-48"
        />
      </div>
      <h2 className="text-2xl text-navy my-2 font-semibold uppercase">{tag}</h2>
      <hr className="h-0.5 w-28 rounded my-2 border-0 bg-navy "></hr>
      <div className="space-x-2"></div>
      <p className="text-md text-gray-700 font-medium py-0.5 capitalize">
        {description}
      </p>
      <p className="text-md text-gray-700 font-medium py-0.5 uppercase">{`Last Seen :   ${dateObject.toLocaleString()}`}</p>
      <p className="text-md text-gray-700 font-medium py-0.5 uppercase">{`Location : ${location}`}</p>
      <p className="text-md text-gray-700 font-medium py-0.5 uppercase">{`Status: ${
        status ? "Returned to the owner" : "Not yet found"
      }`}</p>
      <div className="mt-4 flex flow-root">
        {isCreator ? (
          <button
            className={`w-36 p-2 outline outline-2 text-navy hover:bg-navy hover:text-white `}
            onClick={changeStatus}
          >
            Change Status
          </button>
        ) : (
          <button
            className={`w-36 p-2 outline outline-2 text-navy hover:bg-navy hover:text-white `}
            onClick={openModal}
          >
            Claim
          </button>
        )}

        {isModalOpen && <Modal creator={creator} onClose={closeModal} />}

        <button
          onClick={onDelete}
          className={`p-2 text-gray-400 hover:text-navy text-2xl float-right ${
            !isCreator ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
        <Link to={`/item/update/${item._id}`}>
          <button
            className={`p-2 text-gray-400 hover:text-navy text-2xl float-right ${
              !isCreator ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!isCreator}
          >
            <FontAwesomeIcon icon={faPen} />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
