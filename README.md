# Тестовое задание 2
```
SELECT c.id, name, sub_name, sub_id, sub_level
	(SELECT COUNT(*) FROM collaborators AS c WHERE c.subdivision_id = sub_id) AS colls_count
FROM collaborators AS c 
INNER JOIN (
	SELECT 
	name AS sub_name, 
	id AS sub_id, 
	LEN(subdivisions.name) - LEN(REPLACE(subdivisions.name, '.', '')) AS sub_level 
	FROM subdivisions 
	WHERE parent_id = (
		SELECT subdivision_id 
		FROM collaborators 
		WHERE id=710253) 
		AND id NOT IN(100055,100059)) AS s 
ON c.subdivision_id = s.sub_id 
WHERE LEN(c.name) > 11 AND c.age < 40 
ORDER BY sub_level ASC;
```
# Тестовое задание 1
Для вёрстки был использован Bootstrap.
![image](https://github.com/yobafromstarvvars/global-it-1/assets/82865142/0caca4ca-51f7-46ce-92cf-5319706f379f)
![image](https://github.com/yobafromstarvvars/global-it-1/assets/82865142/fad4cebd-4e21-4218-92ec-f6257668f333)
![image](https://github.com/yobafromstarvvars/global-it-1/assets/82865142/3dbbc253-17a1-4387-8f23-c64cd62b7538)
![image](https://github.com/yobafromstarvvars/global-it-1/assets/82865142/e3858236-5096-4356-9d47-c4f55c06bdb9)
