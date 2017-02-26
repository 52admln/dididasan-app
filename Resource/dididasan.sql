-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: 2017-01-13 02:04:40
-- 服务器版本： 10.1.19-MariaDB
-- PHP Version: 5.6.28

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
-- 表的结构 `helper`
--

CREATE TABLE `helper` (
  `id` int(11) NOT NULL,
  `location` text NOT NULL,
  `target` text,
  `user_id` int(11) NOT NULL,
  `time` varchar(20) NOT NULL,
  `itemtype` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `helper`
--

INSERT INTO `helper` (`id`, `location`, `target`, `user_id`, `time`, `itemtype`) VALUES
(4, '30.0874777,119.8959687', '%E4%BD%A0%E5%A5%BD', 4, '1484264091', 'helper'),
(6, '30.08752,119.8959328', '2222', 5, '1484266310', 'helper'),
(15, '30.087278899999998,119.89595380000002', 'sss', 4, '1484267514', 'needer'),
(16, '30.087371400000002,119.89590299999998', '111', 5, '1484266303', 'needer'),
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
  `password` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `users`
--

INSERT INTO `users` (`user_id`, `username`, `telephone`, `sex`, `school`, `slogan`, `user_location`, `allowed`, `password`) VALUES
(4, 'admin', '13456722020', 0, NULL, NULL, NULL, 0, 'eaeb8c1250f18a13b72c212ceb85f4cfc100f817'),
(5, 'admin2', '13456722020', 0, NULL, NULL, NULL, 0, 'eaeb8c1250f18a13b72c212ceb85f4cfc100f817'),
(6, 'admin4', '13456722020', 0, NULL, NULL, NULL, 0, 'eaeb8c1250f18a13b72c212ceb85f4cfc100f817'),
(7, 'admin3', '13333333333', 1, NULL, NULL, NULL, 0, 'eaeb8c1250f18a13b72c212ceb85f4cfc100f817');

--
-- Indexes for dumped tables
--

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
