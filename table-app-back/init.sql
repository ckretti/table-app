CREATE TABLE "table" (id SERIAL PRIMARY KEY, name VARCHAR(30), quantity DECIMAL, distance DECIMAL, date TIMESTAMP);

DO
$do$
BEGIN
	FOR i IN 1..100 LOOP
		INSERT INTO "table" (id, name, quantity, distance, date) VALUES (i, CONCAT('Position ', i), i + 10, i + 100, '2004-10-19 10:23:54');
	END LOOP;
END

$do$;