import React, { useState } from "react";
import "../../../article/compte.css";
import axios from "axios";
import {toast,ToastContainer} from 'react-toastify'
export default function CreateCompte() {
  const user = {
    email: "",
    password: "",
    fonction: "1",
    pseudo: "BPROO",
  };
  const [data, setData] = useState(user);
  const createCompte = () => {
    axios
      .post("http://127.0.0.1:5000/api/user", data)
      .then((res) => {
        console.log(res.data);
        setData(user);
        toast.success("utilisateur enregistré ",{theme:'colored',autoClose:1000})
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      <div
        className="alert text-center shadow p-3 mb-2  rounded"
        style={{
          backgroundColor: "deepskyblue",
          color: "#fff",
        }}
      >
        <h5>Créer un compte d'utilisateur </h5>
        <ToastContainer/>
      </div>
      <div className="row mt-3">
        <div className="col-4"></div>
        <div className="col-4 shadow p-3 mb-2 bg-body  rounded">
          <form action="">
            <div className="form-group">
              <label htmlFor="">Email *</label>
              <br />
              <input
                type="text"
                className=""
                required
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Mot de passe *</label>
              <br />
              <input
                type="text"
                className=""
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Fonction *</label>
              <br />
              <select
                name=""
                id=""
                onChange={(e) => setData({ ...data, fonction: e.target.value })}
              >
                <option value="1">Directeur</option>
                <option value="2">Admin</option>
                <option value="3">Utilisateur</option>
              </select>
            </div>
            <button type="button" onClick={createCompte}>
              Créer
            </button>
          </form>
        </div>
        <div className="col-4"></div>
      </div>
    </>
  );
}
