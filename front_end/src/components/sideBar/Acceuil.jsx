import React, { useEffect, useState } from "react";
import { BiCart, BiGroup, BiUser } from "react-icons/bi";
import "../../article/acceuil.css";
import user1 from "../../assets/user1.png";
import user2 from "../../assets/user2.png";
import user3 from "../../assets/user3.png";
import ChartComponent from "../contenu/acceuil/ChartComponent ";
import axios from "axios";
import PieChart from "../contenu/acceuil/PieChart";

export default function Acceuil() {
  const [countProd, setProd] = useState(0);
  const [countSortie, setSortie] = useState(0);
  const fetchProduct = () => {
    axios
      .get("http://127.0.0.1:5000/api/resultProduit")
      .then((res) => {
        setProd(res.data[0].stock);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };
  const fetchSortie = () => {
    axios
      .get("http://127.0.0.1:5000/api/resultSortie")
      .then((res) => {
        setSortie(res.data[0].stock);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => (fetchProduct(), fetchSortie()), []);

  return (
    <>
      <div className="contenu_acceuil">
        <div className="contenu_result">
          <div className="row">
            <div className="col-4">
              <div
                className="card shadow p-3 mb-3 bg-body rounded"
                style={{ height: "150px", width: "250px" }}
              >
                <div className="card-body ">
                  <h4 className="text-center"> Total Utilisateur </h4>
                  <div className="user">
                    <BiGroup style={{ fontSize: "5rem", color: "#bfbfbf" }} />
                    <h5 style={{ fontSize: "2rem", color: "#bfbfbf" }}>20</h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div
                className="card shadow p-3 mb-3 bg-body rounded"
                style={{ height: "150px", width: "250px" }}
              >
                <div className="card-body ">
                  <h4 className="text-center"> Total Produits </h4>
                  <div className="user">
                    <BiCart style={{ fontSize: "5rem", color: "#bfbfbf" }} />
                    <h5
                      style={{
                        fontSize: "2.5rem",
                        color: "#bfbfbf",
                        paddingLeft: "15px",
                      }}
                    >
                      {countProd}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div
                className="card shadow p-3 mb-3 bg-body rounded"
                style={{ height: "150px", width: "250px" }}
              >
                <div className="card-body ">
                  <h4 className="text-center"> Total Sortie </h4>
                  <div className="user">
                    <BiCart
                    
                              
                              style={{ fontSize: "5rem", color: "#bfbfbf" }} />
                    <h5 style={{ fontSize: "2.5rem", color: "#bfbfbf" }}>
                      {countSortie}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className=" mt-2 shadow p-3 mb-3 bg-body rounded"
            style={{ width: "98%" }}
          >
            <ChartComponent />
          </div>
        </div>
        <div className="contenu_user shadow p-3  mb-3 bg-body rounded ">
          <h5 className="text-center">Liste des utilisateurs</h5>
          <div className="list_user">
            <img
              src={user1}
              alt=""
              style={{ width: "50px", height: "50px", borderRadius: "50px" }}
            />
            <div className="description">
              <span style={{ fontWeight: "bold", color: "#4d4d4d" }}>
                Jean Marc
              </span>{" "}
              <br />
              <span style={{ fontSize: "12px" }}>
                Sun, 06 Aug 2023 00:00:00 GMT
              </span>
            </div>
          </div>
          <div className="list_user">
            <img
              src={user2}
              alt=""
              style={{ width: "50px", height: "50px", borderRadius: "50px" }}
            />
            <div className="description">
              <span style={{ fontWeight: "bold", color: "#4d4d4d" }}>
                Jean Marc
              </span>{" "}
              <br />
              <span style={{ fontSize: "12px" }}>
                Sun, 06 Aug 2023 00:00:00 GMT
              </span>
            </div>
          </div>
          <div className="list_user">
            <img
              src={user3}
              alt=""
              style={{ width: "50px", height: "50px", borderRadius: "50px" }}
            />
            <div className="description">
              <span style={{ fontWeight: "bold", color: "#4d4d4d" }}>
                Jean Marc
              </span>{" "}
              <br />
              <span style={{ fontSize: "12px" }}>
                Sun, 06 Aug 2023 00:00:00 GMT
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
