
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "categories" (
	"id" SERIAL PRIMARY KEY,
	"run_type" VARCHAR
	);

CREATE TABLE "runs" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT NOT NULL REFERENCES "users",
    "distance" FLOAT NOT NULL,
    "time" INT NOT NULL,
    "pace" INT NOT NULL,
    "cat_id" INT REFERENCES "categories",
    "date" TIMESTAMP,
    "notes" VARCHAR
    );
    
