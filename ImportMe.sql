-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 31, 2021 at 06:32 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.3.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Table structure for table `puzzle2`
--

CREATE TABLE `puzzle2` (
  `id` int(11) NOT NULL,
  `firstname` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lastname` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `puzzle2`
--

INSERT INTO `puzzle2` (`id`, `firstname`, `lastname`, `email`, `password`) VALUES
(1, 'justin', 'chong', 'jctk@gmail.com', '1234'),
(2, 'daniel', 'dan', 'dd@gmail.com', '1234'),
(3, 'tim', 'tan', 'timtan@gmail.com', 'test3');

-- --------------------------------------------------------

--
-- Table structure for table `puzzle7_user`
--

CREATE TABLE `puzzle7_user` (
  `user_id` int(11) NOT NULL,
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `puzzle7_user`
--

INSERT INTO `puzzle7_user` (`user_id`, `username`, `password`) VALUES
(1, 'admin', 'zexianglolihehe'),
(2, 'Default_user', 'password123'),
(5, 'Russell', 'weeweewoowoo');

-- --------------------------------------------------------

--
-- Table structure for table `tp_users`
--

CREATE TABLE `tp_users` (
  `id` int(11) NOT NULL,
  `firstname` varchar(45) CHARACTER SET latin1 DEFAULT NULL,
  `lastname` varchar(45) CHARACTER SET latin1 DEFAULT NULL,
  `password` varchar(45) CHARACTER SET latin1 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- Dumping data for table `tp_users`
--

INSERT INTO `tp_users` (`id`, `firstname`, `lastname`, `password`) VALUES
(1, 'justin', 'bieber', 'beiberfever'),
(2, 'bitch', 'boy', 'ilovemen'),
(3, 'banana', 'tan', 'honkhonk'),
(4, 'supsup', 'dood', '1234'),
(5, 'watermelon', 'sugar', 'HIGH'),
(6, 'what', 'dadog', 'DOING'),
(7, 'russell', 'coolkid', 'tGhB4e2VHjkmnF22'),
(8, 'darren', 'tan', 'jHnD92Nj%^jfd6Cjdj@'),
(9, 'cool', 'kid', 'whatever'),
(10, 'firstname', 'lastname', 'swag'),
(11, 'whatdadogdoing', 'tan', 'oqwieuroiuweroiuqr'),
(12, 'zeph', 'wong', 'alksdfjlk;ajsdflkjsdalkfj'),
(13, 'lastname', 'firstname', 'wordpass'),
(14, 'emmanuel', 'lim', 'p4ssw0rd'),
(15, 'teamsek', 'polytehcnic', 'hihihihihihbananaboy'),
(16, 'rachel', 'tan', 'rquelt4n'),
(17, 'leroy', 'boombastic', 'immortal'),
(18, 'scott', 'SIUUUUUUU', 'ronaldoisnumber1'),
(19, 'messi', 'tan', 'ilovedogs'),
(20, 'bruno', 'fernandez', 'godofpenalty'),
(21, 'steven', 'gerard', 'imrunningoutofnames'),
(22, 'jaebyok', 'lim', 'squidgirl'),
(23, 'russell', 'tan', 'tG092^7HNbDKHN43jdsE'),
(24, 'Super', 'SparklyBoy5', 'bananachocolateman'),
(25, 'zeph', 'lim', 'tG03FNJjfdsBS34532ND'),
(26, 'sam', 'goh', 'NVU*(%^#NKJDSN)#'),
(27, 'madison', 'oh', 'JmndjfNDHB738NjdfnIS'),
(28, 'bryan', 'lim', 'MNSUJ63^bnhdNjds'),
(29, 'shaun', 'tan', 'NJDfn394JnfJSJ34'),
(30, 'Darklord', 'sim', 'HJ&%838Bjdsn*hsdf');

-- --------------------------------------------------------

--
-- Table structure for table `userprofile`
--

CREATE TABLE `userprofile` (
  `idUserProfile` int(11) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `puzzle1` varchar(30) DEFAULT NULL,
  `puzzle2` varchar(30) DEFAULT NULL,
  `puzzle3` varchar(30) DEFAULT NULL,
  `puzzle4` varchar(30) DEFAULT NULL,
  `puzzle5` varchar(30) DEFAULT NULL,
  `puzzle6` varchar(30) DEFAULT NULL,
  `puzzle7` varchar(30) DEFAULT NULL,
  `puzzle8` varchar(30) DEFAULT NULL,
  `Hint` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `userprofile`
--

INSERT INTO `userprofile` (`idUserProfile`, `username`, `password`, `puzzle1`, `puzzle2`, `puzzle3`, `puzzle4`, `puzzle5`, `puzzle6`, `puzzle7`, `puzzle8`, `Hint`) VALUES
(1, 'Russell Yap Yi Long', 'password', '2017-01-06 00:07:00', '2017-01-06 00:15:40', '2017-01-06 00:18:10', '2017-01-06 00:20:40', '2017-01-06 00:30:20', '2017-01-06 24:40:10', '0', '0', '1000000'),
(2, 'Darren Ong', 'impossibletoguess', '2017-01-06 00:10:07', '2017-01-06 00:15:06', '2017-01-06 00:21:00', '2017-01-06 00:25:08', '2017-01-06 08:40:08', '0', '0', '0', '1110000'),
(3, 'Hoshimachi Suisei', 'cannotguesss', '2017-01-06 00:05:00', '2017-01-06 00:21:00', '2017-01-06 00:25:00', '2017-01-06 00:40:02', '2017-01-06 32:44:59', '0', '0', '0', '0'),
(4, 'Example', 'Examplepassword', '2017-01-06 00:32:29', '0', '0', '0', '0', '0', '0', '0', '0'),
(7, 'Ze Xiang', 'cannotguess', '2017-01-06 00:03:00', '2017-01-06 00:07:34', '2017-01-06 00:10:45', '2017-01-06 00:13:09', '2017-01-06 00:21:00', '2017-01-06 00:33:59', '2017-01-06 00:39:00', '2017-01-06 25:02:59', '0'),
(9, 'Justin', 'Bieber', '2017-01-06 00:16:29', '2021-10-29 -692:34:57', '0', '0', '0', '0', '0', '0', '01100000'),
(10, 'xx_Baemax_xx', 'iwannadie', '0', '0', '0', '0', '0', '0', '0', '0', '0'),
(11, 'PeePeePooPoo', 'LaoSai', '0', '0', '0', '0', '0', '0', '0', '0', '0'),
(12, 'Pikachu', 'cannotguess', '2017-01-06 01:52:29', '2017-01-06 02:22:09', '0', '0', '0', '0', '0', '0', '0'),
(13, 'Jamie', 'BLURH', '2017-01-06 01:22:49', '2017-01-06 03:12:02', '0', '0', '0', '0', '0', '0', '0'),
(14, 'Audrey Assad', 'jesusisking', '0', '0', '0', '0', '0', '0', '0', '0', '0'),
(53, 'Eekum Bookum', 'piacky', '0', '0', '0', '0', '0', '0', '0', '0', '0'),
(54, 'Temasek Sek', 'poo', '0', '0', '0', '0', '0', '0', '0', '0', ''),
(55, 'Zeph Teo', 'ilvoedogs', '0', '0', '0', '0', '0', '0', '0', '0', ''),
(56, 'vwe', '', '0', '0', '0', '0', '0', '0', '0', '0', ''),
(57, 'Russell Yap', 'ddw', '0', '0', '0', '0', '0', '0', '0', '0', ''),
(59, 'Korone ', 'Inugami', '2021-10-29 -689:24:12', '2021-10-29 -689:25:08', '2021-10-29 -689:40:21', '2021-10-29 -503:49:28', '2021-10-29 -474:10:34', '0', '0', '0', '10011100'),
(60, 'iobweiobwri', 'iopvnweriobnweriopbwr', '2021-10-29 -610:49:36', '0', '0', '0', '0', '0', '0', '0', '10000000'),
(61, 'Pikachu 123', 'Nonce', '2021-10-29 -508:50:51', '2021-10-29 -508:51:04', '2021-10-29 -508:51:44', '2021-10-29 -508:58:12', '2021-10-29 -508:58:24', '2021-10-29 -508:58:43', '2021-10-29 -508:58:51', '2021-10-29 -508:59:03', '00010000');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstname` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lastname` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `password`) VALUES
(1, 'justin', 'chong', 'bananaboy'),
(2, 'bitch', 'boy', 'ilovemen'),
(3, 'banana', 'tan', 'honkhonk'),
(4, 'supsup', 'dood', '1234'),
(5, 'watermelon', 'sugar', 'HIGH'),
(6, 'what', 'dadog', 'DOING'),
(7, 'russell', 'coolkid', 'tGhB4e2VHjkmnF22'),
(8, 'darren', 'tan', 'jHnD92Nj%^jfd6Cjdj@'),
(9, 'cool', 'kid', 'whatever'),
(10, 'firstname', 'lastname', 'swag'),
(11, 'whatdadogdoing', 'tan', 'oqwieuroiuweroiuqr'),
(12, 'zeph', 'wong', 'alksdfjlk;ajsdflkjsdalkfj'),
(13, 'lastname', 'firstname', 'wordpass'),
(14, 'emmanuel', 'lim', 'p4ssw0rd'),
(15, 'teamsek', 'polytehcnic', 'hihihihihihbananaboy'),
(16, 'rachel', 'tan', 'rquelt4n'),
(17, 'leroy', 'boombastic', 'immortal'),
(18, 'scott', 'SIUUUUUUU', 'ronaldoisnumber1'),
(19, 'messi', 'tan', 'ilovedogs'),
(20, 'bruno', 'fernandez', 'godofpenalty'),
(21, 'steven', 'gerard', 'imrunningoutofnames'),
(22, 'jaebyok', 'lim', 'squidgirl'),
(23, 'russell', 'tan', 'tG092^7HNbDKHN43jdsE'),
(24, 'Super', 'SparklyBoy5', 'bananachocolateman'),
(25, 'zeph', 'lim', 'tG03FNJjfdsBS34532ND'),
(26, 'sam', 'goh', 'NVU*(%^#NKJDSN)#'),
(27, 'madison', 'oh', 'JmndjfNDHB738NjdfnIS'),
(28, 'bryan', 'lim', 'MNSUJ63^bnhdNjds'),
(29, 'shaun', 'tan', 'NJDfn394JnfJSJ34'),
(30, 'Darklord', 'sim', 'HJ&%838Bjdsn*hsdf');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `puzzle2`
--
ALTER TABLE `puzzle2`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `puzzle7_user`
--
ALTER TABLE `puzzle7_user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  ADD UNIQUE KEY `username_UNIQUE` (`username`);

--
-- Indexes for table `tp_users`
--
ALTER TABLE `tp_users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userprofile`
--
ALTER TABLE `userprofile`
  ADD PRIMARY KEY (`idUserProfile`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `puzzle7_user`
--
ALTER TABLE `puzzle7_user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `userprofile`
--
ALTER TABLE `userprofile`
  MODIFY `idUserProfile` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
