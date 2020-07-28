import React, { useContext } from 'react';
import axios from 'axios';
import UserContext from '../UserContext';
import useMountEffect from '../utils/useMountEffect';
import { Link, useHistory } from "react-router-dom"
import { useState } from 'react';

const makeAuthHeaders = ({ user }) => ({ headers: { 'Authorization': `Bearer ${user.accessJwt}` } });

const EmergencyContact = ({ isEditing, handleDelete, id, name, description, contact_numbers: contactNumbers }) => {
    const history = useHistory();

    const handleContactDelete = () => handleDelete(id);
    const handleContactEdit = () => isEditing && history.push(`/edit/emergencycontact/${id}`);

    return (
        <div className="emergencyContact__row">
            {isEditing && 
                <div className="emergencyContact__delete_action" onClick={handleContactDelete}>
                    <i className="fas fa-minus-circle icon"></i>
                </div>
            }
            <div className={`emergencyContact__main_column ${isEditing ? 'active' : '' }`} onClick={handleContactEdit}>
                {name}
                <div className="subtext">{description}</div>
            </div>
            <div className="emergencyContact__contact_column">
                {contactNumbers.map(({ numtype, number }, i) => {
                    const label = numtype ? `${numtype}: ` : '';
                    return (
                        <div key={number} className="number-container">
                            {(i >= 1) && <span>&nbsp;| </span>}
                            <span className="emergencyContact__contact_action">
                                {label}<a href={`tel:${number}`}>{number}</a>
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const EmergencyContacts = () => {
    const userContext = useContext(UserContext);
    const [apiContacts, setApiContacts] = useState([]);
    const [editMode, setEditMode] = useState(false);

    useMountEffect(() => {
      axios
          .get(`/api/emergencycontacts`, makeAuthHeaders(userContext))
          .then(({ data }) => {
              setApiContacts(data.emergency_contacts);
          })
          .catch(error => alert(error));
  });

    const handleStartEditing = () => setEditMode(true);
    const handleDoneEditing = () => {
        setEditMode(false);
    }
    const handleDelete = id => {
        const continueDelete = window.confirm('Are you sure you want to delete the emergency contact?');
        if(!continueDelete) return;
        axios
            .delete(`/api/emergencycontacts/${id}`, makeAuthHeaders(userContext))
            .then(() => {
                setApiContacts(apiContacts.filter(contact => contact.id !== id));
            })
            .catch(error => alert(error));
    }

    return (
        <div className="emergency_contacts__container">
            <div className="section-header">
                <div className="page-title">
                    <h2>Emergency Numbers</h2>
                    <div className="rounded" onClick={handleStartEditing}><i className="fas fa-pen icon"></i></div>
                </div>
                <Link className="is-rounded" to="/add/emergencyContact">
                    <i className="fas fa-plus-circle"></i> Create Emergency Number
                </Link>
            </div>
            <div className="table-row">
                <div className="row_container">
                    {
                        apiContacts.map(contact => (
                            <EmergencyContact key={contact.id} isEditing={editMode} handleDelete={handleDelete} { ...contact } />
                        ))
                    }
                </div>
            </div>
            {editMode &&
                <div className="section-footer">
                    <button className="active button is-rounded" onClick={handleDoneEditing}>DONE</button>
                </div>
            }
        </div>
    )
}

export default EmergencyContacts;