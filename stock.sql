-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : sam. 19 août 2023 à 09:50
-- Version du serveur : 5.7.36
-- Version de PHP : 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `stock`
--

-- --------------------------------------------------------

--
-- Structure de la table `bondeentree`
--

DROP TABLE IF EXISTS `bondeentree`;
CREATE TABLE IF NOT EXISTS `bondeentree` (
  `numBonEntree` varchar(4) NOT NULL,
  `numProduit` varchar(4) NOT NULL,
  `qteEntree` int(11) DEFAULT NULL,
  `dateEntree` date DEFAULT NULL,
  PRIMARY KEY (`numBonEntree`),
  KEY `fk_bondeentree_produit_idx` (`numProduit`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `bondeentree`
--

INSERT INTO `bondeentree` (`numBonEntree`, `numProduit`, `qteEntree`, `dateEntree`) VALUES
('B003', 'P002', 13, '2023-09-02'),
('BE01', 'P001', 2, '2023-08-14'),
('BE02', 'P001', 4, '2023-08-17');

-- --------------------------------------------------------

--
-- Structure de la table `bondesortie`
--

DROP TABLE IF EXISTS `bondesortie`;
CREATE TABLE IF NOT EXISTS `bondesortie` (
  `numBonSortie` varchar(4) NOT NULL,
  `numProduit` varchar(4) NOT NULL,
  `qteSortie` int(11) DEFAULT NULL,
  `dateSortie` date DEFAULT NULL,
  PRIMARY KEY (`numBonSortie`),
  KEY `fk_bondesortie_produit1_idx` (`numProduit`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `bondesortie`
--

INSERT INTO `bondesortie` (`numBonSortie`, `numProduit`, `qteSortie`, `dateSortie`) VALUES
('BS01', 'P01', 13, '2023-04-20'),
('BS02', 'P001', 1, '2023-08-15');

-- --------------------------------------------------------

--
-- Structure de la table `produit`
--

DROP TABLE IF EXISTS `produit`;
CREATE TABLE IF NOT EXISTS `produit` (
  `numProduit` varchar(4) NOT NULL,
  `design` varchar(45) DEFAULT NULL,
  `stock` int(11) DEFAULT '0',
  `prix` int(11) NOT NULL,
  PRIMARY KEY (`numProduit`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `produit`
--

INSERT INTO `produit` (`numProduit`, `design`, `stock`, `prix`) VALUES
('P001', 'Fer', 5, 5000),
('P002', 'Ciment', 5, 4500);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) COLLATE utf8_bin NOT NULL,
  `pseudo` varchar(100) COLLATE utf8_bin NOT NULL,
  `password` varchar(20) COLLATE utf8_bin NOT NULL,
  `fonction` varchar(1) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `email`, `pseudo`, `password`, `fonction`) VALUES
(1, 'user@gmail.com', 'user', '12345', '3'),
(2, 'kaka@gmail.com', 'BPROO', '1234', '2'),
(3, 'jean@gmail.com', 'BPROO', 'jean123', '1'),
(4, 'dren@gmail.com', 'BPROO', 'dren1234', '1'),
(5, '', 'BPROO', '', '1');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
