CREATE TABLE "list" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (250) NOT NULL,
	"complete" BOOLEAN
	
);

INSERT INTO "list" ("task", "complete")
VALUES ('Laundry', 'N'),
('Dishes', 'N'),
('Study', 'N'),
('Groceries', 'N');