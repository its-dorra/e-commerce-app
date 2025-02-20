CREATE TABLE `address` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`street_address` text NOT NULL,
	`city` text NOT NULL,
	`state` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `cart_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`size_id` integer NOT NULL,
	`quantity` integer DEFAULT 1 NOT NULL,
	`item_price` real NOT NULL,
	`cart_id` integer NOT NULL,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`size_id`) REFERENCES `sizes`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`cart_id`) REFERENCES `cart`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `cart` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `category` (
	`name` text PRIMARY KEY NOT NULL,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `colors` (
	`name` text PRIMARY KEY NOT NULL,
	`hex_code` text NOT NULL,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `image` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`product_variant_id` integer NOT NULL,
	`image_path` text NOT NULL,
	`display_order` integer DEFAULT 0 NOT NULL,
	`image_type` text DEFAULT 'gallery' NOT NULL,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`product_variant_id`) REFERENCES `product_variant`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `accounts` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`password` text,
	`google_id` text,
	`account_type` text,
	`created_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `order_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`size_id` integer NOT NULL,
	`quantity` integer DEFAULT 1 NOT NULL,
	`item_price` real NOT NULL,
	`order_id` integer NOT NULL,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`size_id`) REFERENCES `sizes`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`total_price` real NOT NULL,
	`wilaya` text NOT NULL,
	`city` text NOT NULL,
	`street_address` text NOT NULL,
	`phone_number` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`base_price` real NOT NULL,
	`category_name` text NOT NULL,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`category_name`) REFERENCES `category`(`name`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `product_variant` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`product_id` integer NOT NULL,
	`color_name` text NOT NULL,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`color_name`) REFERENCES `colors`(`name`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `profile` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`displayName` text,
	`imageId` text,
	`image` text,
	`bio` text DEFAULT '' NOT NULL,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `sizes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`product_variant_id` integer NOT NULL,
	`size` text NOT NULL,
	`price_adjustment` real DEFAULT 0,
	`quantity` integer DEFAULT 0 NOT NULL,
	`dimensions` text,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`product_variant_id`) REFERENCES `product_variant`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`role` text DEFAULT 'user',
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `wishlist` (
	`user_id` text NOT NULL,
	`product_id` integer NOT NULL,
	PRIMARY KEY(`user_id`, `product_id`),
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `address_user_idx` ON `address` (`user_id`);--> statement-breakpoint
CREATE INDEX `cart_product_id_idx` ON `cart_items` (`size_id`);--> statement-breakpoint
CREATE INDEX `color_name_idx` ON `colors` (`name`);--> statement-breakpoint
CREATE INDEX `product_color_images_idx` ON `image` (`product_variant_id`);--> statement-breakpoint
CREATE INDEX `display_order_idx` ON `image` (`product_variant_id`,`display_order`);--> statement-breakpoint
CREATE UNIQUE INDEX `accounts_user_id_unique` ON `accounts` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `accounts_google_id_unique` ON `accounts` (`google_id`);--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `accounts` (`user_id`);--> statement-breakpoint
CREATE INDEX `google_id_idx` ON `accounts` (`google_id`);--> statement-breakpoint
CREATE INDEX `order_product_id_idx` ON `order_items` (`size_id`);--> statement-breakpoint
CREATE INDEX `order_id` ON `order_items` (`order_id`);--> statement-breakpoint
CREATE INDEX `order_user_idx` ON `orders` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `product_color_unique_idx` ON `product_variant` (`product_id`,`color_name`);--> statement-breakpoint
CREATE UNIQUE INDEX `profile_userId_unique` ON `profile` (`userId`);--> statement-breakpoint
CREATE INDEX `sessions_user_id_idx` ON `session` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `variant_unique_idx` ON `sizes` (`product_variant_id`,`size`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE INDEX `email_idx` ON `users` (`email`);