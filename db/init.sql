CREATE TABLE IF NOT EXISTS tasks (
	`id`	INTEGER PRIMARY KEY AUTOINCREMENT,
	`title`	TEXT,
	`completed`	INTEGER,
	`dateCreated`	DATETIME,
	`dateUpdated`	DATETIME
);