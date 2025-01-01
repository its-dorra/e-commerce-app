CREATE TABLE `address` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`street_address` text NOT NULL,
	`city` text NOT NULL,
	`state` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `cart_items` (
	`cart_item_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`product_variant_id` integer NOT NULL,
	`quantity` integer DEFAULT 1 NOT NULL,
	`item_price` real NOT NULL,
	`cart_id` integer NOT NULL,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`product_variant_id`) REFERENCES `product_variants`(`variant_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`cart_id`) REFERENCES `carts`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `carts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`is_migrated_to_checkout` integer DEFAULT false NOT NULL,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `colors` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`hex_code` text NOT NULL,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `images` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`product_color_id` integer NOT NULL,
	`image_path` text NOT NULL,
	`display_order` integer DEFAULT 0 NOT NULL,
	`image_type` text DEFAULT 'gallery' NOT NULL,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`product_color_id`) REFERENCES `product_colors`(`id`) ON UPDATE no action ON DELETE cascade
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
CREATE TABLE `orders` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`cart_id` integer NOT NULL,
	`user_id` text NOT NULL,
	`phone_number` text,
	`wilaya` text,
	`city` text,
	`street_address` text,
	`status` text DEFAULT 'pending' NOT NULL,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`cart_id`) REFERENCES `carts`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `product_colors` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`product_id` integer NOT NULL,
	`color_id` integer NOT NULL,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`color_id`) REFERENCES `colors`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `product_variants` (
	`variant_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`product_color_id` integer NOT NULL,
	`size_id` integer NOT NULL,
	`price_adjustment` integer DEFAULT 0,
	`quantity` integer DEFAULT 0 NOT NULL,
	`dimensions` text,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`product_color_id`) REFERENCES `product_colors`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`size_id`) REFERENCES `sizes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`base_price` real NOT NULL,
	`category_id` integer,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action
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
	`name` text NOT NULL,
	`created_at` integer,
	`updated_at` integer
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
CREATE INDEX `product_id_idx` ON `cart_items` (`product_variant_id`);--> statement-breakpoint
CREATE INDEX `color_name_idx` ON `colors` (`name`);--> statement-breakpoint
CREATE INDEX `product_color_images_idx` ON `images` (`product_color_id`);--> statement-breakpoint
CREATE INDEX `display_order_idx` ON `images` (`product_color_id`,`display_order`);--> statement-breakpoint
CREATE UNIQUE INDEX `accounts_user_id_unique` ON `accounts` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `accounts_google_id_unique` ON `accounts` (`google_id`);--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `accounts` (`user_id`);--> statement-breakpoint
CREATE INDEX `google_id_idx` ON `accounts` (`google_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `product_color_unique_idx` ON `product_colors` (`product_id`,`color_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `variant_unique_idx` ON `product_variants` (`product_color_id`,`size_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `profile_userId_unique` ON `profile` (`userId`);--> statement-breakpoint
CREATE INDEX `sessions_user_id_idx` ON `session` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE INDEX `email_idx` ON `users` (`email`);