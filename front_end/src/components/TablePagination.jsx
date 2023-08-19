import React, { useState } from 'react';

const TablePagination = ({ data, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

   // Filtrer les données en fonction de la valeur de recherche
   const filteredData = data.filter((item) =>
   item.name.toLowerCase().includes(searchTerm.toLowerCase())
 );
  // Calcule le nombre total de pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Récupère les données à afficher sur la page courante
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
 
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  // Change de page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
         <input
          type="text"
          className="form-control"
          placeholder="Rechercher par nom"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Nom</th>
            <th>Age</th>
            {/* Ajoutez d'autres en-têtes de colonnes selon votre cas */}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
              <td>{item.name}</td>
              <td>{item.age}</td>
              {/* Ajoutez d'autres cellules de données selon votre cas */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Créez la pagination avec les boutons "Précédent" et "Suivant" */}
      <nav aria-label="Page navigation">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Précédent
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index}
              className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Suivant
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default TablePagination;
