ALTER TABLE `orders` ADD `total_price` real NOT NULL;
CREATE UNIQUE INDEX `user_idx` ON `address` (`user_id`);