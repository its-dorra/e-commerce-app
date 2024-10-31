DROP INDEX IF EXISTS `primary_image_idx`;--> statement-breakpoint
ALTER TABLE `images` DROP COLUMN `thumbnail_path`;--> statement-breakpoint
ALTER TABLE `images` DROP COLUMN `is_primary`;