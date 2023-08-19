import React, { useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import {toast,ToastContainer} from 'react-toastify'
export default function Profil() {
  const [email, setEmail] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handleEmail = (event)=>{
    setEmail(event.target.value)
  }
  const handlePseudo = (event)=>{
    setPseudo(event.target.value)
  }
  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    validatePasswordsMatch(newPassword, confirmPassword);
  };

  const handleConfirmPasswordChange = (event) => {
    const newConfirmPassword = event.target.value;
    setConfirmPassword(newConfirmPassword);
    validatePasswordsMatch(password, newConfirmPassword);
  };

  const validatePasswordsMatch = (password, confirmPassword) => {
    setIsValid(password === confirmPassword && password.length >= 8);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isValid) {
      // Soumettez le formulaire ici
      const formData ={
        'email':email,
        'pseudo':pseudo,
        'password':password
      }
      
      console.log('Mots de passe valides :', formData);
    } else {
      // Affichez un message d'erreur ou prenez une autre action
      toast.error("Mot de passe incorrect  ",{theme:'colored',autoClose:1000})
    }
  };

  return (
    <>
     <ToastContainer/>
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6">
          <BiUserCircle style={{ fontSize: "7rem", color: "#bfbfbf" }} /> <br />
          <button className="btn btn-primary">importer image</button>
          <div className="form-group mt-3">
            <label htmlFor="" style={{ width: "150px" }}>
              Email :
            </label>
            <input type="text" value={email} onChange={handleEmail}/>
          </div>
          <div className="form-group mt-3">
            <label htmlFor="" style={{ width: "150px" }}>
              Pseudo :
            </label>
            <input type="text"  value={pseudo} onChange={handlePseudo}/>
          </div>
          <div className="form-group mt-3">
            <label htmlFor="" style={{ width: "150px" }} >
              Mot de passe :
            </label>
            <input type="password" value={password}
            onChange={handlePasswordChange} />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="" style={{ width: "150px" }}>
             Confirmer Mot de passe :
            </label>
            <input type="password" value={confirmPassword}
            onChange={handleConfirmPasswordChange} />
          </div>
          <button className="mt-3 btn btn-primary" onClick={handleSubmit}>
            Modifier
          </button>
        </div>
        <div className="col-3"></div>
      </div>
    </>
  );
}
