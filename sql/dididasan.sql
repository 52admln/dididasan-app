-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: 2017-03-31 05:12:50
-- 服务器版本： 10.1.16-MariaDB
-- PHP Version: 5.6.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dididasan`
--

-- --------------------------------------------------------

--
-- 表的结构 `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`) VALUES
(1, 'admin', 'd033e22ae348aeb5660fc2140aec35850c4da997');

-- --------------------------------------------------------

--
-- 表的结构 `helper`
--

CREATE TABLE `helper` (
  `id` int(11) NOT NULL,
  `location` text NOT NULL,
  `target` text,
  `user_id` int(11) NOT NULL,
  `time` varchar(20) NOT NULL,
  `itemtype` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `helper`
--

INSERT INTO `helper` (`id`, `location`, `target`, `user_id`, `time`, `itemtype`) VALUES
(4, '30.430575599999997,120.30667439999999', '测试地点2222', 4, '1485269083', 'helper'),
(6, '30.0874457,119.89546899999999', '浙江杭州', 5, '1490929847', 'helper'),
(15, '30.430570999999997,120.3066682', '测试地点1', 4, '1485269065', 'needer'),
(16, '30.0869388,119.89573360000001', '杭州', 5, '1490929831', 'needer'),
(17, '30.0875464,119.89593199999999', '22222', 7, '1484266497', 'needer'),
(18, '30.0875464,119.89593199999999', '222222222233', 7, '1484266504', 'helper');

-- --------------------------------------------------------

--
-- 表的结构 `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(10) NOT NULL,
  `telephone` text,
  `sex` int(1) DEFAULT NULL,
  `school` text,
  `slogan` text,
  `user_location` text,
  `allowed` int(1) NOT NULL DEFAULT '0',
  `password` varchar(40) NOT NULL,
  `avatar` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `users`
--

INSERT INTO `users` (`user_id`, `username`, `telephone`, `sex`, `school`, `slogan`, `user_location`, `allowed`, `password`, `avatar`) VALUES
(4, 'admin', '13456722020', 1, '112', '23', '3', 1, 'eaeb8c1250f18a13b72c212ceb85f4cfc100f817', 'img/noavatar_big.gif'),
(5, 'admin2', '13456722020', 0, '信息工程学院', '111', '111', 1, 'eaeb8c1250f18a13b72c212ceb85f4cfc100f817', 'img/noavatar_big.gif'),
(6, 'admin4', '13456722020', 0, NULL, NULL, NULL, 0, 'eaeb8c1250f18a13b72c212ceb85f4cfc100f817', 'img/noavatar_big.gif'),
(7, 'admin3', '13333333333', 1, NULL, NULL, NULL, 0, 'eaeb8c1250f18a13b72c212ceb85f4cfc100f817', 'img/noavatar_big.gif');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `helper`
--
ALTER TABLE `helper`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- 使用表AUTO_INCREMENT `helper`
--
ALTER TABLE `helper`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--
-- 使用表AUTO_INCREMENT `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
