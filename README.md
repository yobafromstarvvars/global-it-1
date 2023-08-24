# Тестовое задание 2

<details>
<summary>Условие задачи</summary>
<br>
В БД есть две таблицы: 
collaborators - таблица сотрудников. Поля: id, name (имя сотрудника), subdivision_id (id подразделения сотрудника), age (возраст).
subdivisions - таблица подразделений. Поля: id, name, parent_id (id родительского подразделения)
  
Необходимо получить сотрудников всех нижестоящих подразделений от подразделения сотрудника “Сотрудник 1” с id 710253 у которых возраст менее 40 лет и длина имени более 11 символов. Также в результирующей таблице не должно оказаться подразделений с id 100055 и 100059. Отсортировать по возрастанию уровня вложенности подразделения. 
  
В результирующем наборе должны быть следующие поля:  
id - id сотрудника  
name - Имя сотрудника  
sub_name - Наименование подразделения  
sub_id - id подразделения  
sub_level - Уровень вложенности подразделения относительно самого верхнего  
colls_count  - Общее количество сотрудников в подразделении сотрудника (включая самого сотрудника).
</details>

### Запрос
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
### Результирующая таблица
![image](https://github.com/yobafromstarvvars/global-it-1/assets/82865142/9515bad2-60fb-45b8-89da-fe496bbe4460)
### Время выполнения запроса
![image](https://github.com/yobafromstarvvars/global-it-1/assets/82865142/4b2a129a-ead4-45dc-b999-8fb3787f4141)

# Тестовое задание 1
![image](https://github.com/yobafromstarvvars/global-it-1/assets/82865142/0caca4ca-51f7-46ce-92cf-5319706f379f)
![image](https://github.com/yobafromstarvvars/global-it-1/assets/82865142/fad4cebd-4e21-4218-92ec-f6257668f333)
![image](https://github.com/yobafromstarvvars/global-it-1/assets/82865142/3dbbc253-17a1-4387-8f23-c64cd62b7538)
![image](https://github.com/yobafromstarvvars/global-it-1/assets/82865142/e3858236-5096-4356-9d47-c4f55c06bdb9)
